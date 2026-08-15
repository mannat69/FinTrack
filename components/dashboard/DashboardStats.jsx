import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

function DashboardStats({
  income,
  expenses,
  balance,
}) {
  const savings = income - expenses;

  const savingsRate =
    income > 0
      ? Math.round((savings / income) * 100)
      : 0;

  const cards = [
    {
      title: "Total Income",
      amount: income,
      icon: TrendingUp,
      iconClass: "bg-jade/10 text-jade",
      amountClass: "text-jade",
    },
    {
      title: "Total Expenses",
      amount: expenses,
      icon: TrendingDown,
      iconClass: "bg-vermilion/10 text-vermilion",
      amountClass: "text-vermilion",
    },
    {
      title: "Savings",
      amount: savings,
      icon: PiggyBank,
      iconClass: "bg-saffron/10 text-saffron",
      amountClass:
        savings >= 0
          ? "text-saffron"
          : "text-vermilion",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Signature: the balance rendered as a passbook page */}

      <div className="passbook-card rounded-2xl">

        <div className="flex flex-col gap-6 py-7 pl-9 pr-6 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="stamp-label text-[#8a7250]">
              Total Balance
            </p>

            <p className="font-display mt-2 text-5xl font-semibold tracking-tight">
              ₹{balance.toLocaleString("en-IN")}
            </p>

            <div className="mt-3 h-px w-40 bg-[repeating-linear-gradient(90deg,var(--color-paper-line)_0_6px,transparent_6px_10px)]" />
          </div>

          <p className="stamp-label rounded-full border border-[#241c10]/20 px-3 py-1.5 text-[#8a7250]">
            {balance >= 0 ? "In Credit" : "Overdrawn"}
          </p>

        </div>

      </div>

      {/* Income / Expenses / Savings */}

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-hairline bg-surface p-5 shadow-lg transition hover:-translate-y-1 hover:border-surface-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-400">
                    {card.title}
                  </p>

                  <h2
                    className={`font-display mt-2 text-2xl font-semibold ${card.amountClass}`}
                  >
                    ₹
                    {card.amount.toLocaleString(
                      "en-IN"
                    )}
                  </h2>
                </div>

                <div
                  className={`rounded-xl p-3 ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>
              </div>

              {card.title === "Savings" && (
                <p className="mt-3 text-xs text-ink-500">
                  {savingsRate}% of your income
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default DashboardStats;
