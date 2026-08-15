import {
  useEffect,
  useState,
} from "react";

import { X } from "lucide-react";

import {
  useBudgets,
} from "../../context/BudgetContext";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

function BudgetModal({
  isOpen,
  onClose,
  budget = null,
}) {
  const {
    addBudget,
    updateBudget,
  } = useBudgets();

  const isEditing =
    Boolean(budget);

  const [category, setCategory] =
    useState("Food");

  const [limit, setLimit] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (budget) {
      setCategory(
        budget.category
      );

      setLimit(budget.limit);
    } else {
      setCategory("Food");
      setLimit("");
    }

    setError("");
  }, [budget, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !limit ||
      Number(limit) <= 0
    ) {
      setError(
        "Please enter a valid budget amount."
      );
      return;
    }

    const data = {
      category,
      limit: Number(limit),
      month: new Date()
        .toISOString()
        .slice(0, 7),
    };

    if (isEditing) {
      updateBudget(
        budget.id,
        data
      );
    } else {
      addBudget(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-md rounded-2xl border border-hairline bg-surface p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-50">
              {isEditing
                ? "Edit Budget"
                : "Create Budget"}
            </h2>

            <p className="mt-1 text-sm text-ink-400">
              Set a monthly spending limit.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 hover:bg-hairline hover:text-ink-50"
          >
            <X size={21} />
          </button>

        </div>

        {error && (
          <div className="mt-5 rounded-xl bg-vermilion/10 p-3 text-sm text-vermilion">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none focus:border-gold"
            >
              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Monthly Limit
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                ₹
              </span>

              <input
                type="number"
                min="1"
                value={limit}
                onChange={(event) =>
                  setLimit(
                    event.target.value
                  )
                }
                placeholder="5000"
                className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-10 pr-4 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-hairline px-5 py-3 font-medium text-ink-50 hover:bg-surface-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gold px-5 py-3 text-ink font-semibold hover:bg-gold-dim"
            >
              {isEditing
                ? "Save Changes"
                : "Create Budget"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default BudgetModal;
