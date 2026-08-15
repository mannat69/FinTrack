import { useSettings } from "../../context/SettingsContext";
import { formatCurrency } from "../../utils/currency";

function SummaryCard({
  title,
  amount,
  color = "text-gold",
}) {
  const { settings } = useSettings();

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-surface-3">
      <p className="text-sm text-ink-400">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${color}`}
      >
        {formatCurrency(
          amount,
          settings.currency
        )}
      </h2>
    </div>
  );
}

export default SummaryCard;