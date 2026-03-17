# Project Structure

```
SPENT/
│
├── App.tsx                     # Root component — main widget UI & logic
├── index.js                    # React Native entry point (AppRegistry)
│
├── src/
│   └── styles/
│       └── tokens.ts           # Nothing design system tokens (colors, spacing, typography)
│
├── assets/
│   └── fonts/                  # Nothing brand fonts (not included — see README)
│       ├── ndot.otf            # Display font for hero amounts
│       ├── Inter.ttf           # UI labels and body text
│       └── NType82.ttf         # Decorative display typography
│
├── app.json                    # Expo app configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
│
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
├── README.md                   # Project documentation
└── PROJECT_STRUCTURE.md        # This file
```

## Key Files

### `App.tsx`
The entire widget lives in a single component. Handles:
- Daily limit setup (first-time flow)
- Spending input with debounced persistence
- Animated color transitions based on budget ratio
- Auto currency detection via device locale
- 24-hour spending cycle with automatic reset

### `src/styles/tokens.ts`
The Nothing design system exported as a typed constant. Contains:
- **Colors** — Nothing's dark palette (`#000`, `#FDFBFF`, `#D81921`, etc.)
- **Spacing** — 4px-based scale (0–384px)
- **Border radius** — `none` through `full` (9999px)
- **Text styles** — Pre-composed typography using ndot, Inter, and NType82

### `assets/fonts/`
Placeholder directory for Nothing's proprietary brand fonts. See `assets/fonts/README.md` for instructions on obtaining and placing the font files.
