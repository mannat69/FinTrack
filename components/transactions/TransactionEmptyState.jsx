import {
  Receipt,
  Search,
} from "lucide-react";

function TransactionEmptyState({
  hasFilters,
  onAdd,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface/50 px-6 py-20 text-center">

      <div className="rounded-full bg-hairline p-5 text-ink-400">
        {hasFilters ? (
          <Search size={32} />
        ) : (
          <Receipt size={32} />
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-ink-50">

        {hasFilters
          ? "No transactions found"
          : "No transactions yet"}

      </h2>

      <p className="mt-2 max-w-md text-ink-400">

        {hasFilters
          ? "Try changing your search or filters."
          : "Start tracking your finances by adding your first transaction."}

      </p>

      {!hasFilters && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-6 rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
        >
          Add Your First Transaction
        </button>
      )}

    </div>
  );
}

export default TransactionEmptyState;