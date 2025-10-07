import express from "express";
import { getCourses, addCourse, deleteCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/add", addCourse);
router.delete("/:id", deleteCourse);

export default router;
