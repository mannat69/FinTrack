const CURRENCY_CONFIG = {
  INR: {
    locale: "en-IN",
    currency: "INR",
  },

  USD: {
    locale: "en-US",
    currency: "USD",
  },

  EUR: {
    locale: "de-DE",
    currency: "EUR",
  },

  GBP: {
    locale: "en-GB",
    currency: "GBP",
  },
};

export function formatCurrency(
  amount,
  currency = "INR"
) {
  const config =
    CURRENCY_CONFIG[currency] ||
    CURRENCY_CONFIG.INR;

  return new Intl.NumberFormat(
    config.locale,
    {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    }
  ).format(Number(amount) || 0);
}

export function getCurrencySymbol(
  currency = "INR"
) {
  const config =
    CURRENCY_CONFIG[currency] ||
    CURRENCY_CONFIG.INR;

  return new Intl.NumberFormat(
    config.locale,
    {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    }
  )
    .formatToParts(0)
    .find(
      (part) => part.type === "currency"
    )?.value || "₹";
}
