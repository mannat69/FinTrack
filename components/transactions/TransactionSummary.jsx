import {
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

function TransactionSummary({
  transactions,
}) {
  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = income - expenses;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Income */}

      <div className="rounded-2xl border border-hairline bg-surface p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-jade/10 p-3 text-jade">
            <TrendingUp size={20} />
          </div>

          <span className="text-sm text-ink-400">
            Total Income
          </span>

        </div>

        <p className="mt-4 font-display text-2xl font-semibold text-jade">
          {formatCurrency(income)}
        </p>

      </div>

      {/* Expenses */}

      <div className="rounded-2xl border border-hairline bg-surface p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-vermilion/10 p-3 text-vermilion">
            <TrendingDown size={20} />
          </div>

          <span className="text-sm text-ink-400">
            Total Expenses
          </span>

        </div>

        <p className="mt-4 font-display text-2xl font-semibold text-vermilion">
          {formatCurrency(expenses)}
        </p>

      </div>

      {/* Balance */}

      <div className="rounded-2xl border border-hairline bg-surface p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gold/10 p-3 text-gold">
            <Wallet size={20} />
          </div>

          <span className="text-sm text-ink-400">
            Balance
          </span>

        </div>

        <p
          className={`mt-4 font-display text-2xl font-semibold ${
            balance >= 0
              ? "text-gold"
              : "text-vermilion"
          }`}
        >
          {formatCurrency(balance)}
        </p>

      </div>

    </div>
  );
}

export default TransactionSummary;