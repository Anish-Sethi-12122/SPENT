import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import * as Font from 'expo-font';
import { tokens } from './src/styles/tokens';

const STORAGE_KEY = '@spent_data';
const LIMIT_SET_TIMESTAMP_KEY = '@spent_limit_timestamp';

interface SpentData {
  todaySpent: number;
  dailyLimit: number;
  currency: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$', GBP: '£', JPY: '¥', CNY: '¥', EUR: '€',
  KRW: '₩', INR: '₹', AUD: '$', CAD: '$', NZD: '$',
  CHF: 'CHF', SEK: 'kr', NOK: 'kr', DKK: 'kr',
  BRL: 'R$', MXN: '$', ARS: '$', RUB: '₽', ZAR: 'R',
  TRY: '₺', PLN: 'zł', TWD: 'NT$', HKD: 'HK$', SGD: 'S$',
  THB: '฿', VND: '₫', PHP: '₱', MYR: 'RM', IDR: 'Rp'
};

export default function App() {
  const [data, setData] = useState<SpentData | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [inputMode, setInputMode] = useState<'none' | 'limit' | 'add'>('none');
  const [inputValue, setInputValue] = useState('');
  const [detectedCurrency, setDetectedCurrency] = useState('$');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const colorAnim = useRef(new Animated.Value(0)).current;
  const inputDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        'ndot': require('./assets/fonts/ndot.otf'),
        'Inter': require('./assets/fonts/Inter.ttf'),
        'NType82': require('./assets/fonts/NType82.ttf'),
      });
    } catch (error) {
      console.log('Font loading error (using system fallbacks):', error);
    }
    setFontsLoaded(true);
  }, []);

  useEffect(() => {
    loadFonts();
    detectCurrency();
    loadData();
  }, []);

  useEffect(() => {
    if (data) {
      animateColor();
    }
  }, [data]);

  const detectCurrency = () => {
    try {
      const locales = Localization.getLocales();
      const currencyCode = locales?.[0]?.currencyCode || 'USD';
      const symbol = CURRENCY_SYMBOLS[currencyCode] || '$';
      setDetectedCurrency(symbol);
    } catch (error) {
      console.log('Currency detection error:', error);
      setDetectedCurrency('$');
    }
  };

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const limitTimestamp = await AsyncStorage.getItem(LIMIT_SET_TIMESTAMP_KEY);

      if (!storedData || !limitTimestamp) {
        setIsFirstTime(true);
        return;
      }

      const parsed: SpentData = JSON.parse(storedData);
      const timestamp = parseInt(limitTimestamp, 10);

      if (!parsed.todaySpent && parsed.todaySpent !== 0) {
        parsed.todaySpent = 0;
      }
      if (!parsed.dailyLimit || parsed.dailyLimit <= 0) {
        setIsFirstTime(true);
        return;
      }
      if (!parsed.currency) {
        parsed.currency = '$';
      }

      const now = Date.now();
      const elapsed = now - timestamp;
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (elapsed >= twentyFourHours) {
        const resetData = { ...parsed, todaySpent: 0 };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
        setData(resetData);
        setIsFirstTime(true);
      } else {
        setData(parsed);
      }
    } catch (error) {
      console.log('Load error:', error);
      setIsFirstTime(true);
    }
  };

  const animateColor = () => {
    if (!data || data.dailyLimit <= 0) return;

    const ratio = data.todaySpent / data.dailyLimit;
    let targetValue = 0;

    if (ratio >= 1) {
      targetValue = 1;
    } else if (ratio >= 0.9) {
      targetValue = 0.66;
    } else if (ratio >= 0.8) {
      targetValue = 0.33;
    } else {
      targetValue = 0;
    }

    Animated.timing(colorAnim, {
      toValue: targetValue,
      duration: 600,
      useNativeDriver: false
    }).start();
  };

  const handleSetLimit = async (limit: number) => {
    try {
      if (limit <= 0 || limit > 999999) {
        console.log('Invalid limit value:', limit);
        return;
      }

      const now = Date.now();
      const newData: SpentData = {
        todaySpent: 0,
        dailyLimit: limit,
        currency: detectedCurrency
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      await AsyncStorage.setItem(LIMIT_SET_TIMESTAMP_KEY, now.toString());
      setData(newData);
      setIsFirstTime(false);
      setInputMode('none');
      setInputValue('');
    } catch (error) {
      console.log('Set limit error:', error);
    }
  };

  const handleAddSpending = async (amount: number) => {
    if (!data || amount <= 0 || amount > 999999) return;

    if (inputDebounceTimer.current) {
      clearTimeout(inputDebounceTimer.current);
    }

    inputDebounceTimer.current = setTimeout(async () => {
      try {
        const newData = { ...data, todaySpent: data.todaySpent + amount };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setData(newData);
        setInputMode('none');
        setInputValue('');
      } catch (error) {
        console.log('Add spending error:', error);
      }
    }, 100);
  };

  const handleInputSubmit = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0 || value > 999999) return;

    if (isFirstTime || inputMode === 'limit') {
      handleSetLimit(value);
    } else if (inputMode === 'add') {
      handleAddSpending(value);
    }
  };

  const textColor = colorAnim.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [tokens.colors.light, '#FFC107', '#FF9800', tokens.colors.red]
  });

  const getScaledFontSize = (amount: number, currency: string): number => {
    const text = `${currency}${amount.toFixed(0)}`;
    const charCount = text.length;
    const baseSize = 48;
    const maxWidth = 130;
    const estimatedWidth = charCount * baseSize * 0.6;

    if (estimatedWidth > maxWidth) {
      return Math.floor((maxWidth / estimatedWidth) * baseSize);
    }
    return baseSize;
  };

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="small" color={tokens.colors.light} />
      </View>
    );
  }

  if (isFirstTime) {
    return (
      <View style={styles.container}>
        <Text style={[styles.setupLabel, { color: tokens.colors.light }]}>SET DAILY LIMIT</Text>
        <TextInput
          style={[styles.setupInput, { color: tokens.colors.light }]}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={tokens.colors['secondary-dark']}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleInputSubmit}
          autoFocus
        />
        <Pressable
          style={styles.setupButton}
          onPress={handleInputSubmit}
        >
          <Text style={[styles.setupButtonText, { color: tokens.colors.light }]}>SET</Text>
        </Pressable>
      </View>
    );
  }

  if (!data) {
    return <View style={styles.container} />;
  }

  if (inputMode === 'add') {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, { color: tokens.colors.light }]}>ADD AMOUNT</Text>
        <TextInput
          style={[styles.input, { color: tokens.colors.light }]}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={tokens.colors['secondary-dark']}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleInputSubmit}
          autoFocus
        />
        <Pressable
          style={styles.cancelButton}
          onPress={() => {
            setInputMode('none');
            setInputValue('');
          }}
        >
          <Text style={[styles.cancelButtonText, { color: tokens.colors['secondary-light'] }]}>CANCEL</Text>
        </Pressable>
      </View>
    );
  }

  const scaledFontSize = getScaledFontSize(data.todaySpent, data.currency);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: tokens.colors['secondary-light'] }]}>TODAY SPENT</Text>
      
      <Animated.Text
        style={[
          styles.amount,
          { color: textColor, fontSize: scaledFontSize, lineHeight: scaledFontSize }
        ]}
        numberOfLines={1}
      >
        {data.currency}{data.todaySpent.toFixed(0)}
      </Animated.Text>

      <Text style={[styles.limit, { color: tokens.colors['secondary-dark'] }]}>
        OF {data.currency}{data.dailyLimit.toFixed(0)}
      </Text>

      <Pressable
        style={styles.addButton}
        onPress={() => setInputMode('add')}
      >
        <Text style={[styles.addButtonText, { color: tokens.colors.light }]}>+ ADD</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  label: {
    ...tokens.textStyles.labelUppercasedSmall,
    marginBottom: 6,
    textAlign: 'center'
  },
  amount: {
    fontFamily: 'ndot',
    fontWeight: '400',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginVertical: 8,
    textAlign: 'center'
  },
  limit: {
    ...tokens.textStyles.labelSmall,
    marginBottom: 12,
    textAlign: 'center'
  },
  addButton: {
    width: 60,
    height: 28,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1
  },
  addButtonText: {
    ...tokens.textStyles.labelSmall,
    textTransform: 'uppercase'
  },
  setupLabel: {
    ...tokens.textStyles.labelUppercasedSmall,
    marginBottom: 16,
    textAlign: 'center'
  },
  setupInput: {
    ...tokens.textStyles.ndotHeadlineMedium,
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['secondary-dark'],
    paddingVertical: 8
  },
  setupButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.dark,
    flexShrink: 1
  },
  setupButtonText: {
    ...tokens.textStyles.labelMedium,
    textTransform: 'uppercase'
  },
  input: {
    ...tokens.textStyles.ndotHeadlineMedium,
    width: '100%',
    textAlign: 'center',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['secondary-dark'],
    paddingVertical: 8
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexShrink: 1
  },
  cancelButtonText: {
    ...tokens.textStyles.labelSmall,
    textTransform: 'uppercase'
  }
});