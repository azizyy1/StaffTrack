const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendances,
} = require("../controllers/attendanceController");

router.get("/", getAllAttendances);
router.get("/:employeeId", getMyAttendance);
router.post("/check-in", checkIn);
router.post("/check-out", checkOut);

module.exports = router;