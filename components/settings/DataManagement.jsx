import {
  Download,
  Upload,
  Trash2,
} from "lucide-react";

import { useRef } from "react";

import { useTransactions } from "../../context/TransactionContext";
import { useGoals } from "../../context/GoalContext";

function DataManagement() {
  const fileInputRef = useRef(null);

  const {
    transactions,
    setTransactions,
  } = useTransactions();

  const {
    goals,
  } = useGoals();

  const exportData = () => {
    const data = {
      exportedAt:
        new Date().toISOString(),

      version: "1.0.0",

      transactions,
      goals,

      settings:
        JSON.parse(
          localStorage.getItem(
            "fintrack-settings"
          ) || "{}"
        ),
    };

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `fintrack-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(
          e.target.result
        );

        if (
          !Array.isArray(
            data.transactions
          )
        ) {
          throw new Error(
            "Invalid backup file"
          );
        }

        setTransactions(
          data.transactions
        );

        if (
          data.settings
        ) {
          localStorage.setItem(
            "fintrack-settings",
            JSON.stringify(
              data.settings
            )
          );
        }

        alert(
          "FinTrack data imported successfully!"
        );

        window.location.reload();
      } catch {
        alert(
          "Invalid FinTrack backup file."
        );
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  const resetData = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete ALL your FinTrack data? This cannot be undone."
      );

    if (!confirmed) return;

    localStorage.removeItem(
      "fintrack-transactions"
    );

    localStorage.removeItem(
      "fintrack-goals"
    );

    localStorage.removeItem(
      "fintrack-budgets"
    );

    localStorage.removeItem(
      "fintrack-settings"
    );

    window.location.reload();
  };

  return (
    <div className="space-y-4">

      <button
        onClick={exportData}
        className="flex w-full items-center justify-between rounded-xl border border-hairline bg-surface-2/50 p-4 text-left transition hover:border-gold hover:bg-surface-2"
      >
        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gold/10 p-3 text-gold">
            <Download size={20} />
          </div>

          <div>
            <h3 className="font-medium text-ink-50">
              Export Data
            </h3>

            <p className="text-sm text-ink-400">
              Download a backup of your FinTrack data.
            </p>
          </div>

        </div>
      </button>

      <button
        onClick={() =>
          fileInputRef.current?.click()
        }
        className="flex w-full items-center justify-between rounded-xl border border-hairline bg-surface-2/50 p-4 text-left transition hover:border-jade hover:bg-surface-2"
      >
        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-jade/10 p-3 text-jade">
            <Upload size={20} />
          </div>

          <div>
            <h3 className="font-medium text-ink-50">
              Import Data
            </h3>

            <p className="text-sm text-ink-400">
              Restore a previous FinTrack backup.
            </p>
          </div>

        </div>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importData}
        className="hidden"
      />

      <button
        onClick={resetData}
        className="flex w-full items-center gap-4 rounded-xl border border-vermilion/30 bg-vermilion/5 p-4 text-left transition hover:border-vermilion hover:bg-vermilion/10"
      >

        <div className="rounded-xl bg-vermilion/10 p-3 text-vermilion">
          <Trash2 size={20} />
        </div>

        <div>
          <h3 className="font-medium text-vermilion">
            Reset All Data
          </h3>

          <p className="text-sm text-ink-400">
            Permanently delete your local FinTrack data.
          </p>
        </div>

      </button>

    </div>
  );
}

export default DataManagement;
