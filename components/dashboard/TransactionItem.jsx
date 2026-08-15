import {
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

import { useTransactions } from "../../context/TransactionContext";

function TransactionItem({ transaction }) {
  const { deleteTransaction } = useTransactions();

  const isIncome = transaction.type === "income";

  const formattedAmount = Number(
    transaction.amount
  ).toLocaleString("en-IN");

  const handleDelete = () => {
    deleteTransaction(transaction.id);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-hairline bg-surface-2/40 p-4 transition hover:bg-hairline/40">

      {/* Left Side */}

      <div className="flex min-w-0 items-center gap-4">

        {/* Icon */}

        <div
          className={`flex-shrink-0 rounded-xl p-3 ${
            isIncome
              ? "bg-jade/10 text-jade"
              : "bg-vermilion/10 text-vermilion"
          }`}
        >
          {isIncome ? (
            <ArrowUpCircle size={22} />
          ) : (
            <ArrowDownCircle size={22} />
          )}
        </div>

        {/* Transaction Information */}

        <div className="min-w-0">
          <h3 className="truncate font-medium text-ink-50">
            {transaction.title}
          </h3>

          <p className="mt-1 text-sm text-ink-400">
            {transaction.category}
            {" • "}
            {transaction.date}
          </p>

          {transaction.notes && (
            <p className="mt-1 truncate text-xs text-ink-500">
              {transaction.notes}
            </p>
          )}
        </div>
      </div>

      {/* Right Side */}

      <div className="ml-4 flex flex-shrink-0 items-center gap-4">

        {/* Amount */}

        <span
          className={`font-semibold ${
            isIncome
              ? "text-jade"
              : "text-vermilion"
          }`}
        >
          {isIncome ? "+" : "-"}₹
          {formattedAmount}
        </span>

        {/* Delete */}

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg p-2 text-ink-500 transition hover:bg-vermilion/10 hover:text-vermilion"
          title="Delete transaction"
          aria-label={`Delete ${transaction.title}`}
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default TransactionItem;