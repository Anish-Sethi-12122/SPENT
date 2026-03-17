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

Designed for zero learning curve and instant feedback, SPENT operates on a strictly 24-hour cycle. You set a limit. You log expenses. It resets at midnight. No yesterday to obsess over, no tomorrow to think about, just today's reality.

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
| Essential Apps Overview | [nothing.tech/pages/essential-apps](https://nothing.tech/pages/essential-apps) |
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

## /// Development

### Prerequisites
* Node.js (v18+)
* Expo CLI
* Nothing OS device (recommended) or Expo Go

### Initialization

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/SPENT.git
cd SPENT

# Install dependencies
npm install

# Start the bundler
npx expo start
```

### Emulation
```bash
npx expo start --android  # Android
npx expo start --ios      # iOS
```

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
