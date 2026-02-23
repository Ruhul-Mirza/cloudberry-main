"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  // ================= DATA =================
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= FILTER STATE =================
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // ================= SORT LABELS =================
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const sortLabels = {
    newest: "Newest First",
    "price-low": "Price: Low → High",
    "price-high": "Price: High → Low",
    "a-z": "A → Z",
    "z-a": "Z → A",
  };

  // ================= FETCH COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const json = await res.json();
        // API returns data[0] as the array of courses
        const list = Array.isArray(json?.data) ? json.data : [];
        console.log(list, "Fetched Courses");
        const activeOnly = list.filter((c) => c.status === "active");
        console.log(activeOnly, "Active COurse");
        setCourses(activeOnly);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ================= CATEGORIES (derived from courses) =================
  const CATEGORIES = useMemo(() => {
    const unique = [
      ...new Set(courses.map((c) => c.category_name).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [courses]);

  // ================= FILTER + SORT =================
  const filtered = useMemo(() => {
    let result = [...courses];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          c.category_name?.toLowerCase().includes(q),
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter((c) => c.category_name === category);
    }

    // Discount — uses discount_available boolean from API
    if (discountOnly) {
      result = result.filter((c) => c.discount_available === true);
    }

    // Sort — price comes as string like "1222.00" so parseFloat it
    switch (sort) {
      case "price-low":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "a-z":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "z-a":
        result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
        break;
      default: // newest
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
    }

    return result;
  }, [courses, search, category, sort, discountOnly]);

  // ================= LOADING / ERROR =================
  if (loading) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        Loading courses…
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">{error}</section>
    );
  }

  // ================= UI =================
  return (
    <section className="pb-16">
      {/* Filters */}
      <div className="border-y border-border sticky top-0 z-3">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border bg-background text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowSortDropdown(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border bg-background text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {category === "All" ? "All Categories" : category}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showCategoryDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCategoryDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-52 rounded-sm border bg-card shadow-lg z-50 py-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm ${
                          category === cat
                            ? "bg-primary text-white"
                            : "hover:bg-secondary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border bg-background text-sm"
              >
                Sort: {sortLabels[sort]}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-52 border bg-card shadow-lg z-50 py-1">
                    {Object.entries(sortLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSort(key);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm ${
                          sort === key
                            ? "bg-primary text-white"
                            : "hover:bg-secondary"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Discount */}
            <button
              onClick={() => setDiscountOnly(!discountOnly)}
              className={`px-4 py-2.5 rounded-sm max-w-max border text-sm ${
                discountOnly
                  ? "bg-primary text-white"
                  : "bg-background hover:bg-secondary"
              }`}
            >
              🏷️ Discount Only
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No courses found
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
