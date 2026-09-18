import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Input from "../../componets/common/Input";
import { categories } from "../../data/categories";
import { FiCheck, FiArrowRight, FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Curriculum" },
  { id: 3, label: "Pricing" },
  { id: 4, label: "Publish" },
];

interface CourseForm {
  title: string;
  description: string;
  categoryId: string;
  level: string;
  language: string;
  price: string;
  originalPrice: string;
  curriculum: { section: string; lessons: { title: string; duration: string; type: string }[] }[];
}

function CreateCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [published, setPublished] = useState(false);

  const [form, setForm] = useState<CourseForm>({
    title: "",
    description: "",
    categoryId: "",
    level: "Beginner",
    language: "English",
    price: "",
    originalPrice: "",
    curriculum: [
      {
        section: "Introduction",
        lessons: [{ title: "", duration: "", type: "video" }],
      },
    ],
  });

  const updateField = (key: keyof CourseForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Curriculum helpers
  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        { section: `Section ${prev.curriculum.length + 1}`, lessons: [{ title: "", duration: "", type: "video" }] },
      ],
    }));
  };

  const updateSection = (sectionIdx: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev.curriculum];
      updated[sectionIdx] = { ...updated[sectionIdx], section: value };
      return { ...prev, curriculum: updated };
    });
  };

  const addLesson = (sectionIdx: number) => {
    setForm((prev) => {
      const updated = [...prev.curriculum];
      updated[sectionIdx] = {
        ...updated[sectionIdx],
        lessons: [...updated[sectionIdx].lessons, { title: "", duration: "", type: "video" }],
      };
      return { ...prev, curriculum: updated };
    });
  };

  const updateLesson = (sectionIdx: number, lessonIdx: number, field: string, value: string) => {
    setForm((prev) => {
      const updated = [...prev.curriculum];
      const updatedLessons = [...updated[sectionIdx].lessons];
      updatedLessons[lessonIdx] = { ...updatedLessons[lessonIdx], [field]: value };
      updated[sectionIdx] = { ...updated[sectionIdx], lessons: updatedLessons };
      return { ...prev, curriculum: updated };
    });
  };

  const removeLesson = (sectionIdx: number, lessonIdx: number) => {
    setForm((prev) => {
      const updated = [...prev.curriculum];
      const updatedLessons = updated[sectionIdx].lessons.filter((_, i) => i !== lessonIdx);
      updated[sectionIdx] = { ...updated[sectionIdx], lessons: updatedLessons };
      return { ...prev, curriculum: updated };
    });
  };

  const handlePublish = () => {
    setPublished(true);
  };

  if (published) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-16 sm:py-32">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheck className="text-emerald-600" size={36} />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Course Published!</h2>
            <p className="text-gray-500 mb-6">Your course is ready to appear in your catalog.</p>
            <button
              onClick={() => navigate("/instructor/courses")}
              className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700"
            >
              Go to My Courses
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
        <div className="max-w-3xl">
          <h1 className="text-2xl font-black text-gray-800 mb-6">Create New Course</h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 z-0" />
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > s.id
                      ? "bg-emerald-500 text-white"
                      : step === s.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white border-2 border-gray-200 text-gray-400"
                  }`}
                >
                  {step > s.id ? <FiCheck size={16} /> : s.id}
                </div>
                <span className={`text-xs font-medium mt-1.5 hidden sm:block ${step === s.id ? "text-indigo-600" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-black text-gray-800">Basic Information</h2>
                <Input
                  id="course-title"
                  label="Course Title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Complete React.js Masterclass"
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Describe what students will learn..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm text-gray-800 resize-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Category</label>
                    <select
                      value={form.categoryId}
                      onChange={(e) => updateField("categoryId", e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm bg-white text-gray-700"
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Level</label>
                    <select
                      value={form.level}
                      onChange={(e) => updateField("level", e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm bg-white text-gray-700"
                    >
                      {["Beginner", "Intermediate", "Advanced"].map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Language</label>
                    <select
                      value={form.language}
                      onChange={(e) => updateField("language", e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm bg-white text-gray-700"
                    >
                      {["English", "Nepali", "Hindi"].map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Curriculum */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-black text-gray-800">Curriculum</h2>
                  <button
                    onClick={addSection}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FiPlus size={13} /> Add Section
                  </button>
                </div>
                <div className="space-y-5">
                  {form.curriculum.map((section, sIdx) => (
                    <div key={sIdx} className="border border-gray-200 rounded-xl p-4">
                      <input
                        value={section.section}
                        onChange={(e) => updateSection(sIdx, e.target.value)}
                        placeholder="Section Name"
                        className="w-full font-bold text-sm text-gray-800 border-0 border-b-2 border-gray-200 focus:border-indigo-500 outline-none pb-2 mb-4 bg-transparent"
                      />
                      <div className="space-y-2">
                        {section.lessons.map((lesson, lIdx) => (
                          <div key={lIdx} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <input
                              value={lesson.title}
                              onChange={(e) => updateLesson(sIdx, lIdx, "title", e.target.value)}
                              placeholder="Lesson title"
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 outline-none text-xs"
                            />
                            <input
                              value={lesson.duration}
                              onChange={(e) => updateLesson(sIdx, lIdx, "duration", e.target.value)}
                              placeholder="Duration"
                              className="w-full sm:w-24 px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 outline-none text-xs"
                            />
                            <select
                              value={lesson.type}
                              onChange={(e) => updateLesson(sIdx, lIdx, "type", e.target.value)}
                              className="px-2 py-2 rounded-lg border border-gray-200 outline-none text-xs bg-white"
                            >
                              <option value="video">Video</option>
                              <option value="quiz">Quiz</option>
                              <option value="reading">Reading</option>
                            </select>
                            <button
                              onClick={() => removeLesson(sIdx, lIdx)}
                              className="text-red-400 hover:text-red-600 p-1"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addLesson(sIdx)}
                        className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 mt-3 font-medium"
                      >
                        <FiPlus size={12} /> Add Lesson
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-black text-gray-800">Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="course-price"
                    label="Sale Price ($)"
                    type="number"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="49"
                  />
                  <Input
                    id="course-original-price"
                    label="Original Price ($)"
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => updateField("originalPrice", e.target.value)}
                    placeholder="79"
                  />
                </div>
                {form.price && form.originalPrice && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700">
                    <p className="font-semibold">
                      Discount: {Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)}% OFF
                    </p>
                    <p className="text-xs mt-1 text-emerald-600">Students save ${Number(form.originalPrice) - Number(form.price)}</p>
                  </div>
                )}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <p className="font-bold text-indigo-700 text-sm mb-1">Pricing Tips</p>
                  <ul className="text-xs text-indigo-600 space-y-1">
                    <li>• Beginner courses: $19–$49</li>
                    <li>• Intermediate courses: $39–$69</li>
                    <li>• Advanced courses: $59–$99</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Publish */}
            {step === 4 && (
              <div className="text-center py-6">
                <div className="text-5xl mb-5">🚀</div>
                <h2 className="text-xl font-black text-gray-800 mb-3">Ready to Publish?</h2>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Review your course details one last time before publishing to the platform.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 mb-6 max-w-xs mx-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Title</span>
                    <span className="font-semibold text-gray-800 text-right max-w-40 truncate">{form.title || "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level</span>
                    <span className="font-semibold text-gray-800">{form.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sections</span>
                    <span className="font-semibold text-gray-800">{form.curriculum.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-semibold text-gray-800">{form.price ? `$${form.price}` : "—"}</span>
                  </div>
                </div>
                <button
                  onClick={handlePublish}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-md shadow-emerald-200"
                >
                  🎉 Publish Course
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-5">
            <button
              onClick={() => setStep((prev) => (Math.max(1, prev - 1)) as Step)}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiArrowLeft /> Previous
            </button>
            {step < 4 && (
              <button
                onClick={() => setStep((prev) => (Math.min(4, prev + 1)) as Step)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
              >
                Next <FiArrowRight />
              </button>
            )}
          </div>
        </div>
    </DashboardLayout>
  );
}

export default CreateCourse;
