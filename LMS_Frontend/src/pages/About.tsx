import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import { instructors } from "../data/instructor";
import StarRating from "../componets/common/StarRating";
import { useNavigate } from "react-router-dom";

const TEAM = [
  {
    name: "Anuj Karn",
    role: "Founder & CEO",
    emoji: "/images/admin/admin.jpg",
    desc: "10+ years in software education. Passionate about making tech accessible to everyone in Nepal.",
  },
  {
    name: "Ajay Shrestha",
    role: "Head of Curriculum",
    emoji: "/images/instructors/ajay.jpeg",
    desc: "Former software engineer who transitioned to education. Designs project-based curriculum.",
  },
  {
    name: "Nirajan Chaudhary",
    role: "Lead Instructor",
    emoji: "/images/instructors/nirajan.jpeg",
    desc: "Full-stack developer with expertise in MERN stack, Docker, and cloud technologies.",
  },
];

const MILESTONES = [
  { year: "2018", event: "Cloud Code founded in Kathmandu with 20 students" },
  {
    year: "2020",
    event: "Launched online platform, reaching students across Nepal",
  },
  { year: "2022", event: "Crossed 10,000 enrolled students milestone" },
  { year: "2024", event: "Expanded to 45 countries, 300+ courses launched" },
  { year: "2026", event: "50,000+ graduates placed in top tech companies" },
];

function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5">
            About Cloud Code
          </h1>
          <p className="text-xl text-indigo-200 leading-relaxed max-w-2xl mx-auto">
            We're on a mission to democratize tech education across Nepal and
            beyond — making world-class learning accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-5">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cloud Code was founded with a simple belief:{" "}
                <strong>great tech education shouldn't be a privilege.</strong>{" "}
                We combine industry-expert instruction with hands-on projects to
                prepare students for real careers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform serves learners from all walks of life — recent
                graduates, career-switchers, and working professionals looking
                to upskill.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Explore Our Courses →
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "🎓", label: "50,000+", desc: "Students Graduated" },
                { icon: "📚", label: "300+", desc: "Courses Available" },
                { icon: "👨‍🏫", label: "120+", desc: "Expert Instructors" },
                { icon: "🌍", label: "45+", desc: "Countries Reached" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-indigo-50 rounded-2xl p-5 text-center border border-indigo-100"
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-black text-indigo-700">
                    {s.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-200" />
            <div className="space-y-8">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex gap-6 items-start pl-2">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-md relative z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm flex-1">
                    <p className="text-xs font-bold text-indigo-500 mb-1">
                      {m.year}
                    </p>
                    <p className="text-gray-700 text-sm font-medium">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center border border-indigo-100"
              >
                <div className="mb-4 flex justify-center">
                  <img
                    src={m.emoji}
                    alt={m.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h3 className="font-black text-gray-800 mb-1">{m.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                  {m.role}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-12">
            Our Instructors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
              >
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-100"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-indigo-600 mb-1">{inst.role}</p>
                  <StarRating rating={inst.rating} size="sm" showValue />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
