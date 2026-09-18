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
  const [filters, setFilters] = useState<FilterState>({ search: queryFromUrl, category: "", level: "", sortBy: "popular" });
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black mb-3">All Courses</h1>
          <p className="text-indigo-200 max-w-xl">
            Browse our complete library of expert-crafted courses. Filter by category, level, or search for something specific.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            {showMobileFilter ? <FiX /> : <FiFilter />}
            {showMobileFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className={`w-full lg:w-64 shrink-0 ${showMobileFilter ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24">
              <CourseFilter onFilterChange={setFilters} totalCount={filteredCourses.length} />
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-bold text-indigo-700">{filteredCourses.length}</span> of{" "}
                <span className="font-bold">{courses.length}</span> courses
              </p>
            </div>
            <CourseGrid courses={filteredCourses} />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;