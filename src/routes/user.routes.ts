import express from "express";
import { userController } from "../controller";
import { userValidation } from "../validation";
import validate from "../middleware/validate";

const router = express.Router();
router.route("/").post(userController.createUser).get(userController.getUsers);
router
  .route("/:userId")
  .patch(validate(userValidation.updateUser), userController.getUpdateUser)
  .delete(validate(userValidation.deleteUser), userController.hardDeleteUser);

router
  .route("/soft/:userId")
  .patch(validate(userValidation.deleteUser), userController.softDeleteUser);

router
  .route("/restore/:userId")
  .patch(validate(userValidation.restoreUser), userController.restoreUser);

export default router;
