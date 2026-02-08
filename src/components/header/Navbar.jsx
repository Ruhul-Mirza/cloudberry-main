"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/images/cloud_berry.png"
import {
  ArrowRight,
  X,
  ChevronDown,
  ChevronRight,
  Building2,
  BarChart3,
  Code2,
  TrendingUp,
  Grip,
} from "lucide-react";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const coursesItems = [
    { courseName: "Data Science", courseDuration: "12 Months" },
    { courseName: "Data Analyst", courseDuration: "10 Months" },
    { courseName: "Full Stack Development", courseDuration: "8 Months" },
    { courseName: "Digital Marketing", courseDuration: "3 Months" },
  ];

  const servicesItems = [
    {
      name: "Data Science",
      description: "Advanced analytics and machine learning solutions",
      icon: BarChart3,
    },
    {
      name: "Data Analyst",
      description: "Business intelligence and data visualization",
      icon: TrendingUp,
    },
    {
      name: "Full Stack",
      description: "End-to-end application development",
      icon: Code2,
    },
    {
      name: "Digital Marketing",
      description: "Strategic growth and optimization",
      icon: Building2,
    },
  ];

  const navigationItems = [
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Blog", href: "#blog" },
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        menuButton &&
        !menuButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  return (
    <>
      <nav className="bg-transparent relative z-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={176}
                height={48}
                className="w-32 sm:w-44 h-auto"
              />
            </div>

            {/* Central Bar */}
            <div className="hidden xl:flex items-center bg-white shadow-gray-200 rounded-full shadow-sm pl-6 pr-2 py-2 border border-gray-200 max-w-2xl">
              <div className="flex items-center space-x-4">
                {coursesItems.map((courseItem, index) => (
                  <div
                    key={courseItem.courseName}
                    className="flex gap-5 items-center"
                  >
                    <div className="text-sm">
                      <div className="text-gray-900 font-semibold text-xs">
                        {courseItem.courseName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {courseItem.courseDuration}
                      </div>
                    </div>
                    {index < coursesItems.length - 1 && (
                      <div className="h-6 w-px bg-gray-200"></div>
                    )}
                  </div>
                ))}

                <button className="w-8 h-8 flex items-center justify-center ml-10 cursor-pointer bg-black/60 hover:bg-black rounded-full transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-2.5 sm:px-4 py-2 rounded-md bg-black hover:bg-black/70 font-medium text-white text-xs sm:text-sm transition-transform duration-300">
                Contact Us
              </button>

              {/* Menu Button */}
              <button
                id="menu-button"
                onClick={toggleSidebar}
                className="w-8 h-8 flex text-gray-500 hover:text-black items-center justify-center rounded-full bg-gray-100 hover:bg-black/20 transition-colors duration-300"
              >
                <Grip className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200" />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-200 ease-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={176}
                height={48}
                className="w-32 sm:w-44 h-auto"
              />
            </div>
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 flex hover:text-black items-center justify-center rounded hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              {/* Main Navigation */}
              <div className="px-3 mb-6">
                <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h3>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded hover:bg-black/10 hover:text-black transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-black" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Courses Section */}
              <div className="px-3">
                <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={toggleServices}
                    className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded hover:bg-black/10 hover:text-black transition-colors"
                  >
                    <span>Our Courses</span>
                    <ChevronDown
                      className={`w-4 h-4 ml-auto text-gray-400 group-hover:text-black transition-transform ${
                        isServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Courses List */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isServicesOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="pl-3 space-y-1">
                      {servicesItems.map((service) => {
                        const IconComponent = service.icon;
                        return (
                          <a
                            key={service.name}
                            href={`#${service.name
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="group flex items-start px-3 py-3 text-sm rounded hover:bg-black/10 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">
                                {service.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* View All Button */}
                    <div className="px-3 pt-2 pb-1">
                      <button className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors text-center border border-gray-200 hover:border-gray-300">
                        View All Courses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <button className="w-full px-4 py-2 bg-black hover:bg-black/80 text-white text-sm font-medium rounded transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
