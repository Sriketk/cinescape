"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { MovieRecommendation } from "@/lib/types";

interface MovieCarouselProps {
  movies: MovieRecommendation[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getMovieAtPosition = (offset: number) => {
    const index = (currentIndex + offset + movies.length) % movies.length;
    return movies[index];
  };

  if (movies.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto   rounded-3xl">
      <div className="relative flex items-center justify-center  perspective-1000">
        {/* Left Film */}
        {movies.length > 1 && (
          <div
            className="absolute transform scale-75 opacity-60 transition-all duration-500 ease-in-out z-10"
            style={{ left: "200px" }}
          >
            <Card
              className="w-64 bg-slate-800/50 border-slate-700 cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={goToPrevious}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={getMovieAtPosition(-1).poster}
                    alt={`${getMovieAtPosition(-1).title} poster`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Center Film (Main) */}
        <div className="relative z-20 transform scale-100 transition-all duration-500 ease-in-out">
          <a
            href={`https://letterboxd.com${movies[currentIndex].url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="w-80 bg-slate-800 border-slate-600 shadow-2xl group cursor-pointer hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={movies[currentIndex].poster}
                    alt={`${movies[currentIndex].title} poster`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />

                  {/* Rating - Always visible */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium text-sm">
                      {movies[currentIndex].reason.match(
                        /(\d+\.\d+)\/5/
                      )?.[1] || "4.0"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Right Film */}
        {movies.length > 1 && (
          <div
            className="absolute transform scale-75 opacity-60 transition-all duration-500 ease-in-out z-10"
            style={{ left: "calc(50% + 10rem)" }}
          >
            <Card
              className="w-64 bg-slate-800/50 border-slate-700 cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={goToNext}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={getMovieAtPosition(1).poster}
                    alt={`${getMovieAtPosition(1).title} poster`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <Button
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 border-0 rounded-full w-12 h-12"
          style={{ left: "200px" }}
          size="icon"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Button>

        <Button
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 border-0 rounded-full w-12 h-12"
          style={{ left: "calc(50% + 22rem)" }}
          size="icon"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}
