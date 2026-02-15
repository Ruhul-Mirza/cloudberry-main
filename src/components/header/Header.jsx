"use client";

import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/cloud_berry.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Courses", href: "/our-courses" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        />
      )}

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[540px]">
        {/* OUTER CONTAINER */}
        <div
          className={`bg-black rounded-sm overflow-hidden shadow-sm transition-all duration-500
          ${isOpen ? "max-w-[600px]" : "max-w-[540px]"}`}
        >
          {/* TOP BAR */}
          <div className="relative px-2 py-1"> 

            <div className="relative z-10 flex items-center justify-between">
              {/* Logo */}
              <div className="flex h-[44px] items-center">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="CloudBerry Logo"
                    width={176}
                    height={48}
                    className="w-32 sm:w-40 h-auto"
                  />
                </Link>
              </div>

              {/* Hamburger */}
              <div className="flex items-center">
                <div className="h-8 w-px bg-white mx-1" />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-white rounded-full transition"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <line x1="2" y1="2" x2="14" y2="14" />
                      <line x1="14" y1="2" x2="2" y2="14" />
                    </svg>
                  ) : (
                    <>
                      <span className="block w-[17px] h-[1.8px] bg-black rounded-full" />
                      <span className="block w-[17px] h-[1.8px] bg-black rounded-full" />
                    </>
                  )}
                </button>
                <div className="h-8 w-px bg-white mx-1" />
              </div>

              {/* CTA */}
              <button className="w-32 sm:w-40 py-1 sm:py-1.5 text-white font-medium rounded-[4px] text-[15px] sm:text-[16px]
                border border-white bg-black
                hover:bg-white hover:text-black transition">
                Get Started
              </button>
            </div>
          </div>

          {/* MENU */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: isOpen ? "460px" : "0px",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="border-t border-white/10" />
            <div className="px-6 py-5 bg-black">
              <div className="flex flex-col">
                {navLinks.map((link, i) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`py-4 text-[17px] font-medium relative transition-colors
                        ${
                          i < navLinks.length - 1
                            ? "border-b border-dashed border-white/20"
                            : ""
                        }
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                    >
                      {link.label}
                      
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-6 pt-2">
                <div className="flex gap-2.5">
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
                <span className="text-[13px] text-white/50">
                  © {new Date().getFullYear()} CloudBerry
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
