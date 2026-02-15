"use client";

import { useState, useEffect, KeyboardEvent } from "react";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        />
      )}

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[540px]">
        <div className="bg-black rounded-sm overflow-hidden shadow-lg transition-all duration-500">
          
          {/* TOP BAR */}
          <div className="relative px-3 py-2">
            <div className="grid grid-cols-3 items-center">

              {/* LEFT - Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="CloudBerry Logo"
                    width={176}
                    height={48}
                    className="w-32 sm:w-36 h-auto"
                    priority
                  />
                </Link>
              </div>

              {/* CENTER - Hamburger */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  onKeyDown={handleKeyDown}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  className="relative w-8 h-8 flex flex-col justify-center items-center gap-[6px] group cursor-pointer"
                >
                  <span
                    className={`w-[28px] h-[2px] bg-white transition-all duration-300 origin-center
                    ${isOpen ? "rotate-45 translate-y-[4px]" : ""}
                    group-hover:opacity-80`}
                  />
                  <span
                    className={`w-[28px] h-[2px] bg-white transition-all duration-300 origin-center
                    ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}
                    group-hover:opacity-80`}
                  />
                </button>
              </div>

              {/* RIGHT - CTA */}
              <div className="flex justify-end">
                <button className="hidden sm:block w-32 py-1.5 text-white font-medium rounded-[4px] text-[15px] border border-white bg-black hover:bg-white hover:text-black transition">
                  Get Started
                </button>
              </div>
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
