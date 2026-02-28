"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  Calendar,
  ArrowUpRight,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import AllCoursesDropdown from "../ui/AllCoursesDropdown";
import Image from "next/image";
import logo from "../../../public/images/cloud_berry.png";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Our Courses", href: "/our-courses" },
  { name: "Contact", href: "/contact" },
  { name: "Explore Courses", type: "courses" },
];

const Header = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    student_name: "",
    rating: 0,
    message: "",
  });

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
        setReviewForm({
          student_name: "",
          rating: 0,
          message: "",
        });
      }, 120000); // 2 minutes

      return () => clearTimeout(timer);
    }
  }, [showThankYou]);
  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();
        console.log("Raw course data:", data);
        const courseData =
          data?.data?.filter((course) => course.status === "active") || [];
        console.log("Fetched courses:", courseData);
        setCourses(courseData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  /* ================= FETCH CATEGORIES ================= */
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setMobileView("courses");
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewForm),
      });

      if (res.ok) {
        setReviewForm({
          student_name: "",
          rating: 0,
          message: "",
        });
        setShowThankYou(true);

        // setIsReviewModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const activeCourses = courses.filter(
    (course) => course.category_name === activeCategory,
  );

  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-white shadow-sm">
      {/* ================= TOP HEADER ================= */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* MOBILE + MD LEFT */}
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </button>

          {/* md logo */}
          <div className="hidden md:block">
            <Image
              src={logo}
              alt="logo"
              width={176}
              height={48}
              className="w-36 h-auto"
            />
          </div>
        </div>

        {/* DESKTOP LOGO + DROPDOWN */}
        <div className="hidden lg:flex items-center gap-5">
          <Image src={logo} alt="logo" width={176} height={48} />
          <AllCoursesDropdown />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6">
          {navigationItems
            .filter((item) => item.type !== "courses")
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200
    ${pathname === item.href ? "text-black" : "text-gray-700 hover:text-black"}
    
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:w-full
    after:origin-left after:scale-x-0
    after:bg-black after:transition-transform after:duration-300
    hover:after:scale-x-100
    
    ${pathname === item.href ? "after:scale-x-100" : ""}
  `}
              >
                {item.name}
              </Link>
            ))}

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="rounded bg-black px-5 py-2 text-sm font-semibold text-white"
          >
            Reviews
          </button>
        </div>

        {/* MD RIGHT BUTTON */}
        <div className="hidden md:block lg:hidden">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="rounded bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Reviews
          </button>
        </div>

        {/* SM RIGHT LOGO */}
        <div className="block md:hidden">
          <Image
            src={logo}
            alt="logo"
            width={176}
            height={48}
            className="w-36 h-auto"
          />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl border-r transform transition-transform duration-200 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* SIDEBAR HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Image src={logo} alt="logo" width={140} height={40} />
            <button onClick={toggleSidebar}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto py-2">
            {/* MAIN */}
            {mobileView === "main" && (
              <div className="px-3">
                <h3 className="px-3 py-2 text-xs text-gray-500 uppercase">
                  Main Menu
                </h3>

                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    if (item.type === "courses") {
                      return (
                        <button
                          key={item.name}
                          onClick={() => setMobileView("categories")}
                          className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-black/10"
                        >
                          {item.name}
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm rounded hover:bg-black/10 
                          ${pathname === item.href ? "bg-black/10" : ""}`}
                      >
                        {item.name}
                        {/* <ChevronRight className="w-4 h-4 ml-auto" /> */}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* CATEGORIES */}
            {mobileView === "categories" && (
              <>
                <div className="flex items-center gap-3 border-b p-3">
                  <button onClick={() => setMobileView("main")}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-bold">Categories</span>
                </div>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex w-full items-center px-4 py-3 text-sm rounded hover:bg-black/10 ${
                      activeCategory === cat ? "bg-black/10 font-medium" : ""
                    }`}
                  >
                    {cat}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                ))}
              </>
            )}

            {/* COURSES */}
            {mobileView === "courses" && (
              <>
                <div className="flex items-center gap-3 border-b px-4 py-3">
                  <button onClick={() => setMobileView("categories")}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* category name */}
                  <span className="font-bold">
                    {activeCategory || "Courses"}
                  </span>
                </div>

                <div className="p-4">
                  {activeCourses.map((course, i) => {
                    return (
                      <div key={i} className="border rounded-lg p-4 mb-3">
                        <p className="text-xs text-gray-500">
                          {course.institution}
                        </p>
                        <p className="text-sm font-medium mb-2">
                          {course.title}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 text-xs text-gray-500">
                            <Calendar className="h-3.5 w-3.5" />
                            {course.duration}
                          </div>

                          <Link
                            href={`/our-courses/${course.id}`}
                            onClick={() => {
                              setIsSidebarOpen(false);
                              setMobileView("main");
                            }}
                            className="inline-flex items-center gap-1 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded text-xs"
                          >
                            View Course
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t p-4">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full bg-black text-white py-2 rounded"
            >
              Reviews
            </button>
          </div>
        </div>
      </div>
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsReviewModalOpen(false)}
        >
          {/* prevent closing when clicking inside modal */}
          <div onClick={(e) => e.stopPropagation()}     className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl"
>
            <ReviewForm
              reviewForm={reviewForm}
              setReviewForm={setReviewForm}
              handleReviewSubmit={handleReviewSubmit}
              loading={loading}
              showThankYou={showThankYou}
              closeModal={() => setIsReviewModalOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

function ReviewForm({
  reviewForm,
  setReviewForm,
  handleReviewSubmit,
  loading,
  showThankYou,
  closeModal,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-50 w-full rounded  bg-gray-200 p-3 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_10px_rgba(0,0,0,0.1)]"
    >
      <div className="bg-white p-2 rounded">
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 z-10 p-1 hover:bg-gray-50 hover:rounded"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6 sm:p-8">
          {showThankYou ? (
            <div className="flex flex-col justify-center items-center bg-gray-100 border h-[100%] border-zinc-200 shadow-sm rounded md:py-20 px-8 py-10 text-center">
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
                Your message has been sent successfully. We'll get back to you
                soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="student_name"
                  className="block text-[11px] font-bold tracking-wider text-foreground uppercase mb-1.5"
                >
                  Name<span className="text-destructive">*</span>
                </label>
                <input
                  id="student_name"
                  name="student_name"
                  type="text"
                  required
                  value={reviewForm.student_name}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      student_name: e.target.value,
                    })
                  }
                  className="w-full rounded border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Dennis Barrett"
                />
              </div>

              {/* Email */}
              {/* RATING */}
              <div>
                <label
                  htmlFor="rating"
                  className="block text-[11px] font-bold tracking-wider text-foreground uppercase mb-1.5"
                >
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                      className={`text-2xl ${
                        reviewForm.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
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
                  value={reviewForm.message}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      message: e.target.value,
                    })
                  }
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
                      <span>Send a review</span>
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
  );
}
export default Header;
