"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock3,
  Calendar,
} from "lucide-react";

export default function SingleCoursePage() {
  const { slug } = useParams();
  const [activeFeature, setActiveFeature] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses/${slug}`);
        const json = await res.json();

        // API returns array or object — normalize to single object
        const data = Array.isArray(json?.data) ? json.data[0] : json?.data;
        setCourse(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) return <div className="py-40 text-center">Loading…</div>;
  if (!course) return <div className="py-40 text-center">Course not found</div>;

  // ===== PRICE =====
  const oldPrice = parseFloat(course.old_price);
  const newPrice = parseFloat(course.new_price);
  const currentPrice = parseFloat(course.price);

  const hasDiscount = oldPrice > 0 && newPrice > 0 && oldPrice > newPrice;
  const discount = hasDiscount
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : 0;

  const displayPrice = hasDiscount ? newPrice : currentPrice;
  const isActive = course.status === "active";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf9f7]">
      {/* ================= HERO ================= */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <span className="flex items-center mb-4 text-sm uppercase tracking-widest gap-2 p-1.5 bg-secondary max-w-max border border-default-medium text-heading text-xs font-semibold rounded">
              <span className="h-1.5 w-1.5 bg-black rounded-full me-0.5"></span>
              {course.category_name || "General"}
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              {course.title}
            </h1>

            <p className="mt-6 text-md text-muted-foreground leading-relaxed max-w-xl">
              {course.description || "No description available."}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-md">
              {[
                { icon: Sparkles, text: "Premium Curriculum" },
                { icon: ShieldCheck, text: "Lifetime Access" },
                { icon: Clock3, text: course.duration || "Flexible" },
                { icon: CheckCircle2, text: "Practical Learning" },
              ].map((item, i) => (
                <Feature
                  key={i}
                  icon={item.icon}
                  text={item.text}
                  active={activeFeature === i}
                />
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="lg:justify-self-end w-full max-w-md">
            <div className="bg-white rounded border shadow-md p-8 relative">
              {hasDiscount && (
                <span className="absolute -top-3 right-6 bg-black text-white text-xs px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>
              )}

              <h3 className="text-xl pb-3 font-semibold mb-4 border-b">
                {course.title}
              </h3>

              <div className="flex items-end gap-3 mb-6">
                <div className="text-4xl font-bold flex items-center gap-1">
                  <span className="text-3xl font-medium">$ </span>
                  {displayPrice || "N/A"}
                </div>

                {hasDiscount && (
                  <span className="line-through text-muted-foreground mb-1">
                    <span className="text-lg font-medium">$ {oldPrice}</span>
                  </span>
                )}
              </div>

              <Link href="/contact">
                <button className="w-full bg-black text-white py-2 rounded font-semibold hover:opacity-90 transition">
                  Enroll Now
                </button>
              </Link>

              <div className="mt-6 text-sm text-muted-foreground border-t pt-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-md font-semibold text-muted-foreground">
                    Status
                  </span>
                  <span
                    className={`inline-flex px-1.5 py-1 rounded-sm items-center gap-1.5 text-xs font-medium ${
                      isActive
                        ? "text-green-700 bg-green-200"
                        : "text-red-700 bg-red-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-green-700" : "bg-red-700"
                      }`}
                    />
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-md font-semibold text-muted-foreground">
                    Duration
                  </span>
                  <span className="inline-flex gap-1.5 text-xs items-center text-muted-foreground bg-secondary p-2 rounded-sm">
                    <Calendar className="w-4 h-4 text-black" />
                    {course.duration || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* WHAT YOU LEARN */}
          <div className="bg-white rounded border p-8 shadow-sm">
            <h2 className="text-2xl font-semibold border-b pb-5 mb-6">
              What you'll learn
            </h2>
            <div className="space-y-3">
              {(course.feature_bullet_points || []).map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center border p-3 rounded hover:bg-slate-100 transition"
                >
                  <CheckCircle2 className="w-5 h-5 mt-1 text-black shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white rounded border p-8 shadow-sm">
            <h2 className="text-2xl font-semibold border-b pb-5 mb-6">
              About {course.title}
            </h2>
            <p className="text-muted-foreground leading-loose">
              {course.description || "No description available."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, text, active }) {
  return (
    <div
      className={`cursor-pointer rounded border px-4 py-3 flex items-center gap-2 transition-all duration-500 ${
        active ? "bg-black text-white shadow scale-[1.03]" : "bg-white text-black"
      }`}
    >
      <Icon className="w-4 h-4 transition-transform duration-300" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}