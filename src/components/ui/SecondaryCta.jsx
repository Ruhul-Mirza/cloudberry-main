"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SecondaryCta() {
  return (
    <section className="relative bg-gray-100 border-t  py-28 px-6">
      {/* === Inner Gradient Box === */}
      <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden border border-gray-800 shadow-3xl">
        {/* Gradient Background Inside the Box */}
        <div className="absolute inset-0 bg-black"></div>

        {/* === CTA Content === */}
        <div className="relative text-center text-white px-8 py-20">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Ready to <span className="text-gray-300">Level Up</span> Your IT Skills?
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg"
          >
            Join thousands of learners who’ve upgraded their careers with our 
            hands-on IT programs. Learn. Build. Grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
              Enroll Today <ArrowRight className="w-4 h-4" />
            </button>

            <button className="border border-gray-500 text-gray-200 px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-all duration-300">
              Talk to an Advisor
            </button>
          </motion.div>

          {/* Subtle Glow Accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-700/20 to-transparent blur-3xl opacity-60 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
