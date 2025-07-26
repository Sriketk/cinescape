import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json();

    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }

    const {object} = await generateObject({
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
      system: `You are a movie recommendation expert. Based on the user's mood, recommend exactly 4 movies that would be perfect for how they're feeling. 

Return your response as a valid JSON object with this exact structure:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "year": "2023",
      "genre": "Drama/Comedy",
      "reason": "Brief explanation of why this movie fits their mood"
    }
  ]
}

Make sure to:
- Include a mix of different genres and time periods
- Provide thoughtful reasons that connect to their specific mood
- Choose well-known, accessible movies
- Keep reasons concise but meaningful (1-2 sentences)`,
      prompt: `The user is feeling: "${mood}". Please recommend 4 movies that would be perfect for this mood.`,
    });
    console.log(object);
    // Parse the AI response
    const recommendations = object.recommendations.map((movie) => ({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      reason: movie.reason,
    }));

    return NextResponse.json(object);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
