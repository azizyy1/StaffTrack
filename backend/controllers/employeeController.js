const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { nom, prenom, email, password, departement, poste } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Employé déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role: "employee",
      departement,
      poste,
    });

    res.status(201).json({
      message: "Employé ajouté avec succès",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employé introuvable",
      });
    }

    res.status(200).json({
      message: "Employé supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { nom, prenom, email, departement, poste } = req.body;

    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé par un autre employé",
      });
    }

    const employee = await User.findByIdAndUpdate(
      req.params.id,
      {
        nom,
        prenom,
        email,
        departement,
        poste,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employé introuvable",
      });
    }

    res.status(200).json({
      message: "Employé modifié avec succès",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
};