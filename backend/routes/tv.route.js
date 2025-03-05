import express from 'express';
import {getTrendingTv, getTvDetails, getTvTrailers, getSimilarTv, getTvByCategory} from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailer", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similarTv", getSimilarTv);
router.get("/:category", getTvByCategory);

export default router;
