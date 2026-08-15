import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSettings } from "../../context/SettingsContext";
import { formatCurrency } from "../../utils/currency";


function ExpenseChart({ data }) {
    const { settings } = useSettings();
  if (!data.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-hairline bg-surface">
        <p className="text-ink-500">
          No expense data available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">

      <div>
        <h2 className="text-xl font-semibold text-ink-50">
          Expense Breakdown
        </h2>

        <p className="mt-1 text-sm text-ink-400">
          Where your money is going
        </p>
      </div>

      <div className="mt-5 h-72">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={3}
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                )
              )}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1b1e2a",
                border: "1px solid #2c3044",
                borderRadius: "12px",
                color: "#edeef5",
              }}
              formatter={(value) =>
               formatCurrency(
                value,
                settings.currency
                )
              }
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-surface-2/50 px-3 py-2"
          >
            <div className="flex items-center gap-2">

              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    item.color,
                }}
              />

              <span className="text-sm text-ink-200">
                {item.name}
              </span>

            </div>

            <span className="font-mono text-sm font-medium text-ink-50">
              ₹
              {item.value.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ExpenseChart;
