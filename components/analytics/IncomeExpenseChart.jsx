import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function IncomeExpenseChart({ data }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">

      <div>
        <h2 className="text-xl font-semibold text-ink-50">
          Income vs Expenses
        </h2>

        <p className="mt-1 text-sm text-ink-400">
          Your financial activity over time
        </p>
      </div>

      <div className="mt-6 h-80">

        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-ink-500">
              No financial data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2c3044"
              />

              <XAxis
                dataKey="month"
                stroke="#6c7290"
              />

              <YAxis
                stroke="#6c7290"
                tickFormatter={(value) =>
                  `₹${value}`
                }
              />

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#1b1e2a",
                  border:
                    "1px solid #2c3044",
                  borderRadius:
                    "12px",
                  color: "#edeef5",
                }}
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
              />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#4fae86"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#e2695c"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
}

export default IncomeExpenseChart;
