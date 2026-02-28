"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Contact() {
  return (
    <>
      <ContactHero
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="We'd love to hear from you!"
      />
    </>
  );
}

function ContactHero({ eyebrow, title, subtitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 120000); // 2 minutes

      return () => clearTimeout(timer);
    }
  }, [showThankYou]);
  // Fetch courses
  useEffect(() => {
    if (!API_URL) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        // API structure => { success, count, data: [] }
        setCourses(data?.data || []);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    fetchCourses();
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();
      setShowThankYou(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden -mt-10 bg-[#faf9f7]">
      {/* concentric background */}
      <div className="pointer-events-none absolute inset-0 flex md:-top-30 justify-center">
        <div className="relative w-[1200px] -top-52 h-[1000px] rounded-full hidden xl:block border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]" />
        <div className="absolute -top-24 w-[900px] h-[900px] hidden lg:block xl:hidden rounded-full border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]" />
        <div className="absolute -top-10 w-[750px] h-[750px] rounded-full hidden md:block lg:hidden border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-40">
        {/* Heading */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground">
            <span className="h-px w-6 bg-muted-foreground/40" />
            {eyebrow}
            <span className="h-px w-6 bg-muted-foreground/40" />
          </span>

          <h1 className="mt-6 font-geist text-4xl sm:text-5xl font-medium text-foreground">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-20 max-w-5xl rounded-sm  bg-gray-200 p-3 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_10px_rgba(0,0,0,0.1)]"
        >
          <div className="grid bg-white grid-cols-1 md:grid-cols-2">
            {/* Left - Contact Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-6">
                  Start a Conversation
                </h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      Call on:
                    </span>
                    <p className="text-foreground font-medium mt-0.5">
                      +1 (234) 567-89-01
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      Email on:
                    </span>
                    <p className="text-foreground font-medium mt-0.5">
                      support@example.com
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      Address:
                    </span>
                    <p className="text-foreground font-medium mt-0.5">
                      123 USA bridge blng, Sector 400, San Francisco, CA 94103,
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                </p>
                <p className="mt-3 text-xs font-semibold text-foreground uppercase tracking-wide">
                  Shadab Siddiqui —{" "}
                  <span className="text-muted-foreground font-normal">
                    Founder, CloudBerry
                  </span>
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div className="border-t md:border-t-0 md:border-l border-border p-6 sm:p-8">
              {showThankYou ? (
                <div className="flex flex-col justify-center items-center bg-gray-100 border h-[100%] border-zinc-200 shadow-sm rounded-xl md:py-20 px-8 py-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Thank you!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Your message has been sent successfully. We'll get back to
                    you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[11px] font-bold tracking-wider text-foreground uppercase mb-1.5"
                    >
                      Name<span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      placeholder="Dennis Barrett"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-bold tracking-wider text-foreground uppercase mb-1.5"
                    >
                      Email<span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      placeholder="dannis@barrett.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-bold tracking-wider text-foreground uppercase mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                      placeholder="Enter a message..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center justify-center gap-2 rounded text-white bg-black px-6 py-3 text-sm font-semibold text-accent-cta-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-cta-foreground border-t-transparent" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send a message</span>
                          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <FaqSection />
    </section>
  );
}
