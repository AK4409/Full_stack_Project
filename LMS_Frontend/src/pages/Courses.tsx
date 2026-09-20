

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import CourseGrid from "../componets/course/CourseGrid";
import CourseFilter from "../componets/course/CourseFilter";
import { courses } from "../data/courses";
import { FiFilter, FiX } from "react-icons/fi";

interface FilterState {
  search: string;
  category: string;
  level: string;
  sortBy: string;
}

function Courses() {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<FilterState>({
    search: queryFromUrl,
    category: "",
    level: "",
    sortBy: "popular",
  });

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    let result = [...courses];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();

      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((c) => c.categoryId.toString() === filters.category);
    }

    // Level filter
    if (filters.level) {
      result = result.filter((c) => c.level === filters.level);
    }

    // Sort
    if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "popular") {
      result.sort((a, b) => b.studentsCount - a.studentsCount);
    }

    setFilteredCourses(result);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            All Courses
          </h1>

          <p className="text-sm sm:text-base text-indigo-200 max-w-xl leading-relaxed">
            Browse our complete library of expert-crafted courses. Filter by
            category, level, or search for something specific.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-5">
          <button
            type="button"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            {showMobileFilter ? <FiX size={18} /> : <FiFilter size={18} />}

            {showMobileFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Filter Sidebar */}
          <aside
            className={`
              w-full lg:w-64 xl:w-72 shrink-0
              ${showMobileFilter ? "block" : "hidden"}
              lg:block
            `}
          >
            <div className="w-full lg:sticky lg:top-24">
              <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
                <CourseFilter
                  onFilterChange={setFilters}
                  totalCount={filteredCourses.length}
                />
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="w-full flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
              <p className="text-gray-600 text-sm">
                Showing{" "}
                <span className="font-bold text-indigo-700">
                  {filteredCourses.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-900">
                  {courses.length}
                </span>{" "}
                courses
              </p>
            </div>

            {/* Course Grid */}
            <div className="w-full min-w-0">
              <CourseGrid courses={filteredCourses} />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;

