import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../../componets/common/ProgressBar";
import { courses } from "../../data/courses";
import { lessons } from "../../data/lessons";
import { FiPlay, FiCheck, FiChevronDown, FiChevronUp, FiArrowLeft, FiList, FiX } from "react-icons/fi";
import { MdQuiz } from "react-icons/md";

function CourseLearn() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === Number(id));
  const courseLessons = lessons.filter((l) => l.courseId === Number(id));

  const [currentLessonId, setCurrentLessonId] = useState(
    courseLessons[0]?.id ?? null
  );
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([1, 2]));
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentLesson = courseLessons.find((l) => l.id === currentLessonId);

  // Group by section
  const sections = courseLessons.reduce<Record<string, typeof courseLessons>>(
    (acc, lesson) => {
      if (!acc[lesson.section]) acc[lesson.section] = [];
      acc[lesson.section].push(lesson);
      return acc;
    },
    {}
  );

  // Init all sections expanded
  if (Object.keys(expandedSections).length === 0 && Object.keys(sections).length > 0) {
    const initExpanded = Object.keys(sections).reduce((acc, s) => ({ ...acc, [s]: true }), {});
    setExpandedSections(initExpanded);
  }

  const toggleComplete = (lessonId: number) => {
    setCompletedLessons((prev) => {
      const copy = new Set(prev);
      copy.has(lessonId) ? copy.delete(lessonId) : copy.add(lessonId);
      return copy;
    });
  };

  const progressPercent = courseLessons.length
    ? Math.round((completedLessons.size / courseLessons.length) * 100)
    : 0;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Course not found.</p>
        <button onClick={() => navigate("/courses")} className="mt-4 text-indigo-600 hover:underline">Back to Courses</button>
      </div>
    );
  }

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-700">
        <p className="text-xs text-gray-400 font-medium">COURSE CONTENT</p>
        <p className="text-sm text-gray-300 mt-1">
          {completedLessons.size}/{courseLessons.length} lessons completed
        </p>
      </div>
      {Object.entries(sections).map(([section, sectionLessons]) => (
        <div key={section} className="border-b border-gray-700">
          <button
            onClick={() => setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-750 transition-colors text-left"
          >
            <span className="text-sm font-bold text-gray-200">{section}</span>
            {expandedSections[section] ? (
              <FiChevronUp className="text-gray-400" size={14} />
            ) : (
              <FiChevronDown className="text-gray-400" size={14} />
            )}
          </button>
          {expandedSections[section] && (
            <ul>
              {sectionLessons.map((lesson) => (
                <li key={lesson.id}>
                  <button
                    onClick={() => {
                      setCurrentLessonId(lesson.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                      currentLessonId === lesson.id
                        ? "bg-indigo-700 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      completedLessons.has(lesson.id)
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-gray-500"
                    }`}>
                      {completedLessons.has(lesson.id) && <FiCheck size={10} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug">{lesson.title}</p>
                      <p className="text-xs opacity-60 mt-0.5">{lesson.duration}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
        <button
          onClick={() => navigate("/student/my-courses")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors shrink-0"
        >
          <FiArrowLeft />
          <span className="hidden sm:inline">Back to Courses</span>
        </button>
        <h1 className="text-sm font-bold text-white truncate max-w-[8rem] sm:max-w-sm hidden sm:block">{course.title}</h1>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:inline">{progressPercent}% complete</span>
          <div className="w-16 sm:w-32">
            <ProgressBar value={progressPercent} height="sm" color="emerald" showPercent={false} />
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors shrink-0"
            aria-label="Show course content"
          >
            <FiList size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Lesson Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close course content overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative h-full w-80 max-w-[85vw] bg-gray-800 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 sticky top-0 bg-gray-800">
              <span className="text-sm font-bold text-white">Course Content</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white"
                aria-label="Close menu"
              >
                <FiX size={18} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="flex h-[calc(100vh-57px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {currentLesson ? (
            <>
              {/* Video Player */}
              <div className="bg-black aspect-video w-full flex items-center justify-center relative">
                {currentLesson.type === "quiz" ? (
                  <div className="text-center">
                    <MdQuiz className="text-purple-400 mx-auto mb-3" size={60} />
                    <p className="text-white font-bold text-xl mb-4">Quiz Time!</p>
                    <button
                      onClick={() => navigate(`/student/quiz/1`)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      Take Quiz →
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiPlay className="text-white ml-1" size={32} />
                    </div>
                    <p className="text-gray-400 text-sm">{currentLesson.title}</p>
                    <p className="text-gray-500 text-xs mt-1">Duration: {currentLesson.duration}</p>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-4 sm:p-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-1 break-words">{currentLesson.title}</h2>
                    <p className="text-gray-400 text-sm">{currentLesson.section} • {currentLesson.duration}</p>
                  </div>
                  <button
                    onClick={() => toggleComplete(currentLesson.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 w-full sm:w-auto ${
                      completedLessons.has(currentLesson.id)
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <FiCheck size={14} />
                    {completedLessons.has(currentLesson.id) ? "Completed" : "Mark Complete"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a lesson to start
            </div>
          )}
        </div>

        {/* Lesson Sidebar (desktop) */}
        <div className="w-80 shrink-0 bg-gray-800 border-l border-gray-700 overflow-y-auto hidden md:block">
          {sidebarContent}
        </div>
      </div>
    </div>
  );
}

export default CourseLearn;
