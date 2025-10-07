import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
