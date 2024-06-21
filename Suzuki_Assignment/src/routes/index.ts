import { UserController } from "../controller";
import { validate } from "../middleware/validate";
import { ValidateUser } from "../validations/user";

const Router = require('express').Router;
const router = Router();

router.route("/add-user").post(ValidateUser, validate, UserController?.handleAddUserController)
router.route("/user/:id").get(UserController?.handleGetUserByIdController).delete(UserController?.handleDeleteUserController).put(ValidateUser, validate, UserController.handleUpdateUserController)

router.route("/users").get(UserController.getAllUser)

export default router