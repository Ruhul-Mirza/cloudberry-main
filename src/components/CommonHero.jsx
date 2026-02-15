"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";

export default function CommonHero({
  eyebrow,
  title,
  subtitle,
  cardTitle,
  cardDescription,
  ctaText,
  imageSrc, // optional
}) {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7]">
      {/* concentric background */}
      <div className="pointer-events-none absolute inset-0 flex  md:-top-30 justify-center">
        <div
          className="relative w-[1200px] -top-52 h-[1000px] rounded-full hidden xl:block border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]
"
        />
        <div
          className="absolute -top-24 w-[900px] h-[900px] hidden lg:block xl:hidden
 rounded-full border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]"
        />
        <div
          className="absolute -top-10 w-[750px] h-[750px] rounded-full hidden md:block lg:hidden
 border-10 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2),inset_0_1px_10px_rgba(0,0,0,0.2)]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl  px-6 pt-32 pb-40">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground">
            <span className="h-px w-6 bg-muted-foreground/40" />
            {eyebrow}
            <span className="h-px w-6 bg-muted-foreground/40" />
          </span>

          <h1 className="mt-6 font-geist text-4xl sm:text-5xl font-medium text-foreground">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-20 max-w-5xl rounded-sm  bg-gray-200 p-3 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_10px_rgba(0,0,0,0.1)]"
        >
          <div className="grid place-items-center p-12 md:p-16 bg-white rounded-sm min-h-[260px] md:min-h-[300px]">
            {/* Text */}
            <div className="flex flex-col items-center text-center max-w-xl">
              <div>
                <h2 className="font-geist text-2xl font-medium text-foreground">
                  {cardTitle}
                </h2>

                <Tooltip
                  title={cardDescription}
                  arrow
                  placement="bottom"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                        maxWidth: 260,
                      },
                    },
                  }}
                >
                  <p
                    className="
      mt-4
      text-sm
      leading-relaxed
      text-muted-foreground
      line-clamp-3
      cursor-help
    "
                  >
                    {cardDescription}
                  </p>
                </Tooltip>
              </div>

              {ctaText && (
                <button className="mt-6 w-fit rounded-sm bg-foreground px-5 py-2 text-sm text-background hover:opacity-90 transition">
                  {ctaText}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
