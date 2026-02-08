"use client";

import { Play } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import logo from "../../../public/images/cloud_berry.png";

const YOUTUBE_EMBED =
  "https://www.youtube.com/embed/bax8CIuXvEM?autoplay=1&rel=0";

const features = [
  {
    number: "01",
    title: "Responsive Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    number: "02",
    title: "Unique Layout",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    number: "03",
    title: "Clean Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    number: "04",
    title: "Right Solution",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const FeatureCard = ({ feature }) => (
  <motion.div
    variants={itemVariants}
    className="group relative p-5 rounded-xl feature-card-bg transition-all duration-500"
    whileHover={{ y: -4 }}
  >
    <div className="absolute top-0 left-5 right-5 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500 rounded-full" />

    <div className="flex items-start gap-4">
      <span className="text-[1.75rem] font-bold">{feature.number}</span>
      <div>
        <h3 className="font-semibold mb-1.5 group-hover:text-primary transition">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function WhoWeAre() {
  const imageRef = useRef(null);
  const [play, setPlay] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [4, -4]);
  const rotateY = useTransform(mouseX, [-150, 150], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        {/* Left */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-14"
          >
            Who We <span className="text-primary">Are?</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.number} feature={f} />
            ))}
          </div>
        </motion.div>

        {/* Right Video */}
        <motion.div
          ref={imageRef}
          className="flex-1 relative w-full"
          style={{ perspective: 800 }}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <motion.div
            className="rounded-2xl overflow-hidden aspect-[16/9] bg-black"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {play ? (
              <iframe
                src="https://www.youtube.com/embed/bax8CIuXvEM?autoplay=1&rel=0"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                {/* LOGO THUMBNAIL */}
                <img
                  src="/images/cloud_berry.png"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-contain bg-black p-10"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/40" />

                {/* PLAY BUTTON */}
                <button
                  onClick={() => setPlay(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <Play
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                    />
                  </div>
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
