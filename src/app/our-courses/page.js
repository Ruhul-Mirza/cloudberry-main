"use client";
import { Home, ChevronRight, GraduationCap, ArrowRight } from "lucide-react";
import CourseSection from "../../components/CoursesSection";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../../public/images/cloud_berry.png";
import CommonHero from "@/components/CommonHero";

export default function OurCourses() {
  return (
    <div className="relative overflow-hidden bg-[#faf9f7]">
      <CommonHero
        eyebrow="Our Courses"
        title="Learn with clarity"
        subtitle="Structured learning for long-term mastery"
        cardTitle="Courses built on depth, not shortcuts"
        cardDescription="lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        ctaText="Enroll Now"
        imageSrc={logo}
      />
      <CourseSection />
    </div>
  );
}
