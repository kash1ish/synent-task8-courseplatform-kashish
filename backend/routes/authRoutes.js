import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);

router.get("/admin", protect, adminOnly, (req, res)=>{
    res.json({
        message: "Welcome Admin",
    })
})

router.get("/profile", protect, (req, res) => {
  res.json(req.user)
})

router.post("/login", loginUser);

export default router;