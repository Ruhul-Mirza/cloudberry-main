"use client";
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/images/cloud_berry.png"
export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-300 py-16 overflow-hidden border-t border-white/10">
      {/* Subtle gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/90 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo + About */}
          <div className="space-y-4">
            <Image
              src={logo}
              alt="Cloud Berry Logo"
              className="w-36 brightness-125"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering professionals with real-world learning, mentorship,
              and measurable career growth through hands-on programs.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 uppercase">
              Courses
            </h3>
            <ul className="space-y-2 text-sm">
              {["Data Science", "Data Analyst", "Full Stack Development", "Digital Marketing"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4 uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Blog", "Reviews", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} <span className="text-gray-300">Cloud Berry</span>. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center space-x-5">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background glows */}
      <div className="absolute top-10 left-[10%] w-80 h-80 bg-blue-500/10 blur-[120px] -z-10"></div>
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-purple-600/10 blur-[140px] -z-10"></div>
    </footer>
  );
}
