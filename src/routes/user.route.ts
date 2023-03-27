import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import {
  getUserRegDataValidation,
  getUserLogDataValidation,
} from "../validation/user.validation";
import { UserRegistration, userLogin } from "../controllers/auth.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/users", getUsers);
router.put("/users/:id", upload.single("file"), updateUser);
router.delete("/users/:id", deleteUser);
router.post("/signup", getUserRegDataValidation, UserRegistration);
router.post("/login", getUserLogDataValidation, userLogin);

export default router;
