
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";

interface SearchItem {
  name: string;
  path: string;
}

interface SearchBoxProps {
  items: SearchItem[];
  onSelect?: (item: SearchItem) => void;
  /** Fired on Enter (no exact match highlighted) or "See all results" click. */
  onSearch?: (query: string) => void;
  placeholder?: string;
}

function SearchBox({ items, onSelect, onSearch, placeholder }: SearchBoxProps) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const query = search.trim().toLowerCase();
  const suggestions = query
    ? items.filter((item) => item.name.toLowerCase().includes(query)).slice(0, 8)
    : [];

  // Reset keyboard highlight whenever the result set changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [search]);

  // Close the dropdown when clicking anywhere outside the search box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(item: SearchItem) {
    setSearch(item.name);
    setShowSuggestions(false);
    setActiveIndex(-1);
    onSelect?.(item);
  }

  function handleSearchSubmit() {
    const trimmed = search.trim();
    if (!trimmed) return;
    setShowSuggestions(false);
    onSearch?.(trimmed);
  }

  function handleClear() {
    setSearch("");
    setActiveIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
        <FiSearch className="mr-2 text-gray-500 shrink-0" />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "What do you want to learn today?"}
          className="w-full min-w-0 bg-transparent text-gray-800 outline-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          role="combobox"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="search-suggestions-list"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 shrink-0 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Clear search"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && search && (
        <ul
          id="search-suggestions-list"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg"
        >
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((item, index) => (
                <li key={item.path} id={`search-option-${index}`} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      index === activeIndex
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              {onSearch && (
                <li className="border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                  >
                    See all results for &ldquo;{search.trim()}&rdquo;
                    <FiArrowRight size={14} />
                  </button>
                </li>
              )}
            </>
          ) : (
            <li className="px-4 py-3 text-sm text-gray-500">
              No matches for &ldquo;{search.trim()}&rdquo;
              {onSearch && (
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="ml-1 font-semibold text-indigo-600 hover:underline"
                >
                  Search anyway
                </button>
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;