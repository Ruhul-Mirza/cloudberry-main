"use client";
import { Sparkles, Globe, Atom, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "./ui/StatCard";
import { Button } from "./ui/button";

export default function HeroSectionHome() {
  return (
    <section className="relative bg-white -mt-6 lg:-mt-12 border-b overflow-hidden lg:overflow-visible">
      {/* ================= CENTER CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16 lg:pt-0 lg:justify-center lg:min-h-screen">
        <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1 mb-6">
          <Sparkles className="w-4 h-4 text-black-500" />
          <span className="text-sm">Driving Digital Growth</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Empowering Businesses with <br />
          Next-Gen IT Solutions
        </h1>

        <p className="text-gray-500 max-w-xl mb-8">
          Building secure, scalable, and innovative IT solutions for modern
          businesses
        </p>

        <div className="flex flex-col justify-center sm:flex-row gap-3 w-full max-w-md">
          <Button className="w-full sm:w-auto">Get Started</Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Our Work
          </Button>
        </div>
      </div>

      {/* ================= MOBILE ( < md ) ================= */}
      <div className="md:hidden grid grid-cols-2 gap-4 px-4 pb-8 pt-10">
        <StatCard
          value="20+"
          label="Countries"
          icon={<Globe className="w-4 h-4" />}
        />
        <StatCard value="500+" label="Projects" />
        <StatCard
          value="10+"
          label="Years"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
        />
        <StatCard
          value="100+"
          label="Engineers"
          image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"
        />
      </div>

      {/* ================= TABLET ( md only ) ================= */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 px-6 pt-20 pb-10">
        <StatCard
          value="20+"
          label="Countries"
          icon={<Globe className="w-4 h-4" />}
        />
        <StatCard value="500+" label="Projects" />
        <StatCard
          value="10+"
          label="Years"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
        />
        <StatCard
          value="100+"
          label="Engineers"
          image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"
        />
      </div>

      {/* ================= DESKTOP ( lg+ ) ================= */}
      <div className="hidden lg:block">
        {/* Top Left */}
        <div className="absolute top-32 left-44">
          <StatCard
            value="20+"
            label="Countries Served"
            icon={<Globe className="w-4 h-4" />}
          />
        </div>

        {/* Top Right */}
        <div className="absolute top-32 right-44">
          <StatCard value="500+" label="Projects Delivered" />
        </div>
        <motion.div
          animate={{
            opacity: [1], // Fade in shuru mein, phir wahi rahega
            scale: [1], // Scale up shuru mein, phir wahi rahega
            x: [0, 0, 20, 0], // Pehle 0 par rukega, phir move hoga
          }}
          transition={{
            duration: 4, // Total duration
            times: [0, 0.1, 0.5, 1], // Timing: 10% par entrance khatam, baaki loop
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[45%] left-16 2xl:left-28"
        >
          <div className="w-12 h-12 rounded-xl bg-muted/30 border shadow-sm border-border flex items-center justify-center">
            <Atom className="w-6 h-6 text-muted-foreground" />
          </div>
        </motion.div>
        {/* Bottom Left */}
        <div className="absolute bottom-24 left-44">
          <StatCard
            value="10+"
            label="Years of Excellence"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
          />
        </div>
        <motion.div
          animate={{
            opacity: [1],
            scale: [1],
            x: [0, 0, -20, 0], // Direction opposite (-20)
          }}
          transition={{
            duration: 4, // Sync ke liye same duration (4s)
            times: [0, 0.1, 0.5, 1], // Sync ke liye same timing
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[45%] right-16 2xl:right-28"
        >
          <div className="w-12 h-12 rounded-xl shadow-sm bg-muted/30 border border-border flex items-center justify-center">
            <Code2 className="w-6 h-6 text-muted-foreground" />
          </div>
        </motion.div>
        {/* Bottom Right */}
        <div className="absolute bottom-24 right-44">
          <StatCard
            value="100+"
            label="IT Engineers"
            image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"
          />
        </div>
      </div>
    </section>
  );
}