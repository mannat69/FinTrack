import TransactionRow from "./TransactionRow";

function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-2 shadow-lg">

      {/* Header */}

      <div className="stamp-label hidden border-b border-hairline bg-surface px-4 py-3 text-ink-500 md:flex">

        <div className="w-11" />

        <div className="flex-1">
          Transaction
        </div>

        <div className="w-32 text-right">
          Date
        </div>

        <div className="w-28 text-right">
          Amount
        </div>

        <div className="w-20" />

      </div>

      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default TransactionList;