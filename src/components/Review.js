"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Tooltip from "@mui/material/Tooltip";
import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";
import "swiper/css";

const StarRating = ({ rating }) => {
  const filled = Number(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-4 h-4"
          fill={star <= filled ? "#f59e0b" : "none"}
          stroke={star <= filled ? "#f59e0b" : "#d1d5db"}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isPlaying, onPlay }) => {
  const getVideoThumbnail = (videoUrl) => {
    const videoId = videoUrl.split("/embed/")[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="group relative h-[460px] w-full">
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-foreground rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-foreground rounded-br-3xl" />
      </div>

      <div className="relative h-full bg-card border border-border rounded-sm p-4 shadow-sm grid grid-rows-[auto_1fr_auto]">
        <div className="relative w-full h-[220px] rounded-sm overflow-hidden bg-muted">
          {isPlaying ? (
            <iframe
              src={`${testimonial.video}?autoplay=1&rel=0`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={getVideoThumbnail(testimonial.video)}
                alt={testimonial.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <button
                onClick={onPlay}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Play
                    className="w-6 h-6 text-black ml-1"
                    fill="currentColor"
                  />
                </div>
              </button>

              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-[10px]">
                WATCH
              </div>
            </>
          )}
        </div>

        <Tooltip
          title={
            <span className="text-sm leading-relaxed">{testimonial.story}</span>
          }
          arrow
          placement="bottom"
        >
          <p className="mt-5 text-sm text-foreground leading-relaxed line-clamp-3 max-h-[4.5rem] overflow-hidden cursor-help">
            {testimonial.story}
          </p>
        </Tooltip>

        <div className="flex items-center gap-3 pt-4">
          <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center font-bold">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm">{testimonial.name}</p>
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

const extractYouTubeId = (url) => {
  if (!url) return "";
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  const shortsMatch = url.match(/shorts\/([^?&]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([^?&]+)/);
  if (watchMatch) return watchMatch[1];
  const embedMatch = url.match(/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];
  return url;
};

const Reviews = () => {
  const swiperRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/reviews`);
        const json = await res.json();

        const reviews = json?.data?.[0] || [];

        const formatted = reviews.map((item) => ({
          id: item.id,
          name: item.student_name,
          rating: parseInt(item.rating, 10),
          story: item.message,
          video: `https://www.youtube.com/embed/${extractYouTubeId(item.youtube_embed)}`,
        }));

        setTestimonials(formatted);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayTestimonials =
    testimonials.length < 8 ? [...testimonials, ...testimonials] : testimonials;

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 md:py-24 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading testimonials...</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Transforming Careers,
              <br />
              <span className="text-muted-foreground">One Story at a Time</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-foreground text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Swiper
          className="items-stretch"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            setPlayingVideo(null);
          }}
          modules={[Autoplay]}
          loop={true}
          speed={800}
          spaceBetween={28}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {displayTestimonials.map((testimonial, idx) => (
            <SwiperSlide
              key={`${testimonial.id}-${idx}`}
              className="h-auto flex"
            >
              <TestimonialCard
                testimonial={testimonial}
                index={idx}
                isPlaying={playingVideo === testimonial.id}
                onPlay={() => {
                  setPlayingVideo(testimonial.id);
                  swiperRef.current?.autoplay.stop();
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
