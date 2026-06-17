const Attendance = require("../models/Attendance");


const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Entrée déjà enregistrée aujourd'hui",
      });
    }

    const status = now > "09:00" ? "Retard" : "Présent";

    const attendance = await Attendance.create({
      employee: employeeId,
      date: today,
      checkIn: now,
      status,
    });

    res.status(201).json({
      message: "Entrée enregistrée avec succès",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({
        message: "Aucune entrée trouvée aujourd'hui",
      });
    }

    attendance.checkOut = now;
    await attendance.save();

    res.status(200).json({
      message: "Sortie enregistrée avec succès",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendances = await Attendance.find({
      employee: employeeId,
    }).sort({ createdAt: -1 });

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("employee", "nom prenom")
      .sort({ createdAt: -1 });

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendances,
};