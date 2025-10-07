// controllers/teacherController.js
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');

exports.createTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name & email required' });

    const exists = await Teacher.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Teacher already exists' });

    const teacher = new Teacher({ name, email, courses: [] });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('courses');
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// optional: assign a course to teacher
exports.assignCourse = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { courseId } = req.body;
    const teacher = await Teacher.findById(teacherId);
    const course = await Course.findById(courseId);
    if (!teacher || !course) return res.status(404).json({ message: 'Teacher or Course not found' });

    teacher.courses.push(courseId);
    await teacher.save();
    res.json({ message: 'Course assigned', teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
