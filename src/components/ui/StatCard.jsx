"use client";
import { motion } from "framer-motion";

export default function StatCard({
  value,
  label,
  icon,
  image,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        animate-none
        lg:animate-bounce
        rounded-xl
        border
        bg-white
        p-4
        flex
        items-center
        gap-3
        shadow-sm
        ${className}
      `}
      style={{ 
        animationDuration: "3s",
      }}
    >
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center">
          {icon}
        </div>
      )}

      {image && (
        <img
          src={image}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
      )}

      <div>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
}