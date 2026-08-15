import { Receipt } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">

      <div className="mb-4 rounded-full bg-hairline p-5 text-ink-400">
        <Receipt size={32} />
      </div>

      <h3 className="text-lg font-semibold text-ink-50">
        No transactions found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-ink-400">
        Add your first transaction using the button below.
      </p>

    </div>
  );
}

export default EmptyState;