import express from "express";
const router = express.Router();
// import Teacher from "../models/Teacher.js"; // (uncomment when model is ready)

router.get("/", (req, res) => {
  res.send("Teacher route working!");
});

export default router;
