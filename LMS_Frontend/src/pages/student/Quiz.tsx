import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../componets/layout/Navbar";
import Footer from "../../componets/layout/Footer";
import { quizzes } from "../../data/quizzes";
import { FiArrowRight, FiCheck, FiX, FiArrowLeft } from "react-icons/fi";

type QuizState = "intro" | "in-progress" | "finished";

function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === Number(id));

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Quiz not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 hover:underline">Go Back</button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const score = quiz.questions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScore;

  const handleSelectOption = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (isLastQuestion) {
        setQuizState("finished");
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 800);
  };

  const handleRestart = () => {
    setQuizState("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Intro */}
        {quizState === "intro" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 text-center">
            <div className="text-6xl mb-5">📝</div>
            <h1 className="text-2xl font-black text-gray-800 mb-2">{quiz.title}</h1>
            <p className="text-gray-500 mb-6">{quiz.description}</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              {[
                { label: "Questions", value: totalQuestions },
                { label: "Pass Score", value: `${quiz.passingScore}%` },
                { label: "Time Limit", value: "No limit" },
              ].map((s) => (
                <div key={s.label} className="bg-indigo-50 rounded-xl p-2 sm:p-3 text-center">
                  <p className="text-base sm:text-xl font-black text-indigo-700">{s.value}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setQuizState("in-progress")}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Start Quiz <FiArrowRight />
            </button>
          </div>
        )}

        {/* In Progress */}
        {quizState === "in-progress" && question && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-bold text-indigo-600">{Math.round(((currentQuestion) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h2 className="text-xl font-black text-gray-800 mb-6">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-7">
              {question.options.map((option) => {
                let optionClass = "border-2 border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50";

                if (selectedOption === option && !showFeedback) {
                  optionClass = "border-2 border-indigo-500 bg-indigo-50 text-indigo-700";
                }
                if (showFeedback) {
                  if (option === question.correctAnswer) {
                    optionClass = "border-2 border-emerald-500 bg-emerald-50 text-emerald-700";
                  } else if (selectedOption === option && option !== question.correctAnswer) {
                    optionClass = "border-2 border-red-400 bg-red-50 text-red-700";
                  } else {
                    optionClass = "border-2 border-gray-100 bg-gray-50 text-gray-400";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-sm font-semibold transition-all text-left ${optionClass}`}
                  >
                    <span>{option}</span>
                    {showFeedback && option === question.correctAnswer && (
                      <FiCheck className="text-emerald-600 shrink-0" size={18} />
                    )}
                    {showFeedback && selectedOption === option && option !== question.correctAnswer && (
                      <FiX className="text-red-500 shrink-0" size={18} />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedOption || showFeedback}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLastQuestion ? "Submit Quiz" : "Next Question"} <FiArrowRight />
            </button>
          </div>
        )}

        {/* Results */}
        {quizState === "finished" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 text-center">
            <div className="text-6xl mb-5">{passed ? "🏆" : "😔"}</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              {passed ? "Congratulations!" : "Keep Practicing!"}
            </h2>
            <p className="text-gray-500 mb-6">
              {passed
                ? "You passed the quiz! Great job."
                : `You need ${quiz.passingScore}% to pass. You got ${scorePercent}%.`}
            </p>

            {/* Score Circle */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#e5e7eb" strokeWidth="2.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={passed ? "#10b981" : "#f59e0b"}
                  strokeWidth="2.5"
                  strokeDasharray={`${scorePercent}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black ${passed ? "text-emerald-600" : "text-amber-500"}`}>
                  {scorePercent}%
                </span>
                <span className="text-xs text-gray-400">{score}/{totalQuestions} correct</span>
              </div>
            </div>

            {/* Answer Review */}
            <div className="text-left space-y-2 mb-7">
              {quiz.questions.map((q) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={q.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                    isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}>
                    {isCorrect ? <FiCheck size={14} /> : <FiX size={14} />}
                    <span className="font-medium flex-1 line-clamp-1">{q.question}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <FiArrowLeft size={14} /> Try Again
              </button>
              <button
                onClick={() => navigate("/student/dashboard")}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Quiz;
