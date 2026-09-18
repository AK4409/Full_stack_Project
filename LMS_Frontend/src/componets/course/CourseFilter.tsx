import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { categories } from "../../data/categories";

interface FilterState {
  search: string;
  category: string;
  level: string;
  sortBy: string;
}

interface CourseFilterProps {
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  initialFilters?: FilterState;
}

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function CourseFilter({ onFilterChange, totalCount, initialFilters }: CourseFilterProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters ?? {
      search: "",
      category: "",
      level: "",
      sortBy: "popular",
    }
  );

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    const reset: FilterState = { search: "", category: "", level: "", sortBy: "popular" };
    setFilters(reset);
    onFilterChange(reset);
  };

  const hasActiveFilters = filters.search || filters.category || filters.level;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-800">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
          >
            <FiX size={12} /> Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Search</label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="w-full py-2.5 px-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-colors bg-white text-gray-700"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Category</label>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("category", "")}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors ${
              !filters.category ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter("category", cat.name)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filters.category === cat.name
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              <span>{cat.icon}</span>
              <span className="flex-1 truncate">{cat.name}</span>
              <span className="text-xs opacity-70">{cat.courseCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Level</label>
        <div className="space-y-1.5">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => updateFilter("level", level === "All Levels" ? "" : level)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors ${
                (level === "All Levels" ? !filters.level : filters.level === level)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500 text-center">
          <span className="font-bold text-indigo-600">{totalCount}</span> course{totalCount !== 1 ? "s" : ""} found
        </p>
      </div>
    </div>
  );
}

export default CourseFilter;
