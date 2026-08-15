import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import {
  TransactionProvider,
} from "./context/TransactionContext";

import {
  BudgetProvider,
} from "./context/BudgetContext";

import {
  GoalProvider,
} from "./context/GoalContext";

import {
  SettingsProvider,
} from "./context/SettingsContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>

      <SettingsProvider>

        <TransactionProvider>

          <BudgetProvider>

            <GoalProvider>

              <App />

            </GoalProvider>

          </BudgetProvider>

        </TransactionProvider>

      </SettingsProvider>

    </BrowserRouter>
  </React.StrictMode>
);