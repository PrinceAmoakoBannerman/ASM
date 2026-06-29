# AssetFlow — Enterprise Asset Management System
### Built for Ghana Grid Company Limited (GRIDCo)

A premium, enterprise-grade asset management platform designed for national electricity transmission companies across Africa. Built with React, Vite, Recharts, and Lucide React.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher — [Download here](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

---

## 🔐 Demo Login
| Field    | Value                    |
|----------|--------------------------|
| Email    | `admin@gridco.com.gh`    |
| Password | any value                |

---

## 📁 Project Structure

```
assetflow/
├── public/
│   └── favicon.svg          # App icon
├── src/
│   ├── App.jsx              # Main application (all pages + components)
│   ├── main.jsx             # React entry point
│   └── index.css            # Global reset styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

---

## 🧩 Tech Stack

| Library          | Version   | Purpose                        |
|------------------|-----------|--------------------------------|
| React            | 18.3.x    | UI framework                   |
| Vite             | 5.3.x     | Build tool & dev server        |
| Recharts         | 2.12.x    | Charts & data visualization    |
| Lucide React     | 0.383.x   | Icon system                    |

---

## 📱 Pages & Modules

| Module            | Route/State       | Description                                      |
|-------------------|-------------------|--------------------------------------------------|
| **Login**         | Initial screen    | Branded login with arc gauge instruments         |
| **Dashboard**     | `dashboard`       | KPIs, trend charts, alerts, dept utilization     |
| **Assets**        | `assets`          | Searchable/filterable asset registry table       |
| **Maintenance**   | `maintenance`     | Calendar, job list, technician workload          |
| **Reports**       | `reports`         | Analytics charts, exportable report cards        |
| **Notifications** | `notifications`   | Typed alert center (critical/warning/info)       |
| **Settings**      | `settings`        | Company profile, preferences, dark mode toggle   |

---

## 🎨 Design System

### Color Tokens
```js
Void Navy:      #050D1A   // App background
Surface:        #0C1E35   // Cards
Sky Electric:   #0EA5E9   // Primary brand accent
Emerald:        #10B981   // Active / success
Amber:          #F59E0B   // Warning / maintenance
Rose:           #EF4444   // Critical / error
```

### Typography
- **UI & Labels** → `Inter` (system font fallback)
- **Data & Numbers** → `JetBrains Mono` (loaded via Google Fonts in-app)

---

## 🛠️ Build for Production

```bash
npm run build
```

Output goes to `/dist`. Deploy to any static host (Vercel, Netlify, AWS S3, etc.)

---

## 🌍 Designed For
National electricity transmission utilities across Africa, including:
- GRIDCo (Ghana)
- PHCN / TCN (Nigeria)
- ZESCO (Zambia)
- TANESCO (Tanzania)
- ESKOM (South Africa)
- KPLC (Kenya)

---

## 📄 License
Proprietary — Built for GRIDCo Enterprise. All rights reserved.
