"use client";
import React from "react";
import Image from "next/image";
import checkIcon from "../../../public/images/checked.jpg"

export default function LearnWithUs() {
  const features = [
    "Hands-on Learning with Real Projects",
    "Industry-Ready Mentorship",
    "Latest Tech Stacks & Tools",
    "Career Guidance & Placement Help",
    "Flexible Schedules for Working Pros",
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading + Description */}
        <div className="text-left mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-5 leading-tight">
            Learn Smarter. Grow Faster.
          </h2>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Build job-ready skills and gain practical experience in today’s most
            in-demand technologies — guided by professionals who’ve been there.
          </p>
        </div>

        {/* === Main Row: Checklist & Video === */}
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          
          {/* Checklist Section */}
          <div className="flex-1">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-800 text-base"
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-[3px]">
                    <Image
                      src={checkIcon}
                      alt="check"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium leading-snug">{feature}</h3>
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Video Section */}
          <div className="flex-1 flex justify-center md:justify-around items-center">
            <div className="relative w-full max-w-[480px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500">
              <iframe
                width="100%"
                height="270"
                src="https://www.youtube.com/embed/bax8CIuXvEM?si=oFO4lP6P-BQwwk7D"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
