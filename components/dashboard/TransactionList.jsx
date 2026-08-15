import { useMemo, useState } from "react";

import { useTransactions } from "../../context/TransactionContext";

import TransactionItem from "./TransactionItem";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import EmptyState from "./EmptyState";

function TransactionList() {
  const { transactions } = useTransactions();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        transaction.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, category]);

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-lg">

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-xl font-semibold text-ink-50">
            Transactions
          </h2>

          <p className="mt-1 text-sm text-ink-400">
            {transactions.length} transaction
            {transactions.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <CategoryFilter
            value={category}
            onChange={setCategory}
          />
        </div>

      </div>

      {filteredTransactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default TransactionList;