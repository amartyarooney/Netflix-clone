import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET : process.env.JWT_SECRET || "very_hard_to_crack",
    TMDB_API_KEY: process.env.TMDB_API_KEY,
}