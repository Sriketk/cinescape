import { z } from "zod";

export type ModelType = "personalized" | "generic";

export const genreEnum = z.enum([
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "music",
  "mystery",
  "romance",
  "science_fiction",
  "tv_movie",
  "thriller",
  "war",
  "western",
]);

export const contentTypeEnum = z.enum(["movie", "tv"]);

export type Genre = z.infer<typeof genreEnum>;
export type ContentType = z.infer<typeof contentTypeEnum>;

export interface MovieRecommendation {
  title: string;
  year: string;
  genre: string;
  reason: string;
}

export interface RecommendationsResponse {
  recommendations: MovieRecommendation[];
}

export const movieRecommendationSchema = z.object({
  title: z.string(),
  year: z.string(),
  genre: z.string(),
  reason: z.string(),
});

export const recommendationsResponseSchema = z.object({
  recommendations: z.array(movieRecommendationSchema),
});

// Tool input parameters schema
export const movieRecommendationsInputSchema = z.object({
  username: z
    .string()
    .optional()
    .describe("The Letterboxd username to get recommendations for (optional, only needed for personalized recommendations)"),
  model_type: z
    .enum(["personalized", "generic"])
    .describe(
      "Whether to use personalized recommendations based on user history or generic recommendations"
    ),
  genres: z
    .array(genreEnum)
    .min(1)
    .max(5)
    .describe("Preferred genres for recommendations (1-5 genres)"),
  content_types: z
    .array(contentTypeEnum)
    .default(["movie"])
    .describe("Types of content to recommend"),
  min_release_year: z
    .number()
    .int()
    .min(1930)
    .max(2025)
    .default(1980)
    .describe("Minimum release year for recommendations"),
  max_release_year: z
    .number()
    .int()
    .min(1930)
    .max(2025)
    .default(2024)
    .describe("Maximum release year for recommendations"),
  min_runtime: z
    .number()
    .int()
    .min(0)
    .max(500)
    .default(60)
    .describe("Minimum runtime in minutes"),
  max_runtime: z
    .number()
    .int()
    .min(0)
    .max(1000)
    .default(180)
    .describe("Maximum runtime in minutes"),
  popularity: z
    .number()
    .min(0)
    .max(6)
    .default(3)
    .describe(
      "Popularity level (0 = very obscure, 6 = mainstream blockbusters)"
    ),
});

export type MovieRecommendationsInput = z.infer<
  typeof movieRecommendationsInputSchema
>;
