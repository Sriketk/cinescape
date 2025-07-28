"use server";

import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  type MovieRecommendation,
  type RecommendationsResponse,
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

    // Simulate API response for now
    return {
      recommendations: [
        {
          title: "The Shawshank Redemption",
          year: "1994",
          genre: "drama",
          reason:
            "A perfect match for your contemplative mood with its themes of hope and perseverance.",
        },
        {
          title: "Spirited Away",
          year: "2001",
          genre: "animation",
          reason:
            "This magical adventure will lift your spirits with its beautiful storytelling.",
        },
        {
          title: "The Grand Budapest Hotel",
          year: "2014",
          genre: "comedy",
          reason:
            "Wes Anderson's whimsical style and humor perfectly match your current mood.",
        },
        {
          title: "Blade Runner 2049",
          year: "2017",
          genre: "science_fiction",
          reason:
            "A visually stunning sci-fi that will transport you to another world.",
        },
      ],
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
      model: openai("gpt-4o"),
      tools: {
        movie_recommendations: movieRecommendationsTool,
      },
      system: `You are a movie recommendation expert. Based on the user's mood, analyze their preferences and call the movie_recommendations tool with appropriate parameters. 
      
      Guidelines:
      - Use "generic" model_type and don't provide a username unless user specifically mentions their Letterboxd username
      - If user mentions their Letterboxd username, use "personalized" model_type and include the username
      - Infer genres from the mood (e.g., "sad" → drama, "excited" → action/adventure)
      - Adjust popularity based on mood (contemplative → lower popularity, energetic → higher)
      - Set reasonable year ranges based on context
      
      After getting recommendations, present them in a friendly, personalized way.`,
      prompt: `The user is feeling: "${mood}". Please get movie recommendations that would be perfect for this mood and present them nicely.`,
      maxSteps: 2,
    });

    // Extract recommendations from tool results
    console.log("SRIKETTTT")
    console.log(steps);
    const toolResults = steps.flatMap((step) => step.toolResults);
    console.log("TOOL RESULTS")
    console.log(toolResults);
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
