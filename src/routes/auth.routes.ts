import express from "express";
import { authController } from "../controller";
import { authValidation } from "../validation";
import validate from "../middleware/validate";

const router = express.Router();
router.post(
  "/register",
  validate(authValidation.register),
  authController.register,
);
router.post("/login", validate(authValidation.login), authController.login);
export default router;
