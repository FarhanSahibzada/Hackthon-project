import { Router } from "express";
import { DeletSeeker, getSeekerDetail } from "../controller/Department.controller.js";

const router = Router()


router.route('/get-details').post(getSeekerDetail)
router.route('/delet').post(DeletSeeker)

export default router;