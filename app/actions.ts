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
// const movieRecommendationsTool = tool({
//   description:
//     "Get personalized movie recommendations based on user's mood, preferences, and Letterboxd profile",
//   parameters: movieRecommendationsInputSchema,
//   execute: async ({
//     model_type,
//     genres,
//     content_types,
//     min_release_year,
//     max_release_year,
//     min_runtime,
//     max_runtime,
//     popularity,
//   }) => {
//     // Your actual recommendation logic here
//     // This is a placeholder - replace with your real API call
//     console.log("Getting recommendations for:", {
//       model_type,
//       genres,
//       content_types,
//       min_release_year,
//       max_release_year,
//       min_runtime,
//       max_runtime,
//       popularity,
//     });

//     const response = await fetch(
//       "http://localhost:4000/api/get-recommendations",
//       {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           currentQuery: {
//             letterboxd_username,
//             model_type,
//             genres,
//             content_types,
//             min_release_year,
//             max_release_year,
//             min_runtime,
//             max_runtime,
//             popularity,
//           },
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(
//         `API request failed: ${response.status} ${response.statusText}`
//       );
//     }

//     const apiResult: ApiRecommendationsResponse = await response.json();
//     console.log("API Response:", apiResult);

//     // Transform API response to match frontend expectations
//     const transformedRecommendations: MovieRecommendation[] = apiResult.map(
//       (movie, index) => ({
//         title: movie.title,
//         year: movie.release_year.toString(), // Convert number to string
//         genre: genres[index % genres.length] || "drama", // Use provided genres cyclically
//         reason: `Predicted rating: ${movie.predicted_rating}/5. This ${
//           genres[index % genres.length] || "film"
//         } from ${
//           movie.release_year
//         } should be a great match for your current mood.`,
//         poster: movie.poster,
//         url: movie.url,
//       })
//     );

//     return {
//       recommendations: transformedRecommendations,
//     };
//   },
// }); 

// Main function that uses the tool
export async function getMovieRecommendations(
  mood: string,
  letterboxd_username: string = ""
) {
  if (!mood) {
    throw new Error("Mood is required");
  }

  try {
    const { text, steps } = await generateText({
      model: openai("gpt-4o-mini"),
      tools: {
        movie_recommendations: tool({
          description:
            "Get personalized movie recommendations based on user's mood, preferences, and Letterboxd profile",
          parameters: movieRecommendationsInputSchema,
          execute: async ({
            genres,
            content_types,
            min_release_year,
            max_release_year,
            min_runtime,
            max_runtime,
            popularity,
          }) => {
            // Ensure genres is always provided (required field)
            const finalGenres = genres && genres.length > 0 ? genres : ["drama"];
            // Ensure content_types has a default
            const finalContentTypes = content_types && content_types.length > 0 ? content_types : ["movie"];
            
            // Ensure year range is reasonable (at least 5 years span)
            let finalMinYear = min_release_year || 1980;
            let finalMaxYear = max_release_year || 2024;
            if (finalMaxYear - finalMinYear < 5) {
              // If range is too narrow, expand it
              const midYear = Math.floor((finalMinYear + finalMaxYear) / 2);
              finalMinYear = Math.max(1980, midYear - 10);
              finalMaxYear = Math.min(2024, midYear + 10);
            }

            const makeRequest = async (retryWithBroaderFilters = false) => {
              let requestGenres = finalGenres;
              let requestMinYear = finalMinYear;
              let requestMaxYear = finalMaxYear;
              let requestPopularity = popularity || 3;

              // If retrying, broaden the filters
              if (retryWithBroaderFilters) {
                requestMinYear = 1980;
                requestMaxYear = 2024;
                requestPopularity = 3; // Medium popularity for broader results
              }

              const requestBody = {
                currentQuery: {
                  usernames: letterboxd_username
                    ? [letterboxd_username]
                    : ["sriketk"],
                  model_type: "personalized",
                  genres: requestGenres,
                  content_types: finalContentTypes,
                  min_release_year: requestMinYear,
                  max_release_year: requestMaxYear,
                  min_runtime: min_runtime || 60,
                  max_runtime: max_runtime || 130,
                  popularity: requestPopularity,
                },
              };

              console.log("API Request Body:", JSON.stringify(requestBody, null, 2));

              const response = await fetch(
                "https://letterboxd-movie-recommendations-l19a.onrender.com/api/get-recommendations",
                {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                }
              );

              if (!response.ok) {
                // Try to get the error message from the response body
                let errorMessage = `${response.status} ${response.statusText}`;
                try {
                  const errorBody = await response.text();
                  console.error("API Error Response:", errorBody);
                  if (errorBody) {
                    try {
                      const parsedError = JSON.parse(errorBody);
                      errorMessage = parsedError.message || parsedError.error || errorMessage;
                    } catch {
                      // If not JSON, use the raw text
                      errorMessage = errorBody || errorMessage;
                    }
                  }
                } catch (e) {
                  console.error("Error reading API error response:", e);
                }
                
                // If "No movies fit" error and we haven't retried yet, retry with broader filters
                if (
                  !retryWithBroaderFilters &&
                  errorMessage.includes("No movies fit")
                ) {
                  console.log("No movies found with current filters, retrying with broader filters...");
                  return makeRequest(true);
                }
                
                throw new Error(`API request failed: ${errorMessage}`);
              }

              return response;
            };

            const response = await makeRequest();

            const apiResult: ApiRecommendationsResponse = await response.json();
            console.log("API Response:", apiResult);

            // Transform API response to match frontend expectations
            const transformedRecommendations: MovieRecommendation[] =
              apiResult.map((movie, index) => ({
                title: movie.title,
                year: movie.release_year.toString(), // Convert number to string
                genre: finalGenres[index % finalGenres.length] || "drama", // Use provided genres cyclically
                reason: `Predicted rating: ${movie.predicted_rating}/5. This ${
                  finalGenres[index % finalGenres.length] || "film"
                } from ${
                  movie.release_year
                } should be a great match for your current mood.`,
                poster: movie.poster,
                url: movie.url,
              }));

            return {
              recommendations: transformedRecommendations,
            };
          },
        }),
      },
      system: `You are a movie recommendation expert. Based on the user's mood, analyze their preferences and call the movie_recommendations tool with appropriate parameters. 
      
      CRITICAL REQUIREMENTS:
      - You MUST always provide the "genres" parameter (at least 1 genre, up to 5). This is REQUIRED.
      - Infer genres from the mood (e.g., "sad" → ["drama"], "excited" → ["action", "adventure"], "romantic" → ["romance", "drama"])
      - Always set a reasonable year range with at least 10-15 years span (e.g., 2010-2024, not 2020-2020)
      - If user specifically asks for generic recommendations, use "generic" model_type
      - Adjust popularity based on mood (contemplative → lower popularity 1-2, energetic → higher 4-5)
      - Default to medium popularity (3) if unsure
      
      After getting recommendations, present them in a friendly, personalized way.`,
      prompt: `The user is feeling: "${mood}". Please get movie recommendations that would be perfect for this mood and present them nicely.`,
      maxSteps: 2,
    });

    // Extract recommendations from tool results
    const toolResults = steps.flatMap((step) => step.toolResults);

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
