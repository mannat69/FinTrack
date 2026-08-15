import { useSettings } from "../../context/SettingsContext";
import { formatCurrency } from "../../utils/currency";

function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass = "bg-gold/10 text-gold",
  isCurrency = false,
}) {
  const { settings } = useSettings();

  const displayValue =
    isCurrency
      ? formatCurrency(
          value,
          settings.currency
        )
      : value;

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-ink-400">
            {title}
          </p>

          <h3 className="font-display mt-2 text-2xl font-semibold text-ink-50">
            {displayValue}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-ink-500">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`rounded-xl p-3 ${iconClass}`}
          >
            <Icon size={22} />
          </div>
        )}

      </div>

    </div>
  );
}

export default AnalyticsCard;
