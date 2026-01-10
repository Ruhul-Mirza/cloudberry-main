import React from "react";

export default function Features() {
  const row1 = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
      title: "Integrations",
      desc: "Connect seamlessly with modern tools to streamline workflows and create smart automation.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
      title: "Multiday Booking",
      desc: "Simplify multi-day sessions with a dynamic scheduling system built for professionals.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
      title: "Automatic Timezone Detection",
      desc: "Eliminate confusion — intelligent timezone syncing ensures global teams stay aligned.",
    },
  ];

  const row2 = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/2089/2089632.png",
      title: "Automated Reminders",
      desc: "Smart notifications and email triggers ensure you never miss an important session again.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      title: "Add Team Members",
      desc: "Collaborate efficiently with teammates using powerful permission-based management tools.",
    },
  ];

  const row3 = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/1524/1524855.png",
      title: "Group Sessions",
      desc: "Host live group training, code reviews, or bootcamps with multi-attendee features.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      title: "Custom Duration",
      desc: "Flexible session duration — tailor your schedule exactly as your projects demand.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/4762/4762314.png",
      title: "Block Any Date",
      desc: "Take control of your availability — block dates instantly with one click.",
    },
  ];

  return (
    <section className="relative text-black py-28 overflow-hidden">
      {/* Elegant light glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Label */}
        <div className="inline-block bg-gray-100 text-gray-800 text-sm px-4 py-1.5 rounded-full border border-gray-200 mb-5 font-medium tracking-wide shadow-sm">
          Why Choose Us
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-zinc-900">
          Built for <span className="text-zinc-600">Innovators</span> — Trusted by{" "}
          <span className="text-black">Professionals</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-20 text-base leading-relaxed">
          Experience a world-class IT ecosystem designed for developers, creators, and
          professionals who want to master real technology — fast, smart, and efficiently.
        </p>

        {/* === Row 1: Three Equal Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {row1.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>

        {/* === Row 2: Two Centered Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-14">
          {row2.map((item, i) => (
            <div key={i} className="md:col-span-3">
              <Card {...item} />
            </div>
          ))}
        </div>

        {/* === Row 3: Three Equal Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {row3.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Card Component */
function Card({ img, title, desc }) {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-1">
      {/* Soft hover gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-[1.03] transition-transform duration-500 shadow-inner">
          <img src={img} alt={title} className="h-20 object-contain opacity-90" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-[90%] mx-auto">
          {desc}
        </p>
      </div>
    </div>
  );
}
