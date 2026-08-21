import { useMemo, useState } from "react";

import { Plus } from "lucide-react";

import {
  useTransactions,
} from "../context/TransactionContext";

import TransactionList from "../components/transactions/TransactionList";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionSummary from "../components/transactions/TransactionSummary";
import TransactionEmptyState from "../components/transactions/TransactionEmptyState";
import DeleteTransactionModal from "../components/transactions/DeleteTransactionModal";

import TransactionModal from "../components/forms/TransactionModal";

function Transactions() {
  const {
    transactions,
    deleteTransaction,
  } = useTransactions();

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("all");

  const [type, setType] =
    useState("all");

  const [sort, setSort] =
    useState("newest");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [deletingTransaction, setDeletingTransaction] =
    useState(null);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search

    if (search.trim()) {
      const query =
        search.toLowerCase();

      result = result.filter(
        (transaction) =>
          transaction.title
            .toLowerCase()
            .includes(query) ||
          transaction.category
            .toLowerCase()
            .includes(query) ||
          transaction.notes
            ?.toLowerCase()
            .includes(query)
      );
    }

    // Category

    if (category !== "all") {
      result = result.filter(
        (transaction) =>
          transaction.category === category
      );
    }

    // Type

    if (type !== "all") {
      result = result.filter(
        (transaction) =>
          transaction.type === type
      );
    }

    // Sorting

    switch (sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        );
        break;

      case "highest":
        result.sort(
          (a, b) =>
            Number(b.amount) -
            Number(a.amount)
        );
        break;

      case "lowest":
        result.sort(
          (a, b) =>
            Number(a.amount) -
            Number(b.amount)
        );
        break;

      case "az":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "za":
        result.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );
        break;
    }

    return result;
  }, [
    transactions,
    search,
    category,
    type,
    sort,
  ]);

  const hasFilters =
    search.trim() ||
    category !== "all" ||
    type !== "all";

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDelete = () => {
    if (!deletingTransaction) {
      return;
    }

    deleteTransaction(
      deletingTransaction.id
    );

    setDeletingTransaction(null);
  };

  return (
    <div className="pb-12">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-ink-50">
            Transactions
          </h1>

          <p className="mt-2 text-ink-400">
            Manage your income and expenses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
        >
          <Plus size={20} />
          Add Transaction
        </button>

      </div>

      {/* Summary */}

      <div className="mt-8">
        <TransactionSummary
          transactions={transactions}
        />
      </div>

      {/* Filters */}

      <div className="mt-6">
        <TransactionFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          type={type}
          setType={setType}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Transactions */}

      <div className="mt-6">

        {filteredTransactions.length > 0 ? (
          <TransactionList
            transactions={
              filteredTransactions
            }
            onEdit={handleEdit}
            onDelete={
              setDeletingTransaction
            }
          />
        ) : (
          <TransactionEmptyState
            hasFilters={hasFilters}
            onAdd={handleAdd}
          />
        )}

      </div>

      {/* Add / Edit Modal */}

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={
          editingTransaction
        }
      />

      {/* Delete Modal */}

      <DeleteTransactionModal
        transaction={
          deletingTransaction
        }
        onConfirm={handleDelete}
        onClose={() =>
          setDeletingTransaction(null)
        }
      />

    </div>
  );
}

export default Transactions;