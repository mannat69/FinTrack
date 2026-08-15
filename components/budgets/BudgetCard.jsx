import {
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function BudgetCard({
  budget,
  spent,
  onEdit,
  onDelete,
}) {
  const limit =
    Number(budget.limit);

  const percentage =
    limit > 0
      ? Math.min(
          (spent / limit) * 100,
          100
        )
      : 0;

  const remaining =
    limit - spent;

  const isOver =
    spent > limit;

  const isNearLimit =
    percentage >= 80 &&
    !isOver;

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-ink-400">
            Monthly Budget
          </p>

          <h3 className="mt-1 text-xl font-semibold text-ink-50">
            {budget.category}
          </h3>
        </div>

        <div className="flex gap-1">

          <button
            type="button"
            onClick={() => onEdit(budget)}
            className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-gold"
            title="Edit budget"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(budget)
            }
            className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-vermilion"
            title="Delete budget"
          >
            <Trash2 size={17} />
          </button>

        </div>

      </div>

      {/* Amounts */}

      <div className="mt-6 flex items-end justify-between">

        <div>
          <p className="text-sm text-ink-500">
            Spent
          </p>

          <p
            className={`font-display text-2xl font-semibold ${
              isOver
                ? "text-vermilion"
                : "text-ink-50"
            }`}
          >
            ₹
            {spent.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-ink-500">
            Limit
          </p>

          <p className="font-semibold text-ink-200">
            ₹
            {limit.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="h-3 overflow-hidden rounded-full bg-hairline">

          <div
            className={`h-full rounded-full transition-all ${
              isOver
                ? "bg-vermilion"
                : isNearLimit
                ? "bg-saffron"
                : "bg-gold"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-xs">

          <span className="text-ink-500">
            {Math.round(
              percentage
            )}
            % used
          </span>

          <span
            className={
              isOver
                ? "text-vermilion"
                : "text-ink-400"
            }
          >
            {isOver
              ? `₹${Math.abs(
                  remaining
                ).toLocaleString(
                  "en-IN"
                )} over`
              : `₹${remaining.toLocaleString(
                  "en-IN"
                )} remaining`}
          </span>

        </div>

      </div>

      {/* Status */}

      <div className="mt-5">

        {isOver ? (
          <div className="flex items-center gap-2 rounded-xl bg-vermilion/10 p-3 text-sm text-vermilion">
            <AlertTriangle size={17} />
            You've exceeded this budget.
          </div>
        ) : isNearLimit ? (
          <div className="flex items-center gap-2 rounded-xl bg-saffron/10 p-3 text-sm text-saffron">
            <AlertTriangle size={17} />
            You're approaching your limit.
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-jade/10 p-3 text-sm text-jade">
            <CheckCircle2 size={17} />
            You're within your budget.
          </div>
        )}

      </div>

    </div>
  );
}

export default BudgetCard;
