
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import StarRating from "../../componets/common/StarRating";
import { useAuth } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import { reviews } from "../../data/reviews";
import {
  FiUsers,
  FiBookOpen,
  FiTrendingUp,
  FiDollarSign,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";

function InstructorDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const instructorCourses = courses
    .filter((c) => c.instructorId === 1)
    .slice(0, 4);

  const totalStudents = instructorCourses.reduce(
    (sum, c) => sum + c.studentsCount,
    0
  );

  const totalRevenue = instructorCourses.reduce(
    (sum, c) => sum + c.price * Math.floor(c.studentsCount * 0.1),
    0
  );

  const avgRating = (
    instructorCourses.reduce((sum, c) => sum + c.rating, 0) /
    (instructorCourses.length || 1)
  ).toFixed(1);

  const recentReviews = reviews.slice(0, 3);

  const STAT_CARDS = [
    {
      label: "Total Students",
      value: totalStudents.toLocaleString(),
      icon: <FiUsers size={20} />,
      color: "bg-indigo-500",
      trend: "+12% this month",
    },
    {
      label: "Active Courses",
      value: instructorCourses.length,
      icon: <FiBookOpen size={20} />,
      color: "bg-emerald-500",
      trend: "2 published this week",
    },
    {
      label: "Revenue (Est.)",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign size={20} />,
      color: "bg-amber-500",
      trend: "+8% this month",
    },
    {
      label: "Avg. Rating",
      value: avgRating,
      icon: <FiTrendingUp size={20} />,
      color: "bg-purple-500",
      trend: "from 3,890 reviews",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-0">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800 break-words">
              Welcome back, {currentUser?.name ?? "Instructor"}!
            </h1>

            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-2xl">
              Here's what's happening with your courses today.
            </p>
          </div>

          <button
            onClick={() => navigate("/instructor/create-course")}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-sm"
          >
            <FiPlus size={18} />
            <span>Create Course</span>
          </button>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}
              >
                {s.icon}
              </div>

              {/* Value */}
              <p className="text-xl sm:text-2xl font-black text-gray-800 truncate">
                {s.value}
              </p>

              {/* Label */}
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                {s.label}
              </p>

              {/* Trend */}
              <p className="text-[11px] sm:text-xs text-emerald-600 font-medium mt-1 truncate">
                {s.trend}
              </p>
            </div>
          ))}
        </div>

        {/* ================= MY COURSES ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 mb-6">
          {/* Section Header */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-800">
              My Courses
            </h2>

            <button
              onClick={() => navigate("/instructor/courses")}
              className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-indigo-800 transition-colors shrink-0"
            >
              <span>View All</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          {/* Course List */}
          <div className="space-y-3 sm:space-y-4">
            {instructorCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors min-w-0"
              >
                {/* Course Info */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {course.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-gray-400 mt-1.5">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <FiUsers size={11} />
                        {course.studentsCount.toLocaleString()} students
                      </span>

                      <span className="whitespace-nowrap">
                        ⭐ {course.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price + Status */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 shrink-0 border-t border-gray-200 sm:border-0 pt-3 sm:pt-0">
                  <p className="text-sm sm:text-base font-bold text-indigo-700">
                    ${course.price}
                  </p>

                  <span className="text-[11px] sm:text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium capitalize whitespace-nowrap">
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RECENT REVIEWS ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6">
          <h2 className="text-base sm:text-lg font-black text-gray-800 mb-5">
            Recent Reviews
          </h2>

          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-3 sm:gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 min-w-0"
              >
                {/* Avatar */}
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-100 shrink-0 object-cover"
                />

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  {/* Name + Rating */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">
                      {review.userName}
                    </span>

                    <StarRating
                      rating={review.rating}
                      size="sm"
                    />
                  </div>

                  {/* Date */}
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-1.5">
                    {new Date(review.date).toLocaleDateString()}
                  </p>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InstructorDashboard;

