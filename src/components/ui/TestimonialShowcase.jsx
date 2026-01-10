"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "Nikhil YN",
    role: "Software Engineer",
    story: "Got 2 job offers with a 400% salary hike after switching careers.",
    video: "https://www.youtube.com/embed/j0hBoqOVVFk",
  },
  {
    id: 2,
    name: "Herin Wilson",
    role: "IT Associate",
    story: "Transitioned from non-tech to IT with confidence and skill.",
    video: "https://www.youtube.com/embed/PxIRMaJMOjY",
  },
  {
    id: 3,
    name: "Ayush Shah",
    role: "Data Analyst",
    story: "Landed a dream job as a fresher in a top MNC.",
    video: "https://www.youtube.com/embed/sPM2MJyF6xo",
  },
  {
    id: 4,
    name: "Somika Simlote",
    role: "Sr. Engg at Persistent Systems",
    story: "Became financially independent after upskilling.",
    video: "https://www.youtube.com/embed/BzhcQuYVWYo",
  },
  // This is a workaround to make the carousel infinite. We repeat the same testimonials twice in the same order :)
  {
    id: 5,
    name: "Nikhil YN",
    role: "Software Engineer",
    story: "Got 2 job offers with a 400% salary hike after switching careers.",
    video: "https://www.youtube.com/embed/j0hBoqOVVFk",
  },
  {
    id: 6,
    name: "Herin Wilson",
    role: "IT Associate",
    story: "Transitioned from non-tech to IT with confidence and skill.",
    video: "https://www.youtube.com/embed/PxIRMaJMOjY",
  },
  {
    id: 7,
    name: "Ayush Shah",
    role: "Data Analyst",
    story: "Landed a dream job as a fresher in a top MNC.",
    video: "https://www.youtube.com/embed/sPM2MJyF6xo",
  },
  {
    id: 8,
    name: "Somika Simlote",
    role: "Sr. Engg at Persistent Systems",
    story: "Became financially independent after upskilling.",
    video: "https://www.youtube.com/embed/BzhcQuYVWYo",
  },
];

export default function TestimonialShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);
  const swiperRef = useRef(null);

  // Navigation handlers
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(300);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(300);
    }
  };

  // Handle video modal
  const handleWatchStory = (videoUrl) => {
    setActiveVideo(videoUrl);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
  };

  // Control autoplay based on modal state
  useEffect(() => {
    if (swiperRef.current) {
      if (activeVideo) {
        // Stop autoplay when modal opens
        swiperRef.current.autoplay.stop();
      } else {
        // Resume autoplay when modal closes
        swiperRef.current.autoplay.start();
      }
    }
  }, [activeVideo]);

  return (
    <section className="bg-white text-gray-900 py-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-gray-900">
          Real People. Real Results.
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Hear how professionals transformed their careers through our programs.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative px-4 sm:px-0 py-8">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView="auto"
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          loop
          centeredSlides
          allowTouchMove
        >
          {testimonials.map((item, idx) => {
            const vid = item.video.split("/").pop();
            return (
              <SwiperSlide
                key={`${item.id}-${idx}`}
                style={{
                  flexShrink: 1,
                  height: "auto",
                }}
                className="!min-w-[360px]"
              >
                {({ isActive }) => (
                  <div
                    className={`relative bg-white border border-gray-200 rounded-2xl transition-all duration-300 overflow-hidden my-4 ${
                      isActive ? "opacity-100 scale-100" : "opacity-70 scale-95"
                    }`}
                  >
                  {/* Video Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                    <img
                      src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    <button
                      onClick={() => handleWatchStory(item.video)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer border"
                    >
                      <PlayCircle className="w-14 h-14 text-white/80 hover:text-blue-600 transition-all" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      "{item.story}"
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
                        alt={item.name}
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWatchStory(item.video)}
                      className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
                    >
                      <PlayCircle className="w-5 h-5" /> Watch Story
                    </button>
                  </div>
                </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex mt-10 gap-4 justify-center">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-full p-2 border border-gray-200 text-gray-600 bg-white hover:bg-gray-100 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full p-2 border border-gray-200 text-gray-600 bg-white hover:bg-gray-100 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl relative"
            >
              <iframe
                src={`${activeVideo}?autoplay=1&controls=1`}
                className="w-full h-[70vh] rounded-xl shadow-2xl border border-gray-200"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                className="absolute -top-10 right-0 text-white text-lg hover:opacity-80"
                onClick={handleCloseModal}
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
