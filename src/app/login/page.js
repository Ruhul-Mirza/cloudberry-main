"use client";
import * as React from "react";
import { CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Send } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/images/cloud_berry.png";

const theme = extendTheme({ defaultColorScheme: "dark" });

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      size="sm"
      variant="outlined"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await loginUser({ email, password });
      router.push("/admin/review");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      {/* Premium Neutral Blobs */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-white/50 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-gray-400/20 rounded-full blur-[120px]" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-50 w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl rounded bg-gray-200 p-3 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_10px_rgba(0,0,0,0.1)]"
        >
          <div className="bg-white p-2 rounded">
            <Image
              src={logo}
              alt="logo"
              width={176}
              height={48}
              className="w-52 h-auto px-6 pt-4"
            />
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold tracking-wider uppercase mb-1.5"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="admin@email.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-bold tracking-wider uppercase mb-1.5"
                  >
                    Password<span className="text-red-500">*</span>
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="••••••••"
                  />
                </div>

                {/* Error */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Submit */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 rounded bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
