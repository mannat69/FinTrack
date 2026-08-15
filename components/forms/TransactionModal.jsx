import { useEffect, useState } from "react";

import {
  X,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import {
  useTransactions,
} from "../../context/TransactionContext";

function TransactionModal({
  isOpen,
  onClose,
  transaction = null,
}) {
  const {
    addTransaction,
    updateTransaction,
  } = useTransactions();

  const isEditing =
    Boolean(transaction);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("expense");

  const [category, setCategory] =
    useState("Food");

  const [date, setDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (transaction) {
      setTitle(
        transaction.title || ""
      );

      setAmount(
        transaction.amount || ""
      );

      setType(
        transaction.type || "expense"
      );

      setCategory(
        transaction.category || "Food"
      );

      setDate(
        transaction.date || ""
      );

      setNotes(
        transaction.notes || ""
      );
    } else {
      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("Food");
      setDate(
        new Date()
          .toISOString()
          .split("T")[0]
      );
      setNotes("");
    }

    setError("");
  }, [transaction, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(
        "Please enter a transaction title."
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError(
        "Please enter a valid amount."
      );
      return;
    }

    if (!date) {
      setError(
        "Please select a date."
      );
      return;
    }

    const data = {
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
      notes: notes.trim(),
    };

    if (isEditing) {
      updateTransaction(
        transaction.id,
        data
      );
    } else {
      addTransaction(data);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-hairline bg-surface p-6 shadow-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-50">
              {isEditing
                ? "Edit Transaction"
                : "Add Transaction"}
            </h2>

            <p className="mt-1 text-sm text-ink-400">
              {isEditing
                ? "Update your transaction details."
                : "Record your income or expense."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-ink-50"
          >
            <X size={22} />
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-5 rounded-xl border border-vermilion/30 bg-vermilion/10 p-3 text-sm text-vermilion">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Type */}

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() =>
                setType("expense")
              }
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 font-medium transition ${
                type === "expense"
                  ? "border-vermilion bg-vermilion/10 text-vermilion"
                  : "border-hairline text-ink-400 hover:bg-hairline"
              }`}
            >
              <ArrowDownLeft
                size={19}
              />
              Expense
            </button>

            <button
              type="button"
              onClick={() =>
                setType("income")
              }
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 font-medium transition ${
                type === "income"
                  ? "border-jade bg-jade/10 text-jade"
                  : "border-hairline text-ink-400 hover:bg-hairline"
              }`}
            >
              <ArrowUpRight
                size={19}
              />
              Income
            </button>

          </div>

          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="e.g. Grocery Shopping"
              className="w-full rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
            />
          </div>

          {/* Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                ₹
              </span>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value
                  )
                }
                placeholder="500"
                className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-10 pr-4 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
              />
            </div>
          </div>

          {/* Category */}

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
              <option value="Food">
                Food
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Salary">
                Salary
              </option>

              <option value="Freelance">
                Freelance
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none focus:border-gold"
            />
          </div>

          {/* Notes */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Notes
              <span className="ml-2 text-xs text-ink-500">
                Optional
              </span>
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(
                  event.target.value
                )
              }
              placeholder="Add some notes..."
              rows="3"
              className="w-full resize-none rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-hairline px-5 py-3 font-medium text-ink-50 transition hover:bg-surface-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
            >
              {isEditing
                ? "Save Changes"
                : "Add Transaction"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default TransactionModal;