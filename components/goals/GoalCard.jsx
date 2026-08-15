import { useState } from "react";

import {
  Trophy,
  Trash2,
  Plus,
  Minus,
  CalendarDays,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import { useGoals } from "../../context/GoalContext";

function GoalCard({ goal }) {
  const {
    deleteGoal,
    addMoney,
    withdrawMoney,
  } = useGoals();

  const [amount, setAmount] = useState("");

  const percentage =
    goal.targetAmount > 0
      ? (goal.savedAmount / goal.targetAmount) * 100
      : 0;

  const progress = Math.min(percentage, 100);

  const remaining = Math.max(
    goal.targetAmount - goal.savedAmount,
    0
  );

  const completed =
    goal.savedAmount >= goal.targetAmount;

  const targetDate = new Date(goal.targetDate);

  const today = new Date();

  const difference =
    targetDate.getTime() - today.getTime();

  const daysRemaining = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  const overdue =
    daysRemaining < 0 && !completed;

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  const handleAddMoney = () => {
    if (!amount || Number(amount) <= 0) {
      return;
    }

    addMoney(goal.id, Number(amount));
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) {
      return;
    }

    withdrawMoney(goal.id, Number(amount));
    setAmount("");
  };

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gold/10 p-3 text-gold">
            <Trophy size={24} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ink-50">
              {goal.name}
            </h3>

            <p className="text-sm text-ink-400">
              Savings goal
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => deleteGoal(goal.id)}
          className="rounded-lg p-2 text-ink-500 transition hover:bg-vermilion/10 hover:text-vermilion"
          title="Delete goal"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Amount */}

      <div className="mt-6 flex items-end justify-between">

        <div>
          <p className="text-sm text-ink-400">
            Saved
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink-50">
            {formatCurrency(goal.savedAmount)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-ink-400">
            Target
          </p>

          <p className="mt-1 font-semibold text-ink-200">
            {formatCurrency(goal.targetAmount)}
          </p>
        </div>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="h-3 overflow-hidden rounded-full bg-hairline">

          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completed
                ? "bg-jade"
                : "bg-gold"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-sm">

          <span className="text-ink-400">
            {percentage.toFixed(0)}% complete
          </span>

          {!completed && (
            <span className="text-ink-400">
              {formatCurrency(remaining)} left
            </span>
          )}

        </div>

      </div>

      {/* Date */}

      <div className="mt-5 flex items-center gap-2 text-sm">

        <CalendarDays
          size={17}
          className="text-ink-400"
        />

        <span className="text-ink-400">
          Target:{" "}
          {targetDate.toLocaleDateString("en-IN")}
        </span>

      </div>

      {/* Status */}

      <div className="mt-4">

        {completed ? (
          <div className="flex items-center gap-2 rounded-xl bg-jade/10 p-3 text-sm text-jade">
            <CheckCircle size={18} />
            Goal completed! 🎉
          </div>
        ) : overdue ? (
          <div className="flex items-center gap-2 rounded-xl bg-vermilion/10 p-3 text-sm text-vermilion">
            <AlertTriangle size={18} />
            Target date has passed.
          </div>
        ) : daysRemaining === 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-saffron/10 p-3 text-sm text-saffron">
            <AlertTriangle size={18} />
            Target date is today.
          </div>
        ) : (
          <div className="text-sm text-ink-400">
            ⏳ {daysRemaining} days remaining
          </div>
        )}

      </div>

      {/* Add / Withdraw */}

      {!completed && (
        <div className="mt-5 flex gap-2">

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Amount"
            className="min-w-0 flex-1 rounded-xl border border-hairline bg-surface-2 px-3 py-2 text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
          />

          <button
            type="button"
            onClick={handleAddMoney}
            className="rounded-xl bg-jade p-3 text-ink-50 transition hover:bg-jade-dim"
            title="Add money"
          >
            <Plus size={19} />
          </button>

          <button
            type="button"
            onClick={handleWithdraw}
            className="rounded-xl bg-hairline p-3 text-ink-50 transition hover:bg-surface-3"
            title="Withdraw money"
          >
            <Minus size={19} />
          </button>

        </div>
      )}

    </div>
  );
}

export default GoalCard;
