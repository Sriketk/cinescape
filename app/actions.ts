"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function getMovieRecommendations(mood: string) {
  if (!mood) {
    throw new Error("Mood is required");
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schemaName: "movie",
      schemaDescription: "A movie recommendation",
      schema: z.object({
        recommendations: z.array(
          z.object({
            title: z.string(),
            year: z.string(),
            genre: z.string(),
            reason: z.string(),
          })
        ),
      }),
      system: `You are a movie recommendation expert. Based on the user's mood, recommend exactly 4 movies that would be perfect for how they're feeling. `,
      prompt: `The user is feeling: "${mood}". Please recommend 4 movies that would be perfect for this mood.`,
    });
    
    console.log(object);
    return object;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate recommendations");
  }
} 