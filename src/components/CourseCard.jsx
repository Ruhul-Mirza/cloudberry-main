"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag, Users } from "lucide-react";
import Link from "next/link";

const CourseCard = ({ course, index }) => {
  const oldPrice = parseFloat(course.old_price);
  const newPrice = parseFloat(course.new_price);
  console.log(course, "Course Here");

  const isActive = course.status === "active";
  const discountPercent =
    oldPrice && newPrice && oldPrice > newPrice
      ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
      : 0;

  const hasDiscount = discountPercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl bg-card border border-border shadow-sm hover:border-primary/20 transition-all duration-300"
    >
      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute  -top-2.5 right-4 z-10">
          <span className="inline-flex bg-black items-center gap-1 px-3 py-1 rounded-full bg-discount text-primary-foreground text-xs font-semibold shadow-sm">
            <Tag className="w-3 h-3" />
            {discountPercent}% OFF
          </span>
        </div>
      )}

      {/* Card top accent */}
      {/* <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-primary/80 via-primary to-primary/60" /> */}

      <div className="flex flex-col flex-1 p-5 pt-4">
        {/* Status & Category row */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground">
            {course.category_name}
          </span>

          <span
            className={`inline-flex  px-1.5 py-1 rounded-sm items-center gap-1.5 text-xs font-medium ${
              isActive
                ? "text-green-700 bg-green-200"
                : "text-red-700 bg-red-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full  ${
                isActive ? "bg-green-700" : "bg-red-700"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 font-heading">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {course.description || "No description available."}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {new Date(course.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Price & Action */}
        <div className="flex flex-col sm:flex-row items-start gap-10 sm:gap-0 sm:items-center justify-between pt-4">
          <div className="flex md:flex-row flex-col items-baseline gap-2">
            <span className="text-xl font-bold text-foreground font-heading">
              ${newPrice ? newPrice.toLocaleString() : course.price}
            </span>

            {hasDiscount && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-primary-foreground text-xs font-semibold">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <Link href={`/our-courses/${course.slug}`}>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                View Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
