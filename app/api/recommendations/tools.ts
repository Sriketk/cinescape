import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  year: z.string(),
  genre: z.string(),
  reason: z.string(),
});

// Define predefined genres
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

// Define predefined content types
export const contentTypeEnum = z.enum(["movie", "tv"]);

export const currentQuerySchema = z.object({
  usernames: z.array(z.string()),
  model_type: z.string(),
  genres: z.array(genreEnum),
  content_types: z.array(contentTypeEnum),
  min_release_year: z.number().min(1920).max(2025),
  max_release_year: z.number().min(1920).max(2025),
  min_runtime: z.number().min(0).max(500),
  max_runtime: z.number().min(0).max(1000),
  popularity: z.number().min(0).max(6),
});

export const apiCallSchema = z.object({
  currentQuery: currentQuerySchema,
});
