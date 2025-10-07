import Course from "../models/Course.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching courses", error });
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    if (!title) return res.status(400).json({ msg: "Title is required" });

    const course = await Course.create({ title, description, duration });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: "Error adding course", error });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting course", error });
  }
};
