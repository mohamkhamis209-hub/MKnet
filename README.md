<p align="center">
  <img src="logo.svg" width="128" height="128" alt="MKnet Network Manager Logo">
</p>

<h1 align="center">MKnet Network Manager</h1>

<p align="center">
  <b>The modern, high-performance network quota manager, bandwidth controller, and home/office gateway.</b>
</p>

<p align="center">
  <a href="README_AR.md"><img src="https://img.shields.io/badge/العربية-Arabic-blue" alt="Arabic Documentation"></a>
  <img src="https://img.shields.io/badge/PWA-Ready-success" alt="PWA Ready">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Supported-cyan" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
</p>

---

## 🚀 Overview

**MKnet Network Manager** is an enterprise-grade home and small office gateway system designed to share an internet quota fairly between household or team members. Every person receives an individual monthly or daily bandwidth allowance, shared across their phones, PCs, and smart TVs. When an allowance is depleted, only that user's devices are throttled or paused—no one else is affected.

MKnet delivers:
- **Zero-Friction GitHub Pages & Static Preview**: Runs directly from GitHub Pages or any static web host with an interactive, rich **Demo Mode** and client-side PWA installation.
- **Real-Time Network Gateway**: Full Python 3 engine integrating `nftables`, kernel traffic shaping, DNS filtering, captive portal, and fast WebSockets when deployed on an actual router or gateway server.
- **Progressive Web App (PWA)**: Installable as a standalone app on Android, Windows, macOS, Linux, and iOS with offline support and automatic update detection.
- **Glassmorphism UI**: Beautiful, lightweight vanilla ES module frontend supporting Arabic (RTL) & English (LTR), Dark & Light themes, and desktop/tablet/mobile screens.

---

## 🌟 Key Features

- **Fair Quota Distribution**: Fixed monthly/daily GB allowances or dynamic proportional sharing of remaining quota.
- **Bandwidth Shaping**: Smart kernel queueing (CAKE/FQ-CoDel) keeps gaming ping low and video calls smooth even during heavy downloads.
- **One-Tap Device Management**: Pause, kick, block, or rate-limit any connected phone or PC instantly.
- **DNS Filtering & Ad-Blocking**: HaGeZi, AdGuard, StevenBlack filters with custom domain blacklists and whitelists.
- **VPN & Tailscale**: Integrated WireGuard client/server relay and Tailscale remote access from anywhere.
- **Zero-Disk Local File Sharing**: Transfer files securely between LAN devices directly in browser at full gigabit speeds.
- **PWA & Offline Mode**: Installable icon on home screen/desktop; app shell loads instantly even with zero connectivity.
- **Dual Gateway & GitHub Pages Separation**: Clear, transparent boundary between simulated Demo Mode on static hosts and real kernel operations on live gateways.

---

## 📂 Project Directory Structure

```text
MKnet/
├── index.html                   # Primary root entrypoint (GitHub Pages & Web)
├── 404.html                     # GitHub Pages fallback & routing redirect
├── manifest.webmanifest         # PWA Web App Manifest
├── service-worker.js            # PWA Service Worker (Safe static caching)
├── favicon.svg                  # Vector SVG Favicon
├── logo.svg                     # Official MKnet Vector SVG Logo
├── preview.py                   # One-click local HTTP preview server
├── README.md                    # English documentation & guide
├── README_AR.md                 # دليل المشروع باللغة العربية
│
├── icons/                       # High-resolution PWA icons
│   ├── mk-192.png               # 192x192 PNG Icon
│   ├── mk-512.png               # 512x512 PNG Icon
│   ├── mk-192-maskable.png      # 192x192 Maskable Icon (Android)
│   └── mk-512-maskable.png      # 512x512 Maskable Icon (Android)
│
├── web/                         # Frontend Application Shell
│   ├── index.html               # Gateway server web entrypoint
│   ├── guest_pending.html       # Captive portal waiting page
│   ├── milestone.html           # Public user quota check page
│   ├── report.html              # Consumption analytics page
│   ├── share.html               # Local file share portal
│   ├── spoof.html               # Usage calibration studio
│   ├── css/                     # Design tokens, layout, components
│   ├── fonts/                   # Self-hosted woff2 typography
│   ├── assets/                  # Icons, styles, scripts
│   └── js/                      # Modular ES6 Application
│       ├── main.js              # Application bootstrapper & shell
│       ├── core/                # API, WebSocket, Store, Demo Data, I18n
│       ├── components/          # Reusable UI widgets, charts, modals
│       ├── i18n/                # Arabic and English language bundles
│       └── pages/               # Dashboard pages (Overview, People, Quota, etc.)
│
├── api/                         # FastAPI REST & WebSocket backend
├── core/                        # Configuration, firewall, crypto, time utilities
├── quota/                       # SQLite database, quota tracking, nftables engine
├── scripts/                     # Packaging, installation, branding generators
├── tests/                       # Pytest test suite (UI, API, security, engine)
└── run.py                       # Gateway backend runner
```

---

## 🌐 Mode 1: Static Hosting & GitHub Pages

MKnet is pre-configured to run out of the box on **GitHub Pages** without requiring Node.js, Webpack, or any build step.

### How to Deploy to GitHub Pages:
1. Push your MKnet repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: MKnet Network Manager v1.0.0"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```
2. In your repository on GitHub, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. Within 1–2 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

### Features in GitHub Pages Mode:
- **Interactive Demo Experience**: When no gateway backend is detected, MKnet automatically loads a rich, realistic interactive snapshot with sample users, bandwidth metrics, active devices, and analytics.
- **Transparent Notice**: A distinct **Demo Mode (وضع تجريبي)** banner clearly indicates that operations are simulated and do not alter actual router state.
- **Backend Endpoint Configuration**: Click the **Server Settings** icon in the header at any time to point your web interface to your real MKnet Gateway URL (e.g., `http://192.168.1.1:8080`).

---

## 💻 Local Preview

To preview MKnet locally on your computer with proper ES module loading and MIME types:

```bash
python preview.py
```

This starts a local development server at `http://localhost:8080` and opens your default browser automatically.

---

## 📱 Progressive Web App (PWA) Installation

MKnet is a verified Progressive Web App. You can install it on any compatible device:

### Android:
1. Open MKnet in Google Chrome or your default browser.
2. Tap the **«Install App» (تثبيت التطبيق)** button in the top navigation bar, or open the browser menu (⋮) and select **«Add to Home screen»** / **«Install App»**.
3. MKnet will be installed as an independent, fullscreen application on your home screen and app drawer.

### Windows / macOS / Linux:
1. Open MKnet in Google Chrome, Microsoft Edge, or Brave.
2. Click the **«Install App»** button in the header, or click the install icon in the browser address bar.
3. MKnet will run as a native window with its own taskbar/dock icon and window controls.

### iPhone / iPad (iOS):
1. Open MKnet in **Safari**.
2. Tap the **Share** button (box with an upward arrow) at the bottom.
3. Scroll down and tap **«Add to Home Screen» (إضافة إلى الصفحة الرئيسية)**.
4. Tap **Add**.

---

## 🖥️ Mode 2: Live Gateway Server Setup

To manage an actual home/office network, run MKnet on a Linux machine (Debian, Ubuntu, Kali, Raspberry Pi, Mini PC) connected to your router via Ethernet.

### 1. Requirements:
- Python 3.10 or newer
- Linux with `nftables` and `systemd` (for kernel enforcement)
- Dependencies:
  ```bash
  pip install -r requirements-linux.txt
  ```

### 2. Running the Gateway:
```bash
python run.py
```
Or specify a custom port:
```bash
python run.py --port 8080
```

The gateway server binds to port 8080 immediately, provides the REST API, streams WebSocket updates, controls the `nftables` packet engine, and serves the static MKnet web dashboard.

---

## 🧪 Testing & Verification

The project includes test coverage across backend APIs, security filters, CSRF guards, and frontend contracts:

```bash
# Run UI & frontend asset verification
python -m pytest tests/test_new_ui.py

# Run security, WAF & CSRF protection tests
python -m pytest tests/test_security.py

# Run core quota engine & configuration tests
python -m pytest tests/test_config.py tests/test_daily_plan.py tests/test_dns_rules.py
```

---

## 🔒 Security & Privacy

- **Local First**: Network telemetry, user devices, and logs stay on your local hardware. No cloud accounts or telemetry tracking.
- **CSRF Defense**: Enforces custom `X-MK-CSRF: 1` and `X-QM-CSRF: 1` headers on all state-changing endpoints with `SameSite=Lax` cookies.
- **Safe Service Worker**: Strictly excludes all API routes (`/api/*`), WebSockets, authentication cookies, and sensitive payloads from caching.
- **CORS Configured**: Gateway API securely permits configured web origins with authenticated credentials.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
