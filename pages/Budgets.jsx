import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  WalletCards,
  TrendingDown,
} from "lucide-react";

import {
  useBudgets,
} from "../context/BudgetContext";

import {
  useTransactions,
} from "../context/TransactionContext";

import BudgetCard from "../components/budgets/BudgetCard";
import BudgetModal from "../components/forms/BudgetModal";

function Budgets() {
  const {
    budgets,
    deleteBudget,
  } = useBudgets();

  const {
    transactions,
  } = useTransactions();

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    editingBudget,
    setEditingBudget,
  ] = useState(null);

  const currentMonth =
    new Date()
      .toISOString()
      .slice(0, 7);

  const currentBudgets =
    budgets.filter(
      (budget) =>
        budget.month === currentMonth
    );

  const getSpent = (category) => {
    return transactions
      .filter((transaction) => {
        return (
          transaction.type ===
            "expense" &&
          transaction.category ===
            category &&
          transaction.date.startsWith(
            currentMonth
          )
        );
      })
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      );
  };

  const totalBudget =
    currentBudgets.reduce(
      (total, budget) =>
        total + Number(budget.limit),
      0
    );

  const totalSpent =
    currentBudgets.reduce(
      (total, budget) =>
        total +
        getSpent(budget.category),
      0
    );

  const remaining =
    totalBudget - totalSpent;

  const handleAdd = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleDelete = (budget) => {
    const confirmed =
      window.confirm(
        `Delete ${budget.category} budget?`
      );

    if (confirmed) {
      deleteBudget(budget.id);
    }
  };

  return (
    <div className="pb-12">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-ink-50">
            Budgets
          </h1>

          <p className="mt-2 text-ink-400">
            Control your spending with monthly limits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
        >
          <Plus size={20} />
          Create Budget
        </button>

      </div>

      {/* Overview */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-hairline bg-surface p-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gold/10 p-3 text-gold">
              <WalletCards size={21} />
            </div>

            <p className="text-sm text-ink-400">
              Total Budget
            </p>
          </div>

          <p className="mt-4 font-display text-2xl font-semibold text-ink-50">
            ₹
            {totalBudget.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-vermilion/10 p-3 text-vermilion">
              <TrendingDown size={21} />
            </div>

            <p className="text-sm text-ink-400">
              Total Spent
            </p>
          </div>

          <p className="mt-4 font-display text-2xl font-semibold text-vermilion">
            ₹
            {totalSpent.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-5">

          <p className="text-sm text-ink-400">
            Remaining
          </p>

          <p
            className={`mt-4 font-display text-2xl font-semibold ${
              remaining >= 0
                ? "text-jade"
                : "text-vermilion"
            }`}
          >
            ₹
            {Math.abs(
              remaining
            ).toLocaleString(
              "en-IN"
            )}
          </p>

          <p className="mt-1 text-xs text-ink-500">
            {remaining >= 0
              ? "Available in your budgets"
              : "Over your total budget"}
          </p>

        </div>

      </div>

      {/* Budget Cards */}

      <div className="mt-8">

        {currentBudgets.length ===
        0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface/50 px-6 py-20 text-center">

            <div className="rounded-full bg-hairline p-5 text-ink-400">
              <WalletCards size={32} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-ink-50">
              No budgets yet
            </h2>

            <p className="mt-2 max-w-md text-ink-400">
              Create category budgets to
              keep your spending under control.
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-6 rounded-xl bg-gold px-5 py-3 text-ink font-semibold hover:bg-gold-dim"
            >
              Create Your First Budget
            </button>

          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {currentBudgets.map(
              (budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  spent={getSpent(
                    budget.category
                  )}
                  onEdit={handleEdit}
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* Modal */}

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        budget={editingBudget}
      />

    </div>
  );
}

export default Budgets;