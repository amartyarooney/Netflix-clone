import express from 'express';
import {signup,login,logout, authCheck} from '../controllers/auth.controller.js'
import {protectRoute} from "../middlewares/protectRoute.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login)

router.post("/logout", logout);

router.get("/authCheck",protectRoute, authCheck);
export default router;


//9Mr1Nu9skteg6B1a