import { Router } from "express";
import { createSeeker } from "../controller/Seeker.controller.js";

const router = Router()


router.route('/create-seeker').post(createSeeker)

export default router;