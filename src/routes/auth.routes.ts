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
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post(
  "/refresh-token",
  validate(authValidation.refreshToken),
  authController.refreshToken,
);
export default router;
