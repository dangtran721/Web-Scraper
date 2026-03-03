import express from "express";
import { userController } from "../controller";
import { userValidation } from "../validation";
import validate from "../middleware/validate";

const router = express.Router();
router.route("/").post(userController.createUser).get(userController.getUsers);
router
  .route("/:userId")
  .patch(validate(userValidation.updateUser), userController.getUpdateUser);
export default router;
