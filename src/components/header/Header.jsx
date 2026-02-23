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

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        const courseData =
          data?.data?.[0]?.filter((course) => course.status === "active") || [];

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

          <button className="rounded bg-black px-5 py-2 text-sm font-semibold text-white">
            Get Started
          </button>
        </div>

        {/* MD RIGHT BUTTON */}
        <div className="hidden md:block lg:hidden">
          <button className="rounded bg-black px-4 py-2 text-sm font-semibold text-white">
            Get Started
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
                    const slug = course.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]+/g, "");

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
                            href={`/our-courses/${slug}`}
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
            <button className="w-full bg-black text-white py-2 rounded">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
