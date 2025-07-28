"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, User, X } from "lucide-react";
import { getMovieRecommendations } from "./actions";
import type { MovieRecommendation } from "@/lib/types";
import { Carousel } from "@/components/ui/mv-carouser";
import Image from "next/image";

export default function MovieMoodApp() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLetterboxdHovered, setIsLetterboxdHovered] = useState(false);
  const [letterboxdUsername, setLetterboxdUsername] = useState("");

  const getRecommendations = async () => {
    if (!mood.trim()) return;

    setIsLoading(true);
    if (!hasSearched) {
      setHasSearched(true);
    }

    try {
      const data = await getMovieRecommendations(mood.trim(), letterboxdUsername);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRecommendations();
  };

  const handleLetterboxdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (letterboxdUsername.trim()) {
      // Here you can add logic to use the Letterboxd username
      console.log("Letterboxd username:", letterboxdUsername.trim());
      setIsLetterboxdHovered(false);
      setLetterboxdUsername("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10"
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className={`p-8 ${
            hasSearched
              ? "flex flex-col items-center"
              : "min-h-screen flex flex-col items-center justify-center"
          }`}
          layout
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Header */}
          <motion.div
            className={`text-center ${hasSearched ? "mb-8" : "mb-12"} w-full flex flex-col items-center`}
            layout
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h1
              className="p-2 text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              layout
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Cinescape
            </motion.h1>
            <AnimatePresence mode="wait">
              {!hasSearched && (
                <motion.p
                  className="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed mt-6 text-center mx-auto"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Stop stalling. Find your next movie.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Letterboxd Integration */}
          <motion.div
            className={`w-full flex justify-center ${hasSearched ? "mb-6" : "mb-8"}`}
            layout
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ width: 56, height: 56 }}
              whileHover={{ width: 240 }}
              onHoverStart={() => setIsLetterboxdHovered(true)}
              onHoverEnd={() => setIsLetterboxdHovered(false)}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center overflow-hidden relative"
            >
              {/* Letterboxd Logo - Always visible */}
              <motion.div
                className="absolute left-4"
                animate={{
                  opacity: isLetterboxdHovered ? 0 : 1,
                  scale: isLetterboxdHovered ? 0.8 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/letterboxd-mac-icon.png"
                  alt="Letterboxd"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </motion.div>

              {/* Username Input - Visible on hover */}
              <motion.div
                className="w-full flex items-center gap-3 px-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLetterboxdHovered ? 1 : 0 }}
                transition={{
                  duration: 0.2,
                  delay: isLetterboxdHovered ? 0.1 : 0,
                }}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/letterboxd-mac-icon.png"
                    alt="Letterboxd"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <form onSubmit={handleLetterboxdSubmit} className="flex-1">
                  <Input
                    value={letterboxdUsername}
                    onChange={(e) => setLetterboxdUsername(e.target.value)}
                    placeholder="username"
                    className="w-full h-8 bg-transparent border-none text-sm text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-center"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsLetterboxdHovered(false);
                        setLetterboxdUsername("");
                      }
                    }}
                  />
                </form>
                <button
                  type="button"
                  onClick={() => {
                    setIsLetterboxdHovered(false);
                    setLetterboxdUsername("");
                  }}
                  className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Input Section */}
          <motion.div
            className={`w-full ${hasSearched ? "max-w-4xl" : "max-w-2xl"} ${
              hasSearched ? "mb-8" : "mb-12"
            } flex justify-center`}
            layout
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <form onSubmit={handleSubmit} className="relative group w-full">
              {/* Enhanced outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/40 via-orange-300/40 to-yellow-300/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-orange-200/20 to-yellow-200/20 rounded-3xl blur-xl opacity-30 group-focus-within:opacity-60 transition-opacity duration-500" />

              {/* Main container with warm tint */}
              <motion.div
                className="relative bg-gradient-to-br from-white/90 via-amber-50/80 to-orange-50/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-amber-200/30 transition-all duration-300 hover:shadow-3xl hover:border-amber-300/50 focus-within:border-orange-300/60 focus-within:bg-gradient-to-br focus-within:from-white/95 focus-within:via-amber-50/90 focus-within:to-orange-50/80"
                layout
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      placeholder="Describe your current mood or feeling..."
                      className="bg-transparent border-none text-gray-800  placeholder:text-gray-500/70 text-2xl h-14 focus-visible:ring-0 focus-visible:ring-offset-0 font-light placeholder:font-normal text-center placeholder:text-center"
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && mood.trim() && !isLoading) {
                          getRecommendations();
                        }
                      }}
                    />
                  </div>
                  {mood.trim() && (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-12 h-12 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:from-amber-700 hover:via-orange-700 hover:to-yellow-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ring-1 ring-amber-300/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-white" />
                      )}
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-gray-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-light">
                        Analyzing your mood...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Carousel 
                slides={recommendations.map(movie => ({
                  title: movie.title,
                  button: "View on Letterboxd",
                  src: movie.poster,
                  url: `https://letterboxd.com${movie.url}`
                }))} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
