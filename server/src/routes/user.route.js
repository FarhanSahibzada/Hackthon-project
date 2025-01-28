import { Router } from "express";
import verifyToken from "../middlewares/Auth.middleware.js";
import { findUserWithId, getCurrentUser, loginUser, refreshAccessToken, registerUser } from "../controller/user.controller.js";

const router = Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout-user').patch(loginUser)
router.route('/current-user').get( verifyToken, getCurrentUser)
router.route('/refresh-token').get(refreshAccessToken)
router.route('/find-user/:id').get(findUserWithId)

export default router;