import { useState } from "react";

import {
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  useTransactions,
} from "../context/TransactionContext";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import TransactionModal from "../components/forms/TransactionModal";

function Dashboard() {
  const {
    transactions,
    getIncome,
    getExpenses,
    getBalance,
  } = useTransactions();

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const income = getIncome();
  const expenses = getExpenses();
  const balance = getBalance();

  const savings = income - expenses;

  const today = new Date();

  const monthName =
    today.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

  const currentMonthTransactions =
    transactions.filter((transaction) => {
      const date = new Date(
        transaction.date
      );

      return (
        date.getMonth() ===
          today.getMonth() &&
        date.getFullYear() ===
          today.getFullYear()
      );
    });

  const monthlyIncome =
    currentMonthTransactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  const monthlyExpenses =
    currentMonthTransactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );

  return (
    <div className="pb-12">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="stamp-label text-gold">
            {monthName}
          </p>

          <h1 className="mt-1 text-4xl font-semibold text-ink-50">
            Good Evening
          </h1>

          <p className="mt-2 text-ink-400">
            Here's your financial overview.
          </p>
        </div>

        <div className="stamp-label flex items-center gap-2 rounded-full border border-dashed border-hairline px-4 py-2 text-ink-400">
          <CalendarDays size={15} />
          {today.toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </div>

      </div>

      {/* Stats */}

      <div className="mt-8">
        <DashboardStats
          income={income}
          expenses={expenses}
          balance={balance}
        />
      </div>

      {/* Monthly Overview */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-hairline bg-surface p-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-jade/10 p-3 text-jade">
              <ArrowUpRight size={20} />
            </div>

            <div>
              <p className="text-sm text-ink-400">
                This Month's Income
              </p>

              <p className="text-2xl font-bold text-jade">
                ₹
                {monthlyIncome.toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>

        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-vermilion/10 p-3 text-vermilion">
              <ArrowDownRight size={20} />
            </div>

            <div>
              <p className="text-sm text-ink-400">
                This Month's Expenses
              </p>

              <p className="text-2xl font-bold text-vermilion">
                ₹
                {monthlyExpenses.toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="mt-6">
        <RecentTransactions
          transactions={transactions}
          onAdd={() =>
            setIsModalOpen(true)
          }
        />
      </div>

      {/* Modal */}

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      />

    </div>
  );
}

export default Dashboard;