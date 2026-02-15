"use client";

import Image from "next/image";
import { Instagram, Linkedin, X } from "lucide-react";
import logo from "../../../public/images/cloud_berry.png";
const team = [
  {
    name: "Grace Thompson",
    role: "AI Project Manager",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ava Morgan",
    role: "Framer Developer",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ethan Cole",
    role: "Founder & UX Visionary",
    image:
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    name: "Sophia Bennett",
    role: "Motion Designer",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Maya Clarke",
    role: "QA Specialist",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MissionAndTeamSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 space-y-40">
      {/* ================= MISSION ================= */}
      <div>
        {/* Eyebrow */}
        <span className="block mb-4 text-xs uppercase tracking-widest text-muted-foreground">
          ‹ Our Mission ›
        </span>

        {/* Heading */}
        <h2 className="font-geist text-5xl sm:text-6xl font-medium max-w-3xl leading-tight">
          Designed to elevate
          <br />
          brands with meaning
        </h2>

        {/* Image + Overlay */}
        <div className="relative mt-20 rounded-3xl overflow-hidden">
          {/* Image */}
          <Image
            src={logo}
            alt="Mission"
            width={1400}
            height={800}
            className="w-full h-[520px] object-cover"
            priority
          />

          {/* Core Values Card */}
          <div className="absolute right-10 bottom-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-medium text-lg mb-4">Core Values</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Strategy-Led",
                "Detail-Driven",
                "Transparent Process",
                "Long-Term Partnership",
                "High-Quality Execution",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-muted-foreground">
              © 2026 Agnos Creative Agency
            </p>
          </div>
        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div>
        {/* Eyebrow */}
        <span className="block mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
          ‹ Team ›
        </span>

        {/* Heading */}
        <h2 className="text-center font-geist text-4xl sm:text-5xl font-medium mb-20">
          People behind the work
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className={`relative rounded-2xl bg-white p-4 shadow-sm ${
                member.featured ? "lg:row-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={500}
                  className={`w-full object-cover ${
                    member.featured ? "h-[420px]" : "h-[240px]"
                  }`}
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
                  {member.role}
                </p>

                {/* Socials */}
                <div className="flex items-center gap-3 mt-4 text-muted-foreground">
                  <Instagram className="w-4 h-4" />
                  <Linkedin className="w-4 h-4" />
                  <X className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//   <div className="max-w-md rounded-2xl bg-[#f3f2ef] p-4 
// shadow-[inset_0_1px_10px_rgba(0,0,0,0.1),inset_0_-1px_10px_rgba(255,255,255,0.9)]">

//         {/* Inner card */}
//         <div className="rounded-xl bg-white p-6">
//           {/* Header */}
//           <div className="flex items-start justify-between">
//             <h3 className="text-[20px] font-semibold text-[#111]">
//               Branding & Identity
//             </h3>

//             {/* Icon box */}
//             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f6f5f3] border border-[#e5e4e2]">
//               <span className="text-lg">👍</span>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-4 border-t border-dashed border-[#e5e4e2]" />

//           {/* Description */}
//           <p className="text-[15px] leading-relaxed text-[#6f6f6f]">
//             From concept to prototype, we create user-centered interfaces that
//             balance beauty with performance, ensuring every interaction feels
//             effortless.
//           </p>

//           {/* Tags */}
//           <div className="mt-5 flex gap-2">
//             {["IDENTITY", "POSITIONING", "VOICE"].map((tag) => (
//               <span
//                 key={tag}
//                 className="rounded-full border border-[#e5e4e2] bg-[#f6f5f3] px-4 py-1 text-[11px] font-medium tracking-widest text-[#6f6f6f]"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>