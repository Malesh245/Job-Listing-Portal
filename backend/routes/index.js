import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
const router = express.Router();
import {
  postJob,
  getAllJobs,
  getJobById,
  getJobsByEmail,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";
const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}users`, userRoute);
router.post("/post-job", postJob);
router.get("/all-jobs", getAllJobs);
router.get("/all-jobs/:id", getJobById);
router.get("/myJobs/:email", getJobsByEmail);
router.delete("/job/:id", deleteJob);
router.patch("/update-job/:id", updateJob);

export default router;
