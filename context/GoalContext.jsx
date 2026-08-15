import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GoalContext = createContext(null);

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState(() => {
    const savedGoals =
      localStorage.getItem("fintrack_goals");

    if (!savedGoals) {
      return [];
    }

    try {
      return JSON.parse(savedGoals);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "fintrack_goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const addGoal = (goal) => {
    const newGoal = {
      id: Date.now(),
      name: goal.name,
      targetAmount: Number(goal.targetAmount),
      savedAmount: Number(
        goal.savedAmount || 0
      ),
      targetDate: goal.targetDate,
      createdAt: new Date().toISOString(),
    };

    setGoals((previous) => [
      ...previous,
      newGoal,
    ]);
  };

  const deleteGoal = (id) => {
    setGoals((previous) =>
      previous.filter(
        (goal) => goal.id !== id
      )
    );
  };

  const addMoney = (id, amount) => {
    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== id) {
          return goal;
        }

        return {
          ...goal,
          savedAmount: Math.min(
            goal.savedAmount + Number(amount),
            goal.targetAmount
          ),
        };
      })
    );
  };

  const withdrawMoney = (id, amount) => {
    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== id) {
          return goal;
        }

        return {
          ...goal,
          savedAmount: Math.max(
            goal.savedAmount - Number(amount),
            0
          ),
        };
      })
    );
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        addMoney,
        withdrawMoney,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error(
      "useGoals must be used inside GoalProvider"
    );
  }

  return context;
}