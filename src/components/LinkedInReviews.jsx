"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { X } from "lucide-react";

import "swiper/css";

const reviews = [
  {
    name: "Annapurna B.",
    role: "Senior QA Automation Engineer",
    image: "/images/Linkedin1.png",
  },
  {
    name: "Ivan Alberto",
    role: "QA Automation Engineer",
    image: "/images/linkedin2.png",
  },
  {
    name: "Nitisha Kondadhasula",
    role: "QA Automation Engineer",
    image: "/images/linkedin3.png",
  },
  {
    name: "Nitisha Kondadhasula",
    role: "QA Automation Engineer",
    image: "/images/linkedin3.png",
  },
  {
    name: "Annapurna B.",
    role: "Senior QA Automation Engineer",
    image: "/images/Linkedin1.png",
  },
  {
    name: "Ivan Alberto",
    role: "QA Automation Engineer",
    image: "/images/linkedin2.png",
  },
  

];


export default function LinkedInReviewsSlider() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-black mb-3">
            Linked In Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            What People Say on LinkedIn
          </h2>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
                centeredSlides: false,
              },
            }}
            className="!px-4 sm:!px-0"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="!h-auto pb-4">
                <div className="h-full flex flex-col">
                  <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 flex-grow flex flex-col">
                    <div
                      onClick={() => setSelectedImage({ image: review.image, name: review.name })}
                      className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer"
                    >
                      <img
                        src={review.image}
                        alt={`LinkedIn review by ${review.name}`}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4 sm:p-5 text-center bg-white flex-grow flex flex-col justify-center">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {review.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-sm shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{selectedImage.name}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-50 p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
