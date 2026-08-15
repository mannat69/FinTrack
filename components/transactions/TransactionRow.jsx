import {
  Pencil,
  Trash2,
  Utensils,
  Bus,
  ShoppingBag,
  Receipt,
  HeartPulse,
  GraduationCap,
  Film,
  Wallet,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";

function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}) {
  const isIncome =
    transaction.type === "income";

  const icons = {
    Food: Utensils,
    Transport: Bus,
    Shopping: ShoppingBag,
    Bills: Receipt,
    Health: HeartPulse,
    Education: GraduationCap,
    Entertainment: Film,
    Salary: Wallet,
    Freelance: Briefcase,
    Other: MoreHorizontal,
  };

  const Icon =
    icons[transaction.category] ||
    MoreHorizontal;

  const formattedDate = new Date(
    transaction.date
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group ledger-row flex items-center gap-4 px-4 py-4 transition hover:bg-surface">

      {/* Icon */}

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          isIncome
            ? "bg-jade/10 text-jade"
            : "bg-vermilion/10 text-vermilion"
        }`}
      >
        <Icon size={20} />
      </div>

      {/* Transaction details */}

      <div className="min-w-0 flex-1">

        <h3 className="truncate font-medium text-ink-50">
          {transaction.title}
        </h3>

        <p className="mt-1 text-sm text-ink-400">
          {transaction.category}
          {transaction.notes && (
            <>
              {" "}
              • {transaction.notes}
            </>
          )}
        </p>

      </div>

      {/* Date */}

      <div className="hidden text-sm text-ink-400 md:block">
        {formattedDate}
      </div>

      {/* Amount */}

      <div
        className={`min-w-[110px] text-right font-mono font-semibold ${
          isIncome
            ? "text-jade"
            : "text-vermilion"
        }`}
      >
        {isIncome ? "+" : "-"}₹
        {Number(
          transaction.amount
        ).toLocaleString("en-IN")}
      </div>

      {/* Actions */}

      <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">

        <button
          type="button"
          onClick={() => onEdit(transaction)}
          className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-gold"
          title="Edit"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(transaction)}
          className="rounded-lg p-2 text-ink-400 transition hover:bg-hairline hover:text-vermilion"
          title="Delete"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
}

export default TransactionRow;