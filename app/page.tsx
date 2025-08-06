"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { X, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { getMovieRecommendations } from "./actions";
import type { MovieRecommendation } from "@/lib/types";
import { Carousel } from "@/components/ui/mv-carouser";
import Image from "next/image";
import { PromptBox } from "@/components/ui/chat-prompt-input";
import { BorderBeam } from "@/components/ui/border-beam";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { useMovieTheme } from "@/components/movie-theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MovieMoodApp() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLetterboxdHovered, setIsLetterboxdHovered] = useState(false);
  const [isLetterboxdExpanded, setIsLetterboxdExpanded] = useState(false);
  const [letterboxdUsername, setLetterboxdUsername] = useState("");
  const [currentMobileMovie, setCurrentMobileMovie] = useState(0);

  const { currentTheme } = useMovieTheme();
  const isMobile = useIsMobile();

  const slides = useMemo(() => {
    return recommendations.map((movie) => ({
      title: movie.title,
      button: "View on Letterboxd",
      src: movie.poster,
      url: `https://letterboxd.com${movie.url}`,
    }));
  }, [recommendations]);

  const getRecommendations = async () => {
    if (!mood.trim()) return;

    setIsLoading(true);
    if (!hasSearched) {
      setHasSearched(true);
    }

    try {
      const data = await getMovieRecommendations(
        mood.trim(),
        letterboxdUsername
      );
      setRecommendations(data.recommendations);
      setCurrentMobileMovie(0); // Reset to first movie
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

  const handleLetterboxdSubmit = () => {
    if (letterboxdUsername.trim()) {
      // Here you can add logic to use the Letterboxd username
      console.log("Letterboxd username:", letterboxdUsername.trim());
      setIsLetterboxdHovered(false);
      setIsLetterboxdExpanded(false);
      setLetterboxdUsername("");
    }
  };

  const nextMobileMovie = () => {
    setCurrentMobileMovie((prev) =>
      prev === recommendations.length - 1 ? 0 : prev + 1
    );
  };

  const prevMobileMovie = () => {
    setCurrentMobileMovie((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1
    );
  };

  return (
    <div
      className={`${
        isMobile ? "h-screen overflow-hidden" : "min-h-screen"
      } relative overflow-hidden theme-transition ${
        currentTheme.backgroundGradient.cssClass
      }`}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--theme-glow-color,rgba(251,191,36,0.1)),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--theme-glow-from,rgba(251,191,36,0.2))] to-[var(--theme-glow-to,rgba(249,115,22,0.2))] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[var(--theme-glow-secondary,rgba(253,224,71,0.2))] to-[var(--theme-glow-from,rgba(251,191,36,0.2))] rounded-full blur-3xl" />

      {/* Desktop Theme Selector and GitHub - Outside layout container */}
      {!isMobile && (
        <div className="fixed top-4 right-4 z-20 flex items-center gap-2">
          <ThemeSelector />
          <a
            href="https://github.com/Sriketk/cinescape"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-2 py-2 bg-stone-700 backdrop-blur-sm rounded-lg border border-white/20 text-white transition-colors hover:scale-105 h-8 w-8"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      )}

      <motion.div
        className={`relative z-10 flex ${
          isMobile ? "h-full" : "min-h-screen"
        } flex-col`}
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className={`${
            isMobile ? "pt-8 pb-0 px-2 flex-shrink-0" : "p-2 md:p-8"
          } flex flex-col items-center ${
            hasSearched && !isMobile
              ? ""
              : isMobile
              ? ""
              : "flex-grow justify-center"
          }`}
          layout={!isMobile}
          transition={
            isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
          }
        >
          {/* Header */}
          <motion.div
            className={`text-center ${
              hasSearched && !isMobile ? "mb-6 md:mb-8" : "mb-4 md:mb-12"
            } w-full flex flex-col items-center px-2 md:px-4`}
            layout={!isMobile}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
            }
          >
            {isMobile ? (
              // Mobile: Theme selector and GitHub on same line, then title
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                  <ThemeSelector />
                  <a
                    href="https://github.com/Sriketk/cinescape"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-2 py-2 bg-stone-700 hover:bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 text-white transition-colors h-8 w-8 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <motion.h1
                  className="p-1 md:p-2 text-3xl md:text-5xl font-bold text-foreground transition-colors duration-300"
                  layout={!isMobile}
                  transition={
                    isMobile
                      ? { duration: 0 }
                      : { duration: 0.8, ease: "easeInOut" }
                  }
                >
                  Cinescape
                </motion.h1>
              </div>
            ) : (
              // Desktop: Just the title
              <motion.h1
                className="p-1 md:p-2 text-3xl md:text-5xl font-bold text-foreground transition-colors duration-300"
                layout={!isMobile}
                transition={
                  isMobile
                    ? { duration: 0 }
                    : { duration: 0.8, ease: "easeInOut" }
                }
              >
                Cinescape
              </motion.h1>
            )}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed mt-2 md:mt-6 text-center mx-auto px-2 md:px-4 transition-colors duration-300"
              style={{ overflow: "hidden" }}
              variants={{
                visible: {
                  opacity: 1,
                  height: "auto",
                  y: 0,
                  marginTop: "0.5rem",
                },
                hidden: { opacity: 0, height: 0, y: -20, marginTop: 0 },
              }}
              initial="visible"
              animate={hasSearched && !isMobile ? "hidden" : "visible"}
              transition={
                isMobile
                  ? { duration: 0 }
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              Stop stalling. Find your next movie.
            </motion.p>
          </motion.div>

          {/* Letterboxd Integration */}
          <motion.div
            className={`w-full flex justify-center px-2 md:px-4 ${
              hasSearched && !isMobile
                ? "mb-4 md:mb-6"
                : isMobile
                ? "mb-2"
                : "mb-4 md:mb-8"
            }`}
            layout={!isMobile}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
            }
          >
            <motion.div
              initial={{ width: 56, height: 56 }}
              animate={{
                width:
                  isLetterboxdHovered || isLetterboxdExpanded || isMobile
                    ? 240
                    : 56,
              }}
              onHoverStart={() => !isMobile && setIsLetterboxdHovered(true)}
              onHoverEnd={() => !isMobile && setIsLetterboxdHovered(false)}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center overflow-hidden relative cursor-pointer"
              onClick={() =>
                !isMobile && setIsLetterboxdExpanded(!isLetterboxdExpanded)
              }
            >
              {/* Letterboxd Logo - Always visible */}
              <motion.div
                className="absolute left-4"
                animate={{
                  opacity:
                    isLetterboxdHovered || isLetterboxdExpanded || isMobile
                      ? 0
                      : 1,
                  scale:
                    isLetterboxdHovered || isLetterboxdExpanded || isMobile
                      ? 0.8
                      : 1,
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

              {/* Username Input - Visible on hover/click */}
              <motion.div
                className="w-full flex items-center gap-3 px-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    isLetterboxdHovered || isLetterboxdExpanded || isMobile
                      ? 1
                      : 0,
                }}
                transition={{
                  duration: 0.2,
                  delay:
                    isLetterboxdHovered || isLetterboxdExpanded || isMobile
                      ? 0.1
                      : 0,
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
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
                <div className="flex-1">
                  <Input
                    value={letterboxdUsername}
                    onChange={(e) => setLetterboxdUsername(e.target.value)}
                    placeholder="username"
                    autoComplete="off"
                    name="letterboxd-username"
                    id="letterboxd-username"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLetterboxdSubmit();
                      }
                      if (e.key === "Escape") {
                        setIsLetterboxdHovered(false);
                        setIsLetterboxdExpanded(false);
                        setLetterboxdUsername("");
                      }
                    }}
                    className="w-full h-8 bg-transparent border-none text-sm text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-center"
                  />
                </div>
                {!isMobile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent click
                      setIsLetterboxdHovered(false);
                      setIsLetterboxdExpanded(false);
                      setLetterboxdUsername("");
                    }}
                    className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Input Section */}
          <motion.div
            className={`w-full px-2 md:px-4 max-w-2xl ${
              hasSearched && !isMobile
                ? "mb-6 md:mb-8"
                : isMobile
                ? "mb-2"
                : "mb-4 md:mb-12"
            } flex justify-center`}
            layout={!isMobile}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }
            }
          >
            <form onSubmit={handleSubmit} className="relative group w-full">
              {/* Main container with PromptBox */}
              <motion.div
                className="relative rounded-2xl md:rounded-[28px]"
                layout={!isMobile}
                transition={
                  isMobile
                    ? { duration: 0 }
                    : { duration: 0.8, ease: "easeInOut" }
                }
              >
                {isLoading && (
                  <BorderBeam
                    duration={2}
                    colorFrom={
                      currentTheme.effects?.borderBeamColors?.from || "#f59e0b"
                    }
                    colorTo={
                      currentTheme.effects?.borderBeamColors?.to || "#f97316"
                    }
                  />
                )}
                <PromptBox
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="What do you feel like watching?"
                  disabled={isLoading}
                  loading={isLoading}
                  className="bg-white border shadow-lg md:shadow-2xl transition-colors text-sm md:text-base [&_textarea]:text-sm [&_textarea]:md:text-base [&_textarea]:font-light [&_textarea]:text-center [&_textarea]:placeholder:text-center [&_textarea]:placeholder:font-normal [&_textarea]:h-10 [&_textarea]:md:h-12 [&_textarea]:min-h-[2.5rem] [&_textarea]:md:min-h-[3rem]"
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      mood.trim() &&
                      !isLoading
                    ) {
                      e.preventDefault();
                      getRecommendations();
                    }
                  }}
                />
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              className={`w-full ${isMobile ? "flex-1 min-h-0" : ""}`}
              initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0 } : { opacity: 0, y: 50 }}
              transition={
                isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.2 }
              }
            >
              {isMobile ? (
                // Mobile: Custom simplified carousel without extra spacing
                <div className="h-full flex items-center justify-center overflow-hidden relative">
                  {/* Previous button */}
                  <button
                    onClick={prevMobileMovie}
                    className="absolute left-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Movie display */}
                  <div className="w-full max-w-[250px]">
                    <div className="aspect-[2/3] relative rounded-2xl overflow-hidden bg-gray-100 mx-auto">
                      {recommendations[currentMobileMovie] && (
                        <a
                          href={`https://letterboxd.com${recommendations[currentMobileMovie].url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={recommendations[currentMobileMovie].poster}
                            alt={recommendations[currentMobileMovie].title}
                            fill
                            className="object-cover"
                          />
                        </a>
                      )}
                    </div>
                    {/* Dots indicator */}
                    <div className="flex justify-center mt-3 space-x-2">
                      {recommendations.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMobileMovie(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentMobileMovie
                              ? "bg-foreground"
                              : "bg-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={nextMobileMovie}
                    className="absolute right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // Desktop: Original carousel
                <Carousel slides={slides} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
