# SPENT // Minimal Daily Budget Tracker

<p align="center">
  <img src="assets/images/banner.png" alt="SPENT Banner" width="100%" />
</p>

<p align="center">
  <b>Budgeting apps are loud. SPENT is quiet.</b><br/>
  A single-purpose widget built for the Nothing ecosystem during the Nothing Hackathon.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nothing%20OS-Target-black?style=for-the-badge&logo=nothing"/>
  <img src="https://img.shields.io/badge/Essential%20App-Nothing%20Playground-white?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Expo-SDK%2052-000000?style=for-the-badge&logo=expo"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict-black?style=for-the-badge&logo=typescript"/>
</p>

---

## /// The Concept

Most finance tools are bloated with charts, categories, and notifications you never read. SPENT removes everything unnecessary to answer one fundamental question in a single glance:

> *"How much have I spent today?"*

Designed for zero learning curve and instant feedback, SPENT operates on a strictly 24-hour cycle. You set a limit. You log expenses. It resets at midnight. No yesterday to obsess over, no tomorrow to think about, just today's spent reality.

---

## /// What is an Essential App?

SPENT is an **[Essential App](https://playground.nothing.tech/apps)** — part of Nothing's bold new initiative to reimagine how apps are made and used.

### The Vision

Nothing believes the future of mobile isn't in app stores filled with bloated software. Instead, they're building toward an **AI-native operating system** called **Essential OS** (targeted for 2027), where your phone understands what you need and creates it on the fly. Essential Apps are the first step.

### Nothing Playground

**[Nothing Playground](https://playground.nothing.tech)** is the platform where Essential Apps come to life. It's a browser-based builder where anyone can:

* **Describe an app in plain English** — and AI generates a working widget
* **Remix existing community creations** — fork other Essential Apps and make them yours
* **Tweak the underlying code** — for fine-grained control when prompts aren't enough
* **Share and discover** — a community hub where Essential Apps are published, downloaded, and rated

This approach is what Nothing calls **"vibe coding"** — you describe the experience you want, and the AI handles the implementation. No traditional development environment. No build toolchains. Just intent → widget.

### How SPENT Was Built

SPENT was created entirely through Nothing Playground during the **Nothing Hackathon**. The design language, fonts, and tokens come directly from Nothing's design system. The AI generated the React Native code, which was then refined into the single-file widget you see in this repository.

> **Currently in Beta** — Essential Apps launched in Alpha (2025) and entered Beta in February 2026, initially exclusive to the [Nothing Phone (3)](https://nothing.tech/pages/phone-3). A broader rollout to all Nothing OS 4.0 devices (including CMF phones) is planned for later in 2026.

### Learn More

| Resource | Link |
| :--- | :--- |
| Essential Apps Overview | [nothing.tech/pages/essential-apps](https://playground.nothing.tech/apps) |
| Nothing Playground | [playground.nothing.tech](https://playground.nothing.tech) |
| Nothing Community | [nothing.community](https://nothing.community) |
| Nothing Phone (3) | [nothing.tech/pages/phone-3](https://nothing.tech/pages/phone-3) |

---

## /// Core Behaviors

* **Frictionless Logging:** Tap, type, done. No forms or categories.
* **Emotion-Driven UI:** The interface shifts color as spending approaches the limit.
    * `Safe` ── White (#FDFBFF)
    * `Caution` ── Amber (#FFC107)
    * `Warning` ── Orange (#FF9800)
    * `Over` ── Nothing Red (#D81921)

<p align="center">
  <img src="assets/images/widget_safe.png" alt="Safe State" width="240" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="assets/images/widget_over.png" alt="Over Budget" width="240" />
</p>

* **Ephemeral by Design:** A strict 24-hour auto-reset builds daily awareness without the guilt of past spending.
* **Smart Localization:** Automatically adapts to your local currency with zero configuration.

---

## /// How to Use SPENT

SPENT is intentionally simple. There are only three screens, and you'll master all of them in under 30 seconds.

### Step 1 — Set Your Daily Limit

When you open SPENT for the first time (or after a 24-hour reset), you'll see the **"SET DAILY LIMIT"** screen.

1. **Type a number** — this is your budget for the next 24 hours (e.g., `500` for ₹500)
2. **Tap SET** — your daily cycle begins immediately

> 💡 Pick a realistic number. SPENT works best when your limit reflects what you'd actually like to spend in a day, not an aspirational goal.

### Step 2 — Track Your Spending

Once your limit is set, you'll see the **main dashboard**:

| Element | What it shows |
| :--- | :--- |
| **"TODAY SPENT"** | Small label at the top |
| **Hero number** | Your total spending so far today (large, center) |
| **"OF ₹XXX"** | Your daily limit |
| **"+ ADD" button** | Tap to log a new expense |

The hero number **changes color** as you approach your limit:
- 🤍 **White** — You're under 80% of your limit. Relax.
- 💛 **Amber** — You've crossed 80%. Start being mindful.
- 🟠 **Orange** — You've hit 90%. Slow down.
- ❤️ **Red** — You've exceeded your limit. No judgment, just awareness.

### Step 3 — Add an Expense

1. **Tap "+ ADD"** on the main dashboard
2. The **"ADD AMOUNT"** screen appears
3. **Type the amount** you just spent (e.g., `120` for a meal)
4. **Tap Submit** (or press Enter on keyboard) — done, you're back to the dashboard
5. Changed your mind? Tap **CANCEL** to go back without adding anything

> ☕ Bought a coffee for ₹80? Just tap ADD → type `80` → submit. Takes 2 seconds.

### The 24-Hour Cycle

- SPENT runs on a **strict 24-hour timer** starting from when you set your limit
- After 24 hours, your spending automatically resets to **₹0**
- You'll be prompted to set a **new daily limit** for the next cycle
- There's **no history** — yesterday's spending is gone. This is by design.

### Currency

SPENT automatically detects your device's locale and shows the appropriate currency symbol (₹, $, €, £, ¥, etc.). There's nothing to configure — it just works.

---

## /// Nothing Design Language

SPENT doesn't just run on Nothing OS; it feels native to it. Built entirely around Nothing's strict design tokens and typography.

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Pure Black** | `#000000` | Deep backgrounds |
| **Glass Dark** | `#1B1B1D` | Widget surface / Buttons |
| **Primary Light** | `#FDFBFF` | Hero text |
| **Secondary Dark** | `#5E5E62` | Subtle UI elements |
| **Alert Red** | `#D81921` | Over-budget state |

### Typography Stack
SPENT relies on proprietary Nothing fonts for its identity:
* **ndot:** Hero numbers and critical data.
* **Inter:** Clean, legible utility text.
* **NType82:** Branding and decorative elements.

*(Note: Proprietary fonts are not bundled in this repo. See the font notice below).*

---

## /// Development Setup (Full Tutorial)

This guide walks you through getting SPENT running on your own device from scratch.

### 1. Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | How to get it |
| :--- | :--- | :--- |
| **Node.js** | v18 or newer | [nodejs.org](https://nodejs.org/) |
| **npm** | Comes with Node.js | Included with Node.js installation |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com/) |
| **Expo Go** (mobile) | Latest | [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) |

> **Recommended:** A Nothing Phone running Nothing OS for the authentic experience. But any Android/iOS device (or emulator) with Expo Go works.

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Anish-Sethi-12122/SPENT.git
cd SPENT

# Install all dependencies
npm install
```

### 3. Add Nothing Fonts (Optional but Recommended)

SPENT uses Nothing's proprietary fonts. Without them, the app works perfectly but uses system fonts instead.

To get the full Nothing look:

1. Obtain the font files (see [`assets/fonts/README.md`](assets/fonts/README.md) for details)
2. Place them in the `assets/fonts/` directory:
   ```
   assets/fonts/
   ├── ndot.otf      ← Display font (hero numbers)
   ├── Inter.ttf     ← UI text (free from Google Fonts)
   └── NType82.ttf   ← Decorative display font
   ```
3. **Inter** is freely available at [Google Fonts](https://fonts.google.com/specimen/Inter) — download "Inter Medium" and rename to `Inter.ttf`

### 4. Run the App

```bash
# Start the Expo development server
npx expo start
```

This opens the **Expo DevTools** in your terminal. From here:

| Option | How |
| :--- | :--- |
| **Physical device** | Scan the QR code with Expo Go (Android) or Camera app (iOS) |
| **Android emulator** | Press `a` in the terminal (requires Android Studio) |
| **iOS simulator** | Press `i` in the terminal (macOS only, requires Xcode) |
| **Web browser** | Press `w` in the terminal |

### 5. Platform-Specific Commands

```bash
npx expo start --android    # Launch directly on Android
npx expo start --ios        # Launch directly on iOS (macOS only)
npx expo start --web        # Launch in web browser
npx expo start --tunnel     # Use tunnel if on different network
```

### 6. Troubleshooting

| Problem | Solution |
| :--- | :--- |
| `expo: command not found` | Run `npm install` again, or use `npx expo start` |
| QR code not scanning | Make sure phone and computer are on the **same WiFi network**, or use `--tunnel` |
| Fonts not loading | Verify font files exist in `assets/fonts/` with exact filenames |
| App shows blank screen | Check terminal for errors; try `npx expo start --clear` to clear cache |
| `npm install` hangs | Try `npm install --legacy-peer-deps` or clear npm cache with `npm cache clean --force` |

---

## /// Architecture

Built for speed and reliability, keeping the widget lightweight.

* **Framework:** React Native / Expo SDK 52
* **Language:** TypeScript (Strict)
* **Persistence:** `AsyncStorage` (Local, off-grid storage)
* **Localization:** `expo-localization`

```text
SPENT/
├── App.tsx                 # Single-file widget — all UI and logic
├── src/
│   └── styles/
│       └── tokens.ts       # Nothing design system tokens
├── assets/
│   ├── fonts/              # ndot, Inter, NType82 (not bundled)
│   └── images/             # Banner and widget screenshots
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript config
```

---

## /// FAQ

**Q: Can I change my daily limit mid-day?**
A: Not in the current version. Your limit locks in for 24 hours. This is intentional — it prevents the temptation to keep raising the bar.

**Q: What happens if I go over my limit?**
A: Nothing stops you. The number turns red, but you can keep adding expenses. SPENT is about awareness, not restrictions.

**Q: Where is my data stored?**
A: Locally on your device only, using AsyncStorage. Nothing is sent to any server. Your spending data never leaves your phone.

**Q: Does it work offline?**
A: Yes, 100%. SPENT requires zero network connectivity. Everything runs on-device.

**Q: Can I see yesterday's spending?**
A: No. SPENT deliberately doesn't keep history. Each day is a clean slate. If you want spending history, this isn't the app for you — and that's okay.

---

## /// Future Iterations

* **Native Widget Packaging:** Direct integration with Nothing OS widget layer.
* **Glyph Interface Support:** Utilizing the back-glass LEDs for over-budget warnings.
* **Adaptive Budgets:** Weekend vs. Weekday smart limits.

---

## /// Legal & Assets

**License:** MIT License. See `LICENSE` for details.

**Font Notice:** `ndot` and `NType82` are proprietary assets owned by Nothing Technology and Colophon Foundry. They are intentionally excluded from this repository. To build this project exactly as designed, you must legally obtain and link these fonts in the `assets/fonts/` directory.

---

<p align="center">
  <b>SPENT</b><br/>
  <i>Track less. Understand more.</i>
</p>
