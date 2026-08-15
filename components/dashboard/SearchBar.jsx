import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search transactions..."
        className="w-full rounded-xl border border-hairline bg-surface-2 py-3 pl-11 pr-4 text-ink-50 outline-none transition placeholder:text-ink-500 focus:border-gold"
      />
    </div>
  );
}

export default SearchBar;