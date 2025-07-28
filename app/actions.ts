"use server";

import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  type MovieRecommendation,
  type RecommendationsResponse,
  type ApiRecommendationsResponse,
  movieRecommendationsInputSchema,
} from "@/lib/types";

// Define the movie recommendations tool
const movieRecommendationsTool = tool({
  description:
    "Get personalized movie recommendations based on user's mood, preferences, and Letterboxd profile",
  parameters: movieRecommendationsInputSchema,
  execute: async ({
    username,
    model_type,
    genres,
    content_types,
    min_release_year,
    max_release_year,
    min_runtime,
    max_runtime,
    popularity,
  }) => {
    // Your actual recommendation logic here
    // This is a placeholder - replace with your real API call
    console.log("Getting recommendations for:", {
      username: username || "generic_user",
      model_type,
      genres,
      content_types,
      min_release_year,
      max_release_year,
      min_runtime,
      max_runtime,
      popularity,
    });

    const response = await fetch("http://localhost:4000/api/get-recommendations", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentQuery: {
          usernames: username ? [username] : ["sriketk"], // Convert single username to array
          model_type,
          genres,
          content_types,
          min_release_year,
          max_release_year,
          min_runtime,
          max_runtime,
          popularity,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const apiResult: ApiRecommendationsResponse = await response.json();
    console.log("API Response:", apiResult);
    
    // Transform API response to match frontend expectations
    const transformedRecommendations: MovieRecommendation[] = apiResult.map((movie, index) => ({
      title: movie.title,
      year: movie.release_year.toString(), // Convert number to string
      genre: genres[index % genres.length] || "drama", // Use provided genres cyclically
      reason: `Predicted rating: ${movie.predicted_rating}/5. This ${genres[index % genres.length] || "film"} from ${movie.release_year} should be a great match for your current mood.`,
      poster: movie.poster,
      url: movie.url,
    }));

    return {
      recommendations: transformedRecommendations,
    };
  },
});

// Main function that uses the tool
export async function getMovieRecommendations(mood: string) {
  if (!mood) {
    throw new Error("Mood is required");
  }

  try {
    const { text, steps } = await generateText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      tools: {
        movie_recommendations: movieRecommendationsTool,
      },
      system: `You are a movie recommendation expert. Based on the user's mood, analyze their preferences and call the movie_recommendations tool with appropriate parameters. 
      
      Guidelines:
      - Use "personalized" model_type by default (which will use username "sriketk")
      - If user mentions a different Letterboxd username, use that username instead
      - If user specifically asks for generic recommendations, use "generic" model_type
      - Infer genres from the mood (e.g., "sad" → drama, "excited" → action/adventure), you can pick multiple genres but be careful not to pick too many and only when it makes sense
      - Adjust popularity based on mood (contemplative → lower popularity, energetic → higher)
      - Set reasonable year ranges based on context
      
      After getting recommendations, present them in a friendly, personalized way.`,
      prompt: `The user is feeling: "${mood}". Please get movie recommendations that would be perfect for this mood and present them nicely.`,
      maxSteps: 2,
    });

    // Extract recommendations from tool results
    console.log("SRIKETTTT");
    console.log(steps);
    const toolResults = steps.flatMap((step) => step.toolResults);
    console.log("TOOL RESULTS");
    console.log(toolResults);
    console.log("FIELDS");
    console.log(toolResults[0]?.args?.genres);
    console.log(toolResults[0]?.args?.content_types);
    console.log(toolResults[0]?.args?.genres);

    const firstResult = toolResults[0]?.result as
      | RecommendationsResponse
      | undefined;
    const recommendations = firstResult?.recommendations || [];

    return { recommendations };
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate recommendations");
  }
}
