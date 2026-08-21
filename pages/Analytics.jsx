import {
  useMemo,
} from "react";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";
import { formatCurrency } from "../utils/currency";

import {
  useTransactions,
} from "../context/TransactionContext";

import AnalyticsCard from "../components/analytics/AnalyticsCard";
import ExpenseChart from "../components/analytics/ExpenseChart";
import IncomeExpenseChart from "../components/analytics/IncomeExpenseChart";
import FinancialInsights from "../components/analytics/FinancialInsights";

const CATEGORY_COLORS = [
  "#d4af6a",
  "#4fae86",
  "#e0b23c",
  "#e2695c",
  "#9b8ac4",
  "#6c8ebf",
  "#7fb8ae",
  "#9096ac",
];

function Analytics() {
    const { settings } = useSettings();
  const {
    transactions,
  } = useTransactions();

  const income = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );
  }, [transactions]);

  const balance = income - expenses;

  const savingsRate =
    income > 0
      ? Math.round(
          ((income - expenses) /
            income) *
            100
        )
      : 0;

  const expenseByCategory =
    useMemo(() => {
      const categoryMap = {};

      transactions
        .filter(
          (transaction) =>
            transaction.type ===
            "expense"
        )
        .forEach((transaction) => {
          const category =
            transaction.category ||
            "Other";

          categoryMap[category] =
            (categoryMap[category] ||
              0) +
            Number(
              transaction.amount
            );
        });

      return Object.entries(
        categoryMap
      )
        .map(
          ([name, value], index) => ({
            name,
            value,
            color:
              CATEGORY_COLORS[
                index %
                  CATEGORY_COLORS.length
              ],
          })
        )
        .sort(
          (a, b) =>
            b.value - a.value
        );
    }, [transactions]);

  const monthlyData = useMemo(() => {
    const months = {};

    transactions.forEach(
      (transaction) => {
        const date = new Date(
          transaction.date
        );

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return;
        }

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!months[key]) {
          months[key] = {
            month: date.toLocaleDateString(
              "en-IN",
              {
                month: "short",
              }
            ),
            income: 0,
            expenses: 0,
          };
        }

        if (
          transaction.type ===
          "income"
        ) {
          months[key].income +=
            Number(
              transaction.amount
            );
        } else {
          months[key].expenses +=
            Number(
              transaction.amount
            );
        }
      }
    );

    return Object.entries(months)
      .sort(([a], [b]) =>
        a.localeCompare(b)
      )
      .slice(-6)
      .map(([, value]) => value);
  }, [transactions]);

  const topCategory =
    expenseByCategory[0] || null;

  return (
    <div className="pb-12">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-ink-50">
          Analytics
        </h1>

        <p className="mt-2 text-ink-400">
          Understand your financial habits
          and spending patterns.
        </p>
      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <AnalyticsCard
          title="Net Balance"
          value={`₹${balance.toLocaleString(
            "en-IN"
          )}`}
          subtitle="Income minus expenses"
          icon={Wallet}
          iconClass="bg-gold/10 text-gold"
        />

        <AnalyticsCard
          title="Total Income"
          value={`₹${income.toLocaleString(
            "en-IN"
          )}`}
          subtitle={`${transactions.filter(
            (t) =>
              t.type === "income"
          ).length} income transactions`}
          icon={TrendingUp}
          iconClass="bg-jade/10 text-jade"
        />

        <AnalyticsCard
          title="Total Expenses"
          value={`₹${expenses.toLocaleString(
            "en-IN"
          )}`}
          subtitle={`${transactions.filter(
            (t) =>
              t.type === "expense"
          ).length} expense transactions`}
          icon={TrendingDown}
          iconClass="bg-vermilion/10 text-vermilion"
        />

        <AnalyticsCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle={
            savingsRate >= 20
              ? "Looking good"
              : "Needs attention"
          }
          icon={PiggyBank}
          iconClass="bg-saffron/10 text-saffron"
        />

      </div>

      {/* Charts */}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">

        <ExpenseChart
          data={expenseByCategory}
        />

        <IncomeExpenseChart
          data={monthlyData}
        />

      </div>

      {/* Additional information */}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">

        <FinancialInsights
          income={income}
          expenses={expenses}
          savingsRate={savingsRate}
          topCategory={topCategory}
        />

        <div className="rounded-2xl border border-hairline bg-surface p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-plum/10 p-3 text-plum">
              <Receipt size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink-50">
                Spending Leader
              </h2>

              <p className="text-sm text-ink-400">
                Your largest expense category
              </p>
            </div>

          </div>

          {topCategory ? (
            <div className="mt-8">

              <p className="font-display text-4xl font-semibold text-ink-50">
                {formatCurrency(
                topCategory.value,
                settings.currency
                )}
              </p>

              <p className="mt-2 text-ink-400">
                spent on{" "}
                <span className="font-medium text-ink-50">
                  {topCategory.name}
                </span>
              </p>

              {expenses > 0 && (
                <div className="mt-6">

                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-ink-400">
                      Share of expenses
                    </span>

                    <span className="text-ink-50">
                      {Math.round(
                        (topCategory.value /
                          expenses) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-hairline">

                    <div
                      className="h-full rounded-full bg-plum"
                      style={{
                        width: `${Math.min(
                          (topCategory.value /
                            expenses) *
                            100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <p className="text-ink-500">
                Add expense transactions to
                see your spending leader.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;
