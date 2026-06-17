const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalEmployees = await User.countDocuments({ role: "employee" });

    const todayAttendances = await Attendance.find({ date: today });

    const presentsToday = todayAttendances.length;

    const lateToday = todayAttendances.filter(
      (item) => item.status === "Retard"
    ).length;

    const pendingLeaves = await Leave.countDocuments({
      status: "En attente",
    });

    res.status(200).json({
      totalEmployees,
      presentsToday,
      lateToday,
      pendingLeaves,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};