"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Sparkles, ArrowRight } from "lucide-react";

interface MovieRecommendation {
  title: string;
  year: string;
  genre: string;
  reason: string;
}

export default function MovieMoodApp() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    if (!mood.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: mood.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Cinescape
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
            Stop stalling. Find your next movie.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-2xl mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/50 via-orange-200/50 to-yellow-200/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50 transition-all duration-300 hover:shadow-3xl hover:bg-white/90">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Describe your current mood or feeling..."
                    className="bg-transparent border-none text-gray-900 placeholder:text-gray-400 text-lg h-14 focus-visible:ring-0 focus-visible:ring-offset-0 font-light"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && mood.trim() && !isLoading) {
                        getRecommendations();
                      }
                    }}
                  />
                </div>
                {mood.trim() && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white" />
                    )}
                  </button>
                )}
              </div>

              {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-gray-500">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-light">
                    Analyzing your mood...
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">
                Curated for You
              </h2>
              <p className="text-gray-600 font-light">
                Four films perfectly matched to your current state of mind
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((movie, index) => (
                <Card
                  key={index}
                  className="group bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Film className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                          {movie.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 font-medium">
                          {movie.year} • {movie.genre}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed font-light">
                          {movie.reason}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
