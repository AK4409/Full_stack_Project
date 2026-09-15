import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchItem {
  name: string;
  path: string;
}

interface SearchBoxProps {
  items: SearchItem[];
  onSelect?: (item: SearchItem) => void;
}

function SearchBox({ items, onSelect }: SearchBoxProps) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(item: SearchItem) {
    setSearch(item.name);
    setShowSuggestions(false);

    if (onSelect) {
      onSelect(item);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm">
        <FiSearch className="mr-2 text-gray-500" />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="What do you want to learn today?"
          className="w-full bg-transparent text-gray-800 outline-none"
        />
      </div>

      {/* Suggestions */}
      {showSuggestions && search && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
          {suggestions.map((item) => (
            <li key={item.path}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full px-4 py-3 text-left text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;