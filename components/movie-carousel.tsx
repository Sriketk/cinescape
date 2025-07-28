"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="w-full max-w-7xl mx-auto p-6 min-h-screen rounded-3xl">
      <div className="relative flex items-center justify-center h-[600px] perspective-1000">
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
          <Card className="w-80 bg-slate-800 border-slate-600 shadow-2xl group">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={movies[currentIndex].poster}
                  alt={`${movies[currentIndex].title} poster`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />

                {/* Film Info Overlay - Only visible on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-amber-600 hover:bg-amber-700 capitalize">
                      {movies[currentIndex].genre}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-medium">
                        {movies[currentIndex].reason.match(
                          /(\d+\.\d+)\/5/
                        )?.[1] || "4.0"}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {movies[currentIndex].title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-2">
                    {movies[currentIndex].year}
                  </p>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {movies[currentIndex].reason}
                  </p>

                  <div className="mt-4">
                    <a
                      href={`https://letterboxd.com${movies[currentIndex].url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      View on Letterboxd
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
