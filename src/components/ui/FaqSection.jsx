"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What makes your program unique?",
    a: "Our programs combine mentorship, real-world projects, and measurable outcomes — not just theory. Learn from active professionals building real products.",
  },
  {
    q: "Do I need experience to get started?",
    a: "No prior experience is required. We start from the fundamentals and progressively move to advanced, job-ready concepts, guided by mentors.",
  },
  {
    q: "Can I access sessions after the course ends?",
    a: "Yes. All learners receive lifetime access to recorded sessions, materials, and updates — so you can keep learning at your pace.",
  },
  {
    q: "Do you provide certification?",
    a: "Yes. Upon completion, you’ll receive an industry-recognized certificate that strengthens your portfolio and job applications.",
  },
  {
    q: "What support will I get during the course?",
    a: "You’ll have dedicated mentor access, peer discussion spaces, and live Q&A support throughout the program.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="relative z-51 bg-zinc-950 text-white py-28 overflow-hidden">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-[17px]">
          Everything you need to know before you begin your journey with us.
        </p>
      </div>

      {/* FAQ Container */}
      <div className="max-w-4xl mx-auto border border-white/10 rounded-sm bg-white/[0.03] backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] divide-y divide-white/10 overflow-hidden">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            layout
            transition={{ layout: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
            className={`relative overflow-hidden transition-all duration-300 ${
              open === i ? "bg-white/[0.04]" : "bg-transparent"
            }`}
          >
            {/* Animated gradient line */}
            {open === i && (
              <motion.div
                layoutId="faq-accent"
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-50 via-gray-500 to-gray-900"
              />
            )}

            {/* Question */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center py-6 px-6 text-left group"
            >
              <span className="text-[17px] font-medium text-gray-100 group-hover:text-white transition-colors">
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    open === i ? "text-white" : ""
                  }`}
                />
              </motion.div>
            </button>

            {/* Smooth expanding answer */}
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.3, ease: "easeOut" },
                    height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  }}
                >
                  <motion.p
                    layout
                    className="px-6 pb-6 text-gray-400 leading-relaxed text-[15px]"
                  >
                    {faq.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center mt-14 text-gray-500 text-sm">
        Still have questions?{" "}
        <a
          href="#contact"
          className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline"
        >
          Contact our support
        </a>
        .
      </div>

      {/* Ambient Background Glow */}
      <div className="absolute top-10 left-[5%] w-64 h-64 bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-10 right-[10%] w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/3 right-[30%] w-96 h-96 bg-white/5 rounded-full blur-[160px] -z-10"></div>
    </section>
  );
}
