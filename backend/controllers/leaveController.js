const Leave = require("../models/Leave");

const createLeave = async (req, res) => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      reason,
    } = req.body;

    const leave = await Leave.create({
      employee: employeeId,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json({
      message: "Demande de congé créée",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const leaves = await Leave.find({
      employee: employeeId,
    }).sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "nom prenom email")
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Congé introuvable",
      });
    }

    leave.status = "Approuvé";

    await leave.save();

    res.status(200).json({
      message: "Congé approuvé",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Congé introuvable",
      });
    }

    leave.status = "Refusé";

    await leave.save();

    res.status(200).json({
      message: "Congé refusé",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};