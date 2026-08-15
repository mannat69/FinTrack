import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

function TransactionFilters({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  sort,
  setSort,
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-lg">

      <div className="flex items-center gap-2 mb-4">

        <SlidersHorizontal
          size={18}
          className="text-gold"
        />

        <h2 className="font-medium text-ink-50">
          Filters
        </h2>

      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-10 pr-4 text-sm text-ink-50 outline-none placeholder:text-ink-500 focus:border-gold"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-sm text-ink-50 outline-none focus:border-gold"
        >
          <option value="all">
            All Categories
          </option>

          <option value="Food">Food</option>
          <option value="Transport">
            Transport
          </option>
          <option value="Shopping">
            Shopping
          </option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Education">
            Education
          </option>
          <option value="Entertainment">
            Entertainment
          </option>
          <option value="Salary">Salary</option>
          <option value="Freelance">
            Freelance
          </option>
          <option value="Other">Other</option>
        </select>

        {/* Type */}

        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value)
          }
          className="rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-sm text-ink-50 outline-none focus:border-gold"
        >
          <option value="all">
            All Transactions
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expenses
          </option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          className="rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-sm text-ink-50 outline-none focus:border-gold"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>

          <option value="az">
            A → Z
          </option>

          <option value="za">
            Z → A
          </option>
        </select>

      </div>

    </div>
  );
}

export default TransactionFilters;