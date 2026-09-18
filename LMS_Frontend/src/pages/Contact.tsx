import { useState } from "react";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import Input from "../componets/common/Input";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FiMapPin, FiClock, FiSend, FiCheck } from "react-icons/fi";

const FAQ = [
  { q: "What is the duration of the courses?", a: "Course durations vary from 8 hours to 15 hours depending on the topic. Each course details shows the exact duration." },
  { q: "Do I get a certificate after completion?", a: "Yes! All our courses come with a verifiable certificate of completion that you can share on LinkedIn and your CV." },
  { q: "Can I access courses on mobile?", a: "Absolutely! Our platform is fully responsive and works on all devices including smartphones and tablets." },
  { q: "What is your refund policy?", a: "We offer a 7-day money-back guarantee. If you're not satisfied, contact us within 7 days for a full refund." },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const err: Partial<typeof form> = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.subject.trim()) err.subject = "Subject is required";
    if (!form.message.trim()) err.message = "Message is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-black mb-3">Get In Touch</h1>
          <p className="text-indigo-200 max-w-xl mx-auto">
            Have a question or want to book a demo? Our team is here to help you 24/7.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Cards */}
          <div className="space-y-5">
            {[
              {
                icon: <CiMail className="text-indigo-600" size={24} />,
                title: "Email Us",
                lines: ["webcloudsnepal@gmail.com"],
              },
              {
                icon: <IoCallOutline className="text-indigo-600" size={24} />,
                title: "Call Us",
                lines: ["9762634769", "01-4534181", "Hotline: 9766896866"],
              },
              {
                icon: <FiMapPin className="text-indigo-600" size={22} />,
                title: "Visit Us",
                lines: ["Kathmandu, Nepal", "New Baneshwor, Ward No. 32"],
              },
              {
                icon: <FiClock className="text-indigo-600" size={22} />,
                title: "Office Hours",
                lines: ["Sun – Fri: 8:00 AM – 6:00 PM", "Sat: 10:00 AM – 3:00 PM"],
              },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">{card.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{card.title}</h3>
                  {card.lines.map((l) => <p key={l} className="text-sm text-gray-500">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-800 mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <FiCheck className="text-emerald-600" size={30} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent Successfully! </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-indigo-600 hover:underline text-sm font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="contact-name"
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your name"
                      error={errors.name}
                      required
                    />
                    <Input
                      id="contact-email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@gmail.com"
                      error={errors.email}
                      required
                    />
                  </div>
                  <Input
                    id="contact-subject"
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    placeholder="How can we help you?"
                    error={errors.subject}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-sm font-semibold text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 text-sm outline-none transition-all resize-none ${
                        errors.message
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 focus:border-indigo-500 hover:border-indigo-300"
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md shadow-indigo-200"
                  >
                    <FiSend /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-sm">{faq.q}</span>
                  <span className="text-indigo-600 text-lg font-bold ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
