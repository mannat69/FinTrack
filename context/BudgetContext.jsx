import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BudgetContext =
  createContext(null);

export function BudgetProvider({
  children,
}) {
  const [budgets, setBudgets] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "fintrack_budgets"
        );

      if (!saved) {
        return [];
      }

      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    });

  useEffect(() => {
    localStorage.setItem(
      "fintrack_budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  const addBudget = (budget) => {
    const newBudget = {
      id: Date.now(),
      category: budget.category,
      limit: Number(budget.limit),
      month:
        budget.month ||
        new Date()
          .toISOString()
          .slice(0, 7),
      createdAt:
        new Date().toISOString(),
    };

    setBudgets((previous) => [
      newBudget,
      ...previous,
    ]);
  };

  const updateBudget = (
    id,
    updatedBudget
  ) => {
    setBudgets((previous) =>
      previous.map((budget) =>
        budget.id === id
          ? {
              ...budget,
              ...updatedBudget,
              limit: Number(
                updatedBudget.limit
              ),
            }
          : budget
      )
    );
  };

  const deleteBudget = (id) => {
    setBudgets((previous) =>
      previous.filter(
        (budget) =>
          budget.id !== id
      )
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  const context =
    useContext(BudgetContext);

  if (!context) {
    throw new Error(
      "useBudgets must be used inside BudgetProvider"
    );
  }

  return context;
}
