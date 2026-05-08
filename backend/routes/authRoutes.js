import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);
router.get("/profile", protect, (req, res) => {
  res.json(req.user)
})
router.post("/login", loginUser);

export default router;