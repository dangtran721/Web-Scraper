import express from "express";
import { userController } from "../controller";
const router = express.Router();
router.route("/").post(userController.createUser);
export default router;
