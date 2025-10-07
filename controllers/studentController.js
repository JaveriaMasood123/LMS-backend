import Student from "../models/Student.js";
import Course from "../models/Course.js";
import multer from "multer";
import path from "path";

// ---------- Multer setup ----------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

export const upload = multer({ storage });

// ---------- Create student ----------
export const createStudent = async (req, res) => {
  try {
    const { name, email, courseId } = req.body;
    const file = req.file;

    if (!name || !email || !courseId) {
      return res.status(400).json({ msg: "Name, Email, and Course are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const student = await Student.create({
      name,
      email,
      enrolledCourses: [courseId],
      file: file ? file.filename : null,
    });

    res.status(201).json({ msg: "Student added successfully!", student });
  } catch (error) {
    console.error("❌ Error creating student:", error);
    res.status(500).json({ msg: "Error creating student", error });
  }
};

// ---------- Get all students ----------
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("enrolledCourses", "title");
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ msg: "Error fetching students", error });
  }
};

// ---------- Enroll student in a course ----------
export const enrollCourse = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ msg: "Student or Course not found" });
    }

    if (!student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
      await student.save();
    }

    res.json({ msg: "Student enrolled successfully", student });
  } catch (error) {
    console.error("❌ Error enrolling student:", error);
    res.status(500).json({ msg: "Error enrolling student", error });
  }
};
