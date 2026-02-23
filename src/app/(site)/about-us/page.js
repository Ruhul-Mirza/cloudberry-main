"use client";

import Image from "next/image";
import { Instagram, Linkedin, X } from "lucide-react";
import profile from "../../../../public/images/profile.jpg";
import CommonHero from "@/components/CommonHero";

const team = [
  {
    name: "Grace Thompson",
    role: "AI Project Manager",
    image: profile,
  },
  //   {
  //     name: "Ava Morgan",
  //     role: "Framer Developer",
  //     image:
  // logo,
  //   },
  //   {
  //     name: "Grace Thompson",
  //     role: "AI Project Manager",
  //     image:
  // logo,
  //   },
  //   {
  //     name: "Ava Morgan",
  //     role: "Framer Developer",
  //     image:
  // logo,
  //   },
  //   {
  //     name: "Grace Thompson",
  //     role: "AI Project Manager",
  //     image:
  // logo,
  //   },
];

export default function AboutUs() {
  return (
    <>
      <CommonHero
        eyebrow="About Us"
        title="Next Generation of Experts"
        subtitle="Structured learning for long-term mastery"
        cardTitle="Why We Teach Differently"
        cardDescription="At our core, we believe that true expertise isn't built overnight—it's engineered through consistency and deep understanding. Our curriculum moves beyond surface-level tutorials, focusing on the fundamental principles that allow you to adapt to any challenge. By combining rigorous theory with hands-on application, we help students transition from 'knowledge seekers' to 'problem solvers.' Whether you are starting from scratch or leveling up your professional skills, our structured pathways are designed to bridge the gap between curiosity and career-ready mastery. Join thousands of learners who have chosen a deeper, more intentional way to grow."
        ctaText="Enroll Now"
      />
      <div className="grid grid-cols-1  md:grid-cols-2 gap-5 max-w-3xl mx-auto mt-10">
        <SampleCard
          title="Our Mission"
          text="To empower learners with the skills and knowledge they need to thrive in a rapidly evolving digital world."
        />
        <SampleCard
          title="Our Vision"
          text="To be the leading force in transforming education through innovative, accessible, and impactful learning experiences."
        />
      </div>
      <OurTeamSection />
    </>
  );
}

function SampleCard({ title, text }) {
  return (
    <div className="shadow-sm border-0 rounded-sm">
      <div
        className="w-[380px] h-[300px] rounded-sm bg-[#f3f2ef] p-4
      shadow-[inset_0_1px_10px_rgba(0,0,0,0.1),inset_0_-1px_10px_rgba(255,255,255,0.9)] "
      >
        <div className="rounded-sm bg-white p-6 h-full flex flex-col">
          {/* Header */}
          <h3 className="text-[20px] font-semibold text-[#111]">{title}</h3>

          {/* Divider */}
          <div className="my-4 border-t border-dashed border-[#e5e4e2]" />

          {/* Description (auto fill space) */}
          <p className="text-[15px] leading-relaxed text-[#6f6f6f] flex-1">
            {text}
          </p>

          {/* Tags */}
          <div className="mt-5 flex gap-2 flex-wrap">
            {["IDENTITY", "POSITIONING", "VOICE"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e5e4e2] bg-[#f6f5f3]
              px-4 py-1 text-[11px] font-medium tracking-widest text-[#6f6f6f]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OurTeamSection() {
  return (
    <section className="max-w-max mx-auto mt-20 mb-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        People behind the work
      </h2>

      {/* TEAM GRID */}
      <div className="shadow-md border-0 rounded-md">
        <div
          className="rounded-md bg-[#f3f2ef] p-4
      shadow-[inset_0_1px_10px_rgba(0,0,0,0.1),inset_0_-1px_10px_rgba(255,255,255,0.9)]"
        >
          <div className="grid grid-cols-1 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="group bg-white rounded-md border overflow-hidden transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* INFO */}
                <div className="p-5">
                  <h4 className="text-lg font-semibold">{member.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                    {member.role}
                  </p>

                  <div className="border-t border-dashed my-4" />

                  <div className="flex gap-3">
                    <SocialIcons />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function TeamSmallCard({ member }) {
  if (!member) return null; // ⭐ prevents crash
  return (
    <div className="bg-white rounded-xl p-3 flex gap-3 items-start">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-sm">{member.name}</h4>
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          {member.role}
        </p>

        <div className="border-t border-dashed my-3" />

        <div className="flex gap-2">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

function SocialIcons() {
  return (
    <>
      <Instagram className="w-4 h-4 cursor-pointer" />
      <Linkedin className="w-4 h-4 cursor-pointer" />
      <X className="w-4 h-4 cursor-pointer" />
    </>
  );
}
