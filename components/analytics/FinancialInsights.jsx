import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

function FinancialInsights({
  income,
  expenses,
  savingsRate,
  topCategory,
}) {
  const insights = [];

  if (income === 0 && expenses === 0) {
    insights.push({
      icon: Lightbulb,
      title: "Start tracking",
      text: "Add some transactions to unlock personalized financial insights.",
      className:
        "bg-gold/10 text-gold",
    });
  }

  if (income > 0) {
    if (savingsRate >= 30) {
      insights.push({
        icon: TrendingUp,
        title: "Great savings rate",
        text: `You're saving ${savingsRate}% of your income. Keep it up!`,
        className:
          "bg-jade/10 text-jade",
      });
    } else if (savingsRate >= 10) {
      insights.push({
        icon: Lightbulb,
        title: "Room to improve",
        text: `You're saving ${savingsRate}% of your income. Consider increasing your savings gradually.`,
        className:
          "bg-saffron/10 text-saffron",
      });
    } else {
      insights.push({
        icon: AlertTriangle,
        title: "Low savings rate",
        text: "Your expenses are taking up most of your income. Consider reviewing your spending.",
        className:
          "bg-vermilion/10 text-vermilion",
      });
    }
  }

  if (expenses > income && income > 0) {
    insights.push({
      icon: TrendingDown,
      title: "Spending exceeds income",
      text: "Your current expenses are higher than your income.",
      className:
        "bg-vermilion/10 text-vermilion",
    });
  }

  if (topCategory) {
    insights.push({
      icon: Lightbulb,
      title: "Top spending category",
      text: `${topCategory.name} is currently your largest expense category.`,
      className:
        "bg-plum/10 text-plum",
    });
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">

      <div>
        <h2 className="text-xl font-semibold text-ink-50">
          Financial Insights
        </h2>

        <p className="mt-1 text-sm text-ink-400">
          Helpful observations from your data
        </p>
      </div>

      <div className="mt-5 space-y-3">

        {insights.map(
          (insight, index) => {
            const Icon =
              insight.icon;

            return (
              <div
                key={index}
                className="flex gap-4 rounded-xl bg-surface-2/50 p-4"
              >

                <div
                  className={`h-fit rounded-xl p-3 ${insight.className}`}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="font-medium text-ink-50">
                    {insight.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-ink-400">
                    {insight.text}
                  </p>
                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default FinancialInsights;
