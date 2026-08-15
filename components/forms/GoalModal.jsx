import { useState } from "react";
import { X } from "lucide-react";

import { useGoals } from "../../context/GoalContext";

function GoalModal({ isOpen, onClose }) {
  const { addGoal } = useGoals();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a goal name.");
      return;
    }

    if (!targetAmount || Number(targetAmount) <= 0) {
      setError("Please enter a valid target amount.");
      return;
    }

    if (
      savedAmount &&
      Number(savedAmount) > Number(targetAmount)
    ) {
      setError(
        "Saved amount cannot be greater than the target."
      );
      return;
    }

    if (!targetDate) {
      setError("Please select a target date.");
      return;
    }

    addGoal({
      name: name.trim(),
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount || 0),
      targetDate,
    });

    setName("");
    setTargetAmount("");
    setSavedAmount("");
    setTargetDate("");
    setError("");

    onClose();
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-hairline bg-surface p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-50">
              Create Savings Goal
            </h2>

            <p className="mt-1 text-sm text-ink-400">
              Set something you're saving for.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-ink-50"
          >
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-vermilion/30 bg-vermilion/10 p-3 text-sm text-vermilion">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Goal Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Goal Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="e.g. New Laptop"
              className="w-full rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
            />
          </div>

          {/* Target Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Target Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                ₹
              </span>

              <input
                type="number"
                min="1"
                value={targetAmount}
                onChange={(event) => {
                  setTargetAmount(event.target.value);
                  setError("");
                }}
                placeholder="80000"
                className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-10 pr-4 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
              />
            </div>
          </div>

          {/* Already Saved */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Already Saved
              <span className="ml-2 text-xs text-ink-500">
                Optional
              </span>
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={savedAmount}
                onChange={(event) => {
                  setSavedAmount(event.target.value);
                  setError("");
                }}
                placeholder="10000"
                className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-10 pr-4 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
              />
            </div>
          </div>

          {/* Target Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">
              Target Date
            </label>

            <input
              type="date"
              value={targetDate}
              onChange={(event) => {
                setTargetDate(event.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-hairline bg-surface-2 p-3 text-ink-50 outline-none focus:border-gold"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl bg-hairline px-5 py-3 font-medium text-ink-50 transition hover:bg-surface-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
            >
              Create Goal
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default GoalModal;