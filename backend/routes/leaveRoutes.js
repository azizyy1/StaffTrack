const express = require("express");
const router = express.Router();

const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require("../controllers/leaveController");

router.post("/", createLeave);

router.get("/", getAllLeaves);

router.get("/:employeeId", getMyLeaves);

router.put("/approve/:id", approveLeave);

router.put("/reject/:id", rejectLeave);

module.exports = router;