import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions =
      localStorage.getItem("fintrack_transactions");

    if (!savedTransactions) {
      return [];
    }

    try {
      return JSON.parse(savedTransactions);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "fintrack_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),

      title: transaction.title,

      amount: Number(transaction.amount),

      type: transaction.type,

      category: transaction.category,

      date: transaction.date,

      notes: transaction.notes || "",

      createdAt: new Date().toISOString(),
    };

    setTransactions((previous) => [
      newTransaction,
      ...previous,
    ]);
  };

  const updateTransaction = (
    id,
    updatedTransaction
  ) => {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
              amount: Number(
                updatedTransaction.amount
              ),
            }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter(
        (transaction) =>
          transaction.id !== id
      )
    );
  };

  const getIncome = () => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );
  };

  const getExpenses = () => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );
  };

  const getBalance = () => {
    return getIncome() - getExpenses();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getIncome,
        getExpenses,
        getBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context =
    useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}