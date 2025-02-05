import express from 'express';

import {getTrendingTv, getTvDetails, getTvTrailers, getSimilarTv, getTvByCategory} from '../controllers/tv.controller.js';
const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailer", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category/tvByCategory", getTvByCategory);

export default router;

// router.get("/trending", getTrendingMovie);
// router.get("/:id/trailer", getMovieTrailer);
// router.get("/:id/details", getMovieDetails);
// router.get("/:id/similarMovies", getSimilarMovies);
// router.get("/:category/moviesByCategory", getMoviesByCategory);