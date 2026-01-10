"use client";
import React from "react";
import {
  Rocket,
  Globe,
  Code2,
  Users,
  Cpu,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      
      {/* Floating Cards visible on lg screen only*/}
      <div className="absolute inset-0 hidden md:block z-10 pointer-events-none">
        
        <FloatingCard position="top-8 left-10 lg:left-30" delay="0s">
          <StatCard icon={<Globe />} title="20+" subtitle="Countries" />
        </FloatingCard>

        <FloatingCard position="top-8 right-10 lg:right-30" delay="1s">
          <StatCard icon={<Code2 />} title="500+" subtitle="Projects" />
        </FloatingCard>

        <FloatingCard position="bottom-10 left-10 lg:left-30" delay="2s">
          <StatCard
            img="https://randomuser.me/api/portraits/men/32.jpg"
            title="10+"
            subtitle="Years"
          />
        </FloatingCard>

        <FloatingCard position="bottom-10 right-10 lg:right-30" delay="3s">
          <StatCard
            img="https://randomuser.me/api/portraits/men/44.jpg"
            title="100+"
            subtitle="Engineers"
          />
        </FloatingCard>

        <FloatingCard
          position="top-[180px] left-[2%] hidden lg:block"
          delay="1s"
        >
          <StatCard icon={<BarChart3 />} title="95%" subtitle="Retention" />
        </FloatingCard>

        <FloatingCard
          position="top-[180px] right-[2%] hidden lg:block"
          delay="2.5s"
        >
          <StatCard icon={<Cpu />} title="24/7" subtitle="Support" />
        </FloatingCard>
      </div>
      
      {/* Hero Section content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-100 shadow-md text-black px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Rocket size={16} /> Driving Digital Growth
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-600 mb-4 leading-tight">
          Empowering Knowledge with <br className="hidden sm:block" />
          <span className="text-zinc-800">CloudBerry Services</span>
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          Building secure, scalable, and innovative IT solutions for modern
          businesses.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-2.5 bg-black/90 hover:bg-black text-white font-medium rounded-lg shadow transition-all">
            Get Started
          </button>
          <button className="px-6 py-2.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-medium rounded-lg transition-all">
            Our Work
          </button>
        </div>

        {/* Mobile Grid Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:hidden">
          <StatCard icon={<Globe />} title="20+" subtitle="Countries" />
          <StatCard icon={<Code2 />} title="500+" subtitle="Projects" />
          <StatCard
            img="https://randomuser.me/api/portraits/men/32.jpg"
            title="10+"
            subtitle="Years"
          />
          <StatCard
            img="https://randomuser.me/api/portraits/men/44.jpg"
            title="100+"
            subtitle="Engineers"
          />
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}

/* Floating wrapper */
function FloatingCard({ position, delay, children }) {
  return (
    <div
      className={`absolute ${position}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

/* Stat card */
function StatCard({ icon, img, title, subtitle }) {
  return (
    <div className="bg-white shadow-sm shadow-neutral-200 border border-gray-100 rounded-xl p-3 sm:p-4 w-100vw sm:w-32 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
      {img ? (
        <img
          src={img}
          alt={subtitle}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-1 object-cover"
        />
      ) : (
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-zinc-100 text-black mb-1">
          {icon}
        </div>
      )}
      <p className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
        {title}
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}
