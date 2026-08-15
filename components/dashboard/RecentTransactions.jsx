import {
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
} from "lucide-react";

function RecentTransactions({
  transactions,
  onAdd,
}) {
  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-lg">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink-50">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-ink-400">
            Your latest financial activity
          </p>
        </div>

        <Receipt
          size={22}
          className="text-gold"
        />
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">

          <div className="rounded-full bg-hairline p-4 text-ink-400">
            <Receipt size={28} />
          </div>

          <h3 className="mt-4 font-medium text-ink-50">
            No transactions yet
          </h3>

          <p className="mt-1 text-sm text-ink-400">
            Add your first transaction to
            start tracking your finances.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-5 rounded-xl bg-gold px-4 py-2.5 text-sm text-ink font-semibold transition hover:bg-gold-dim"
          >
            Add Transaction
          </button>

        </div>
      ) : (
        <div className="mt-5">
          {recent.map((transaction) => {
            const isIncome =
              transaction.type === "income";

            return (
              <div
                key={transaction.id}
                className="ledger-row flex items-center gap-4 py-3 transition hover:bg-surface-2/40"
              >
                <div
                  className={`rounded-xl p-3 ${
                    isIncome
                      ? "bg-jade/10 text-jade"
                      : "bg-vermilion/10 text-vermilion"
                  }`}
                >
                  {isIncome ? (
                    <ArrowUpRight size={18} />
                  ) : (
                    <ArrowDownLeft size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-ink-50">
                    {transaction.title}
                  </h3>

                  <p className="text-xs text-ink-400">
                    {transaction.category}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-mono font-semibold ${
                      isIncome
                        ? "text-jade"
                        : "text-vermilion"
                    }`}
                  >
                    {isIncome ? "+" : "-"}₹
                    {Number(
                      transaction.amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="text-xs text-ink-500">
                    {new Date(
                      transaction.date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default RecentTransactions;