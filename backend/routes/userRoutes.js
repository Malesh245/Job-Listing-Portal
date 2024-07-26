import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

export default router;