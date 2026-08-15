import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Main application layout */}
      <Route element={<Layout />}>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={<Transactions />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Budgets */}
        <Route
          path="/budgets"
          element={<Budgets />}
        />

        {/* Goals */}
        <Route
          path="/goals"
          element={<Goals />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* Unknown routes → Dashboard */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;