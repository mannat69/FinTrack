import {
  AlertTriangle,
  X,
} from "lucide-react";

function DeleteTransactionModal({
  transaction,
  onConfirm,
  onClose,
}) {
  if (!transaction) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-md rounded-2xl border border-hairline bg-surface p-6 shadow-2xl">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-vermilion/10 p-3 text-vermilion">
              <AlertTriangle size={22} />
            </div>

            <h2 className="text-xl font-bold text-ink-50">
              Delete Transaction?
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 hover:bg-hairline hover:text-ink-50"
          >
            <X size={20} />
          </button>

        </div>

        <p className="mt-5 text-ink-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-ink-50">
            {transaction.title}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-hairline px-5 py-3 font-medium text-ink-50 transition hover:bg-surface-3"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-vermilion px-5 py-3 font-medium text-ink-50 transition hover:bg-vermilion-dim"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteTransactionModal;
