import { verifyToken } from "../middleware/auth";
import {
  validateStrongPassword,
  validateUsername,
} from "../middleware/validation";
import {
  addFavoriteCategory,
  getFavorites,
  login,
  register,
} from "../services/user.service";

const router = require("express").Router();

router.post("/register", validateStrongPassword, validateUsername, register);
router.post("/login", login);
router.post("/add-favorite", verifyToken, addFavoriteCategory);
router.get("/get-favorites", verifyToken, getFavorites);

export default router;
