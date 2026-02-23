"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AllCoursesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  /* FETCH COURSES */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        const courseData =
          data?.data?.[0]?.filter((course) => course.status === "active") || [];

        setCourses(courseData);
      } catch (err) {
        console.error("Courses fetch error:", err);
      }
    };

    fetchCourses();
  }, []);

  /* FETCH CATEGORIES */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();

        const categoryNames =
          data?.data?.[0]
            ?.filter((item) => item.status === "active")
            ?.map((item) => item.name) || [];

        setCategories(categoryNames);

        if (categoryNames.length > 0) {
          setActiveCategory(categoryNames[0]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const activeCourses = courses.filter(
    (course) => course.category_name === activeCategory,
  );

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded bg-black/80 px-5 py-2 text-sm font-semibold text-white hover:bg-black transition-colors"
      >
        All Courses
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-full z-50 mt-2 flex w-[900px] rounded bg-white/90 backdrop-blur-md  border border-border shadow-sm">
            {/* LEFT */}
            <div className="w-[280px] border-r border-border py-4">
              <h3 className="px-5 pb-3 text-md font-semibold border-b">Categories</h3>

              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`flex cursor-pointer items-center justify-between px-5 py-2.5 text-sm ${
                      activeCategory === cat
                        ? "bg-black/10 text-black font-medium"
                        : "hover:bg-black/10"
                    }`}
                  >
                    {cat}
                    <ChevronRight className="h-4 w-4" />
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT */}
            <div className="flex-1 p-5">
              <h3 className="mb-4 text-base font-semibold border-b pb-2">{activeCategory}</h3>

              {activeCourses.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {activeCourses.map((course) => {
                    const slug = course.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]+/g, "");

                    return (
                      <div
                        key={course.id}
                        className="rounded border p-4 hover:shadow-sm"
                      >
                        <p className="mb-1 text-xs text-muted-foreground">
                          {course.institution}
                        </p>

                        <p className="mb-3 text-sm font-medium">
                          {course.title}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {course.duration}
                          </div>

                          <Link
                            href={`/our-courses/${slug}`}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90"
                          >
                            View Course
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        {/* MOVED OUTSIDE duration div */}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCoursesDropdown;
