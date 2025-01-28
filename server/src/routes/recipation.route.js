import { Router } from "express";
import { createSeeker } from "../controller/Seeker.controller.js";

const router = Router()


router.route('/register').post(createSeeker)

export default router;