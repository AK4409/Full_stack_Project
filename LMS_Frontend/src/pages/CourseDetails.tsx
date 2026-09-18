import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import StarRating from "../componets/common/StarRating";
import Badge from "../componets/common/Badge";
import Modal from "../componets/common/Modal";
import { courses } from "../data/courses";
import { instructors } from "../data/instructor";
import { lessons } from "../data/lessons";
import { reviews } from "../data/reviews";
import { useAuth } from "../context/AuthContext";
import {
  FiUsers, FiClock, FiBookOpen, FiCheck, FiPlay,
  FiFileText, FiLock, FiChevronDown, FiChevronUp
} from "react-icons/fi";
import { MdQuiz } from "react-icons/md";

function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ "React Fundamentals": true });
  const [enrolled, setEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const course = courses.find((c) => c.id === Number(id));
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40">
          <span className="text-6xl mb-4">😕</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h1>
          <button onClick={() => navigate("/courses")} className="mt-4 text-indigo-600 hover:underline font-semibold">
            Back to Courses
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const instructor = instructors.find((i) => i.id === course.instructorId);
  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const courseReviews = reviews.filter((r) => r.courseId === course.id);

  // Group lessons by section
  const sections = courseLessons.reduce<Record<string, typeof courseLessons>>((acc, lesson) => {
    if (!acc[lesson.section]) acc[lesson.section] = [];
    acc[lesson.section].push(lesson);
    return acc;
  }, {});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEnroll = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setEnrolled(true);
    setShowEnrollModal(true);
  };

  const isAlreadyEnrolled =
    enrolled ||
    (currentUser?.enrolledCourses?.includes(course.id) ?? false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text={course.level} size="md" />
              {course.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">{course.title}</h1>
            <p className="text-indigo-200 mb-5">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
              <span className="flex items-center gap-1.5">
                <span className="font-bold text-amber-400">{course.rating}</span>
                <StarRating rating={course.rating} size="sm" />
                <span className="text-indigo-300">({course.reviewsCount.toLocaleString()} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-indigo-200">
                <FiUsers size={14} /> {course.studentsCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-indigo-200">
                <FiClock size={14} /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-indigo-200">
                <FiBookOpen size={14} /> {course.lessonsCount} lessons
              </span>
            </div>
            {instructor && (
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`}
                  alt={instructor.name}
                  className="w-9 h-9 rounded-full border-2 border-indigo-400"
                />
                <span className="text-sm text-indigo-200">Created by <span className="text-white font-semibold">{instructor.name}</span></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-800 mb-5">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningObjectives.map((obj) => (
                  <div key={obj} className="flex items-start gap-3">
                    <FiCheck className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                    <span className="text-sm text-gray-600">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-800 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            {Object.keys(sections).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-black text-gray-800">Course Curriculum</h2>
                  <p className="text-sm text-gray-500 mt-1">{courseLessons.length} lessons</p>
                </div>
                {Object.entries(sections).map(([section, sectionLessons]) => (
                  <div key={section} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-bold text-gray-800 text-sm">{section}</span>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{sectionLessons.length} lessons</span>
                        {expandedSections[section] ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </button>
                    {expandedSections[section] && (
                      <ul className="pb-2">
                        {sectionLessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "quiz" ? (
                                <MdQuiz className="text-purple-500" size={16} />
                              ) : (
                                <FiPlay className="text-indigo-500" size={14} />
                              )}
                              <span className="text-sm text-gray-700">{lesson.title}</span>
                              {lesson.isFree && (
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Free</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">{lesson.duration}</span>
                              {!lesson.isFree && !isAlreadyEnrolled && (
                                <FiLock className="text-gray-300" size={12} />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Instructor */}
            {instructor && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-black text-gray-800 mb-5">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full border-3 border-indigo-100 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{instructor.name}</h3>
                    <p className="text-sm text-indigo-600 mb-2">{instructor.role}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>⭐ {instructor.rating} Rating</span>
                      <span>👥 {instructor.students.toLocaleString()} Students</span>
                      <span>🎓 {instructor.courses} Courses</span>
                    </div>
                    <p className="text-sm text-gray-600">{instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {courseReviews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-black text-gray-800 mb-5">Student Reviews</h2>
                <div className="space-y-5">
                  {courseReviews.map((review) => (
                    <div key={review.id} className="flex items-start gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full border-2 border-gray-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">{review.userName}</span>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              {/* Price */}
              <div className="text-center mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-black text-indigo-700">${course.price}</span>
                  <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* CTA */}
              {isAlreadyEnrolled ? (
                <button
                  onClick={() => navigate(`/student/learn/${course.id}`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors mb-3"
                >
                  Continue Learning →
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-indigo-200 mb-3"
                >
                  Enroll Now
                </button>
              )}
              <p className="text-xs text-center text-gray-400">30-Day Money-Back Guarantee</p>

              {/* Course Includes */}
              <div className="mt-6 space-y-3">
                <p className="font-bold text-gray-700 text-sm">This course includes:</p>
                {[
                  { icon: <FiClock size={14} />, text: `${course.duration} of video content` },
                  { icon: <FiBookOpen size={14} />, text: `${course.lessonsCount} lessons` },
                  { icon: <FiFileText size={14} />, text: "Downloadable resources" },
                  { icon: "🏆", text: "Certificate of completion" },
                  { icon: "♾️", text: "Lifetime access" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-indigo-500">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Success Modal */}
      <Modal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)} title="🎉 Enrolled Successfully!">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            You're now enrolled in <span className="font-bold text-indigo-700">{course.title}</span>. Ready to start learning?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setShowEnrollModal(false); navigate(`/student/learn/${course.id}`); }}
              className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Start Learning
            </button>
            <button
              onClick={() => setShowEnrollModal(false)}
              className="bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

export default CourseDetails;