import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import CourseGrid from "../componets/course/CourseGrid";
import { courses } from "../data/courses";
import { categories } from "../data/categories";
import { instructors } from "../data/instructor";
import { clientLogo } from "../data/client";
import { IoIosPeople } from "react-icons/io";
import { PiGraduationCapFill } from "react-icons/pi";
import { GiMountainClimbing } from "react-icons/gi";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import StarRating from "../componets/common/StarRating";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Frontend Developer",
    avatar: "/images/testimonials/priyasharma.jpg",
    comment:
      "Cloud Code transformed my career. The curriculum is world-class and the mentors are incredibly supportive.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohan Thapa",
    role: "Full Stack Engineer",
    avatar: "/images/testimonials/rohan.jpeg",
    comment:
      "I went from zero coding knowledge to landing my dream job in 6 months. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali Rai",
    role: "Data Analyst",
    avatar: "/images/testimonials/anjali.jpeg",
    comment:
      "The Python for Data Science course was incredibly well-structured. I got a promotion after completing it.",
    rating: 5,
  },
];

const STATS = [
  { label: "Students Enrolled", value: 10000, suffix: "+" },
  { label: "Expert Instructors", value: 120, suffix: "+" },
  { label: "Courses Available", value: 300, suffix: "+" },
  { label: "Countries Reached", value: 5, suffix: "" },
];

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [visibleStats, setVisibleStats] = useState([0, 0, 0, 0]);
  const featuredCourses = courses.slice(0, 8);

  // Animate counters
  useEffect(() => {
    const targets = STATS.map((s) => s.value);
    const duration = 1800;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setVisibleStats(targets.map((t) => Math.round((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6 border border-white/20">
              <FaStar className="text-amber-400" />
              Rated #1 Learning Platform in Nepal
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Build Your Skills,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                {" "}
                Shape Your Future
              </span>
            </h1>
            <p className="text-lg text-indigo-200 mb-8 max-w-2xl leading-relaxed">
              Advance your career by learning in-demand skills in Programming,
              DevOps, Web Development, AI Engineering, and Machine Learning —
              all taught by industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-900/30"
              >
                Explore Courses <FiArrowRight />
              </button>
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-indigo-700">
                  {visibleStats[i].toLocaleString()}
                  {stat.suffix}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENTS ===== */}
      <section className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 font-medium mb-6">
            Our graduates work at leading companies
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {clientLogo.map((client) => (
              <div
                key={client.Name}
                className="lg:grayscale lg:opacity-60 lg:hover:grayscale-0 lg:hover:opacity-100 transition-all"
              >
                <img
                  src={client.logo}
                  alt={client.Name}
                  className="h-40 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Explore Categories
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Find the perfect course in your area of interest
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate("/courses")}
                className="group bg-gray-50 hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-200"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-800 group-hover:text-white text-sm transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 group-hover:text-indigo-200 mt-1 transition-colors">
                  {cat.courseCount} courses
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR COURSES ===== */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Catalog
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                Our Courses
              </h2>
              <p className="text-gray-500">
                Browse popular tracks or jump into a category that matches your
                goals.
              </p>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors"
            >
              View All Courses <FiArrowRight />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[{ id: 0, name: "All" }, ...categories].map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  navigate(
                    cat.id === 0
                      ? "/courses"
                      : `/courses?q=${encodeURIComponent(cat.name)}`,
                  )
                }
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  cat.id === 0
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
                }`}
              >
                {cat.id === 0 ? "All courses" : cat.name}
              </button>
            ))}
          </div>
          <CourseGrid courses={featuredCourses} />
          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              View All Courses <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Why Learn with Cloud Code?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We combine the best pedagogy with real-world projects to
              fast-track your career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoIosPeople className="text-5xl text-indigo-500" />,
                title: "Vibrant Community",
                desc: "Join 50,000+ students, alumni, and educators. Ask questions, share projects, and grow together.",
              },
              {
                icon: (
                  <PiGraduationCapFill className="text-5xl text-emerald-500" />
                ),
                title: "Industry Certifications",
                desc: "Earn verifiable, industry-recognized certifications in high-demand technologies that employers trust.",
              },
              {
                icon: (
                  <GiMountainClimbing className="text-5xl text-purple-500" />
                ),
                title: "Project-Based Learning",
                desc: "Build real projects with our linear, world-class curriculum — not just theory. Your portfolio matters.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 transition-all group"
              >
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTORS ===== */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Meet Our Expert Instructors
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Learn from industry practitioners with years of real-world
              experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.slice(0, 3).map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all group text-center"
              >
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-indigo-100 group-hover:border-indigo-300 transition-colors"
                />
                <h3 className="font-bold text-gray-800 mb-1">{inst.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                  {inst.role}
                </p>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {inst.bio}
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <StarRating rating={inst.rating} showValue size="sm" />
                </div>
                <div className="flex justify-center gap-6 text-xs text-gray-400">
                  <span>
                    <span className="font-bold text-gray-700">
                      {inst.students.toLocaleString()}
                    </span>{" "}
                    students
                  </span>
                  <span>
                    <span className="font-bold text-gray-700">
                      {inst.courses}
                    </span>{" "}
                    courses
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {inst.expertise.map((e) => (
                    <span
                      key={e}
                      className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Student Success Stories
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real results from real students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-indigo-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-indigo-600">{t.role}</p>
                  </div>
                </div>
                <StarRating rating={t.rating} size="sm" />
                <p className="text-gray-600 text-sm mt-3 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FiMail className="text-4xl mx-auto mb-4 text-indigo-200" />
          <h2 className="text-3xl font-black mb-3">Stay in the Loop</h2>
          <p className="text-indigo-200 mb-8">
            Get updates on new courses, special offers, and industry insights —
            straight to your inbox.
          </p>
          {subscribed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-bold text-lg">You're subscribed!</p>
              <p className="text-indigo-200 text-sm mt-1">
                Thanks for joining. Watch your inbox for awesome updates.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-indigo-300 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of students already transforming their careers with
            Cloud Code.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-10 py-4 rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Start Learning Now <FiArrowRight />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
