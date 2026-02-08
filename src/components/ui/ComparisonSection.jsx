"use client";

import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./button";
import Link from "next/link";

const otherItems = [
  "Slow, unclear timelines",
  "Extra charges for changes",
  "No clear process",
  "Designs break in dev",
  "Complex, hard builds",
];

const ourItems = [
  "Clear weekly updates",
  "Transparent pricing",
  "Documented workflow",
  "Design–dev alignment",
  "Clean, scalable builds",
];

function activeStyles() {
  return {
    headerBg: "bg-[#262525]",
    headerText: "text-background",
    bodyBg: "bg-[#262525]",
    bodyText: "text-white",
    rowBorder: "border-background/20",
    icon: "text-background/60",
  };
}

function inactiveStyles() {
  return {
    headerBg: "bg-gray-200",
    headerText: "text-foreground",
    bodyBg: "bg-gray-200",
    bodyText: "text-foreground/80",
    rowBorder: "border-border/60",
    icon: "text-foreground/40",
  };
}

export default function ComparisonSection() {
  const [showOurs, setShowOurs] = useState(true);

  // LEFT is ALWAYS inactive
  const left = useMemo(() => inactiveStyles(), []);

  // RIGHT is active only when toggle ON
  const right = useMemo(
    () => (showOurs ? activeStyles() : inactiveStyles()),
    [showOurs],
  );

  return (
    <section className="flex min-h-screen flex-col bg-gray-100 items-center justify-center px-6 py-20">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl leading-snug tracking-tight md:text-4xl">
          We know choosing the right academy
          <br />
          is hard because few{" "}
          <em className="font-bold not-italic underline decoration-foreground decoration-2 underline-offset-4">
            truly deliver
          </em>
          .
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
          So we made it simple{" "}
          <span className={`font-bold ${showOurs ? "text-foreground" : ""}`}>
            to compare
          </span>{" "}
          how we work{" "}
          <button
            type="button"
            onClick={() => setShowOurs((v) => !v)}
            className="inline-flex translate-y-1 items-center"
          >
            <span
              className={`relative inline-block h-6 w-11 rounded-full transition-all duration-500 ease-in-out ${
                showOurs ? "bg-foreground" : "bg-muted-foreground/40"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-background transition-all duration-300 ${
                  showOurs ? "left-6" : "left-1"
                }`}
              />
            </span>
          </button>{" "}
          versus what you usually get{" "}
          <span className={`font-bold ${!showOurs ? "" : "text-foreground"}`}>
            in the market
          </span>
          .
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="relative mt-16 w-full max-w-2xl">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* LEFT CARD (never black) */}
          <div
            className="
  flex flex-col border overflow-hidden
  rounded-t-sm
  md:rounded-tl-sm md:rounded-bl-sm
  md:rounded-tr-none md:rounded-br-none
"
          >
            <div
              className={`border-b border-dashed border-gray-500 px-6 py-5 bg-white`}
            >
              <h3 className={`text-lg font-medium ${left.headerText}`}>
                Other Academy
              </h3>
            </div>

            <div className="bg-white">
              {otherItems.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 px-6 py-4 text-md ${
                    left.bodyText
                  } ${
                    i !== otherItems.length - 1
                      ? `border-b border-dashed border-gray-500`
                      : ""
                  }`}
                >
                  <ChevronRight className={`h-3 w-3 ${left.icon}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD (black only when ON) */}
          <div className="relative md:-my-6 z-10">
            <div
              className={`flex flex-col md:py-[25px] rounded-b-sm md:rounded-sm overflow-hidden transition-all duration-500 ease-in-out ${right.bodyBg}`}
            >
              <div
                className={`border-b border-dashed border-gray-500 px-6 py-5  transition-all duration-500 ease-in-out ${right.headerBg}`}
              >
                <h3 className={`text-lg font-semibold ${right.headerText}`}>
                  Our Academy
                </h3>
              </div>

              <div>
                {ourItems.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 px-6 py-4 text-md font-semibold  transition-all duration-500 ease-in-out ${
                      right.bodyText
                    } ${
                      i !== ourItems.length - 1
                        ? `border-b border-dashed border-gray-500`
                        : ""
                    }`}
                  >
                    <ChevronRight className={`h-3 w-3 ${right.icon}`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-center">
          <Link href="#">
            <Button variant="outline" className="w-full sm:w-auto p-5">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
