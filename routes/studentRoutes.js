import express from "express";
import { createStudent, getStudents, enrollCourse, upload } from "../controllers/studentController.js";

const router = express.Router();

// Add student with file upload
router.post("/add", upload.single("file"), createStudent);

router.get("/", getStudents);
router.post("/:studentId/enroll", enrollCourse);

export default router;
