# 💰 FinTrack

### Modern Personal Finance Management Dashboard

FinTrack is a modern, responsive personal finance management application built with **React, Vite, and Tailwind CSS**. It helps users track income and expenses, manage budgets, monitor savings goals, analyze spending patterns, and organize their financial data through a clean and intuitive dashboard.

---

## ✨ Features

### 🏠 Dashboard

Get a quick overview of your financial situation from a centralized dashboard.

* Total balance
* Total income
* Total expenses
* Savings overview
* Recent transactions
* Quick transaction creation
* Financial summary cards
* Responsive dashboard layout

---

### 💳 Transaction Management

Keep track of your financial activity in one place.

* Add income and expense transactions
* Categorize transactions
* View transaction history
* Search transactions
* Filter transactions
* Delete transactions
* Income/expense classification
* Transaction dates
* Persistent transaction data

---

### 📊 Financial Analytics

Understand where your money goes through visual analytics.

* Income vs. expense analysis
* Expense category breakdown
* Spending distribution
* Savings rate
* Financial summary cards
* Top spending categories
* Interactive charts
* Financial insights

---

### 💰 Budget Management

Set spending limits and monitor your financial habits.

* Create budgets
* Assign budgets to categories
* Track spending against budgets
* Monitor budget progress
* Identify overspending
* Visual progress indicators

---

### 🎯 Savings Goals

Set financial goals and track your progress.

* Create savings goals
* Set target amounts
* Track current savings
* Calculate completion percentage
* Monitor goal progress
* Goal completion states
* Visual progress cards

---

### ⚙️ Settings

Customize your FinTrack experience.

* Profile settings
* Currency selection
* Theme preferences
* Notification preferences
* Data management
* Import data
* Export data
* Reset application data
* Persistent settings

---

### 🎨 Theme Support

FinTrack supports multiple theme preferences:

* 🌙 Dark
* ☀️ Light
* 🖥️ System

Theme preferences are persisted so they remain after refreshing the application.

---

### 💱 Multi-Currency Formatting

Financial values are formatted dynamically based on the selected currency.

Currently supported:

| Currency           | Code |
| ------------------ | ---- |
| 🇮🇳 Indian Rupee  | INR  |
| 🇺🇸 US Dollar     | USD  |
| 🇪🇺 Euro          | EUR  |
| 🇬🇧 British Pound | GBP  |

---

### 📱 Responsive Design

FinTrack is designed to work across different screen sizes.

* Desktop layouts
* Tablet layouts
* Mobile layouts
* Responsive sidebar
* Mobile navigation
* Adaptive dashboard cards
* Responsive charts
* Mobile-friendly forms

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **JavaScript**
* **JSX**
* **Vite**

### Styling

* **Tailwind CSS**
* Responsive utility classes
* Custom UI components

### Routing

* **React Router**

### Icons

* **React Icons**
* **Lucide React**

### Data Visualization

* **Recharts**

### State Management

* **React Context API**
* React Hooks

### Storage

* **Browser LocalStorage**

---

## 🏗️ Project Architecture

FinTrack follows a component-based React architecture designed to keep UI, state management, and pages separated.

```text
FinTrack/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── AnalyticsCard.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── IncomeExpenseChart.jsx
│   │   │   └── FinancialInsights.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── RecentTransactions.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── forms/
│   │   │   ├── TransactionModal.jsx
│   │   │   └── GoalModal.jsx
│   │   │
│   │   ├── goals/
│   │   │   └── GoalCard.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── settings/
│   │       ├── SettingsSection.jsx
│   │       ├── SettingRow.jsx
│   │       └── DataManagement.jsx
│   │
│   ├── context/
│   │   ├── TransactionContext.jsx
│   │   ├── BudgetContext.jsx
│   │   ├── GoalContext.jsx
│   │   └── SettingsContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Analytics.jsx
│   │   ├── Budgets.jsx
│   │   ├── Goals.jsx
│   │   └── Settings.jsx
│   │
│   ├── utils/
│   │   └── currency.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── README.md
└── ...
```

---

## 🔄 Application Flow

FinTrack uses React Context to share financial data between different parts of the application.

```text
                    ┌─────────────────┐
                    │     FinTrack    │
                    │       App       │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌───────────┐  ┌───────────┐  ┌───────────┐
        │ Dashboard │  │Transactions│  │ Analytics │
        └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌─────────────────┐
                    │ Context / State │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼               ▼               ▼
      Transactions        Budgets           Goals
             │               │               │
             └───────────────┼───────────────┘
                             ▼
                       LocalStorage
```

This allows updates made in one part of the application to be reflected throughout the application.

For example:

```text
Add Transaction
       ↓
Transaction Context
       ↓
LocalStorage
       ↓
 ┌─────┼─────────┐
 ↓     ↓         ↓
Home Analytics Budgets
```
## 📸 Screenshots

### 🏠 Dashboard

The FinTrack dashboard provides a quick overview of your financial health, including balance, income, expenses, savings, and recent transactions.

<p align="center">
  <img width="1900" height="919" alt="dashboard image" src="https://github.com/user-attachments/assets/6f965ef7-264c-4f2b-ae1d-86718b55634d" />
</p>

---

### 💳 Transactions

Manage your income and expenses with detailed transaction history, categories, dates, and transaction actions.

<p align="center">
<img width="1900" height="920" alt="Transactions image" src="https://github.com/user-attachments/assets/2b7dc36d-8acc-4090-8484-bdec3e54c0ba" />
</p>

---

### 📊 Analytics

Visualize spending patterns, income versus expenses, category breakdowns, and overall financial performance.

<p align="center">
<img width="1920" height="1080" alt="Analytics image" src="https://github.com/user-attachments/assets/d26eb5af-e636-4cde-89da-6405260d8f29" />

</p>

---

### 💰 Budgets

Create spending limits for different categories and monitor your progress throughout the month.

<p align="center">
<img width="1920" height="1080" alt="Budgets image" src="https://github.com/user-attachments/assets/6c7f7e66-1b7d-4ae1-9204-d295231d532b" />
</p>

---

### 🎯 Savings Goals

Set savings targets and track your progress toward important financial goals.

<p align="center">
<img width="1920" height="1080" alt="Goals image" src="https://github.com/user-attachments/assets/ecb7612e-f75a-4291-96a2-bdebffbb3877" />

</p>

---

### ⚙️ Settings

Customize application preferences, currency, appearance, and manage your financial data.

<p align="center">
<img width="1920" height="1080" alt="Settings image" src="https://github.com/user-attachments/assets/f6cfb111-526d-4e8e-975f-e4dec734b1b3" />
</p>

---

## 📦 Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/FinTrack.git
```

### 2. Enter the project directory

```bash
cd FinTrack
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open it in your browser.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 💾 Data Persistence

FinTrack currently uses **LocalStorage** for client-side persistence.

This means application data can remain available after:

* Page refreshes
* Browser navigation
* Closing and reopening the application

Data is stored locally in the user's browser rather than on a remote server.

### Current architecture

```text
React Application
       ↓
Context API
       ↓
LocalStorage
```

No external database is required to run the current version.

---

## 🔐 Security & Privacy

FinTrack is currently a **client-side application**.

No financial data is intentionally sent to a remote backend in the current architecture.

Because data is stored in browser LocalStorage:

* Data is tied to the browser/device
* Clearing browser storage can remove application data
* There is currently no cloud synchronization
* There is currently no multi-device account system

Users should not treat the current version as a production banking or financial service.

---

## 📊 Current Modules

| Module          | Description                 |
| --------------- | --------------------------- |
| Dashboard       | Financial overview          |
| Transactions    | Income and expense tracking |
| Analytics       | Financial visualization     |
| Budgets         | Spending limit management   |
| Goals           | Savings goal tracking       |
| Settings        | Application preferences     |
| Data Management | Import, export and reset    |

---

## 🧩 Key React Concepts Used

This project demonstrates practical usage of:

* Functional components
* React Hooks
* `useState`
* `useEffect`
* `useContext`
* Context API
* Component composition
* Controlled forms
* Conditional rendering
* Dynamic lists
* React Router
* Reusable components
* LocalStorage integration
* Responsive UI design

---

## 📈 Example User Workflow

A typical FinTrack workflow looks like:

```text
1. Open Dashboard
        ↓
2. Add income / expenses
        ↓
3. Review transactions
        ↓
4. Create budgets
        ↓
5. Set savings goals
        ↓
6. Analyze spending
        ↓
7. Adjust financial habits
        ↓
8. Export financial data
```

---

## 🖥️ Pages

### Dashboard

Provides an overview of:

* Balance
* Income
* Expenses
* Savings
* Recent transactions

### Transactions

Provides detailed transaction management.

### Analytics

Provides visual representations of financial activity.

### Budgets

Allows users to create and monitor spending limits.

### Goals

Allows users to create and track savings targets.

### Settings

Provides application customization and data management.

---

## 🧪 Testing Checklist

Before a release, the application should be tested for:

```text
✓ Dashboard navigation
✓ Transaction creation
✓ Transaction deletion
✓ Transaction persistence
✓ Budget creation
✓ Goal creation
✓ Goal progress
✓ Analytics calculations
✓ Theme persistence
✓ Currency switching
✓ Import / Export
✓ Reset data
✓ Responsive navigation
✓ Mobile layout
✓ Invalid routes
✓ Production build
```

---

## 🚧 Roadmap

### Version 1.0

* [x] Dashboard
* [x] Transaction management
* [x] Budget management
* [x] Savings goals
* [x] Financial analytics
* [x] Settings
* [x] Local data persistence
* [x] Import / Export
* [x] Multi-currency formatting
* [x] Theme preferences
* [x] Responsive navigation
* [ ] Final QA and release polish

### Version 2.0 — Planned

Future development may include:

* 🔐 User authentication
* ☁️ Cloud database
* 🔄 Multi-device synchronization
* 👤 User accounts
* 📊 Advanced financial analytics
* 🤖 AI-powered financial insights
* 🔔 Smart notifications
* 📅 Recurring transactions
* 💳 Subscription tracking
* 📱 Progressive Web App support
* 🔒 Improved server-side security

---

## 🎯 Project Goals

FinTrack was created as a practical React project focused on building a complete frontend application rather than a simple static interface.

The main goals are to demonstrate:

1. Modern React development
2. Component-based architecture
3. State management with Context API
4. Responsive UI development
5. Data visualization
6. Client-side persistence
7. Reusable components
8. Real-world application structure
9. Clean and maintainable code
10. Practical frontend engineering skills

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Fork the repository

```bash
git fork
```

### Create a branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📜 License

This project is available under the **MIT License**.

See the `LICENSE` file for more information.

---

## 👨‍💻 Author

**Mannat**

Built as a portfolio project to explore modern React development, frontend architecture, state management, data visualization, and responsive UI design.

---

## ⭐ Support

If you find FinTrack useful or interesting, consider giving the repository a ⭐ on GitHub.

It helps support the project and encourages further development.

---

<div align="center">

### 💰 FinTrack

**Track. Analyze. Plan. Grow.**

Built with ❤️ using React, Vite & Tailwind CSS.

</div>
