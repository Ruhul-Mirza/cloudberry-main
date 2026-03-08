"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/cloud_berry.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Our Courses", href: "/our-courses" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  /* FETCH COURSES */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();

        const activeCourses =
          data?.data?.filter((course) => course.status === "active") || [];

        setCourses(activeCourses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const categoryCourses = courses.filter(
    (course) => course.category_name === activeCategory,
  );

  return (
    <footer className="relative bg-black text-gray-300 py-16 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/90 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* LOGO */}
          <div className="space-y-4">
            <Image
              src={logo}
              alt="Cloud Berry Logo"
              className="w-36 brightness-125"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering professionals with real-world learning, mentorship, and
              measurable career growth through hands-on programs.
            </p>
          </div>

          {/* NAV LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 uppercase">
              Navigation
            </h3>

            <ul className="space-y-2 text-sm">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES + COURSES */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 uppercase">
              All Courses
            </h3>

            <div className="space-y-2">
              {categories.map((cat) => {
                const catCourses = courses.filter(
                  (course) => course.category_name === cat,
                );

                const isOpen = activeCategory === cat;

                return (
                  <div key={cat} className="border-b border-white/10 pb-2">
                    {/* Category button */}
                    <button
                      onClick={() => setActiveCategory(isOpen ? "" : cat)}
                      className="flex w-full items-center justify-between text-sm hover:text-white"
                    >
                      {cat}
                      <span className="text-xs opacity-60">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>

                    {/* Dropdown courses */}
                    {isOpen && (
                      <ul className="mt-2 space-y-1 pl-2">
                        {catCourses.slice(0, 4).map((course) => (
                          <li key={course.id}>
                            <Link
                              href={`/our-courses/${course.id}`}
                              className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              {course.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 uppercase">
              Contact
            </h3>

            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Mumbai, Maharashtra, India</span>
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <a href="tel:+911234567890" className="hover:text-white">
                +91 12345 67890
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href="mailto:info@cloudberry.com" className="hover:text-white">
                info@cloudberry.com
              </a>
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300">Cloud Berry</span>. All rights
            reserved.
          </p>

          <div className="flex items-center space-x-5">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-10 left-[10%] w-80 h-80 bg-blue-500/10 blur-[120px] -z-10"></div>
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-purple-600/10 blur-[140px] -z-10"></div>
    </footer>
  );
}
