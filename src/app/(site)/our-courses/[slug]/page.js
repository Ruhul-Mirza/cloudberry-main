"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import {
  IndianRupee,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function SingleCoursePage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses/${slug}`);
        const json = await res.json();
        setCourse(json?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return <div className="py-40 text-center">Loading…</div>;
  }

  if (!course) {
    return <div className="py-40 text-center">Course not found</div>;
  }

  return (
    <div className="bg-[#f6f6f4]">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <span className="inline-flex mb-6 rounded-full border px-4 py-1 text-xs uppercase tracking-wide text-muted-foreground">
            {course.category_name}
          </span>

          <h1 className="font-geist text-5xl sm:text-6xl font-medium text-foreground max-w-4xl">
            {course.title}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {course.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <IndianRupee className="w-6 h-6" />
              {course.price}
            </div>

            <button className="rounded-md bg-foreground px-8 py-4 text-sm text-background hover:opacity-90 transition">
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* ===== LEFT CONTENT ===== */}
          <div className="lg:col-span-2 space-y-20">
            {/* About */}
            <section>
              <h2 className="font-geist text-3xl font-medium mb-6">
                About this course
              </h2>
              <p className="text-muted-foreground leading-loose text-base">
                {course.description}
              </p>
            </section>

            {/* What you get */}
            <section>
              <h2 className="font-geist text-3xl font-medium mb-8">
                What you’ll get
              </h2>

              <ul className="grid sm:grid-cols-2 gap-6">
                {[
                  "Clear structured content",
                  "Industry-relevant skills",
                  "Lifetime access",
                  "Practical understanding",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 mt-1 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ===== STICKY SIDEBAR ===== */}
          <aside className="sticky top-24 h-fit">
            <div className="rounded-2xl bg-white border border-border p-8 shadow-sm">
              <h3 className="font-medium text-lg mb-8">
                Course summary
              </h3>

              <ul className="space-y-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  Status:
                  <span className="text-foreground capitalize ml-auto">
                    {course.status}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  Created:
                  <span className="text-foreground ml-auto">
                    {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </li>
              </ul>

              <div className="mt-10 border-t pt-8">
                <div className="flex items-center gap-2 text-xl font-semibold mb-6">
                  <IndianRupee className="w-5 h-5" />
                  {course.price}
                </div>

                <button className="w-full rounded-md bg-foreground py-4 text-sm text-background hover:opacity-90 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
