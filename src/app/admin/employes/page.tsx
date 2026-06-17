"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { Plus, Search, Users, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

type Employee = {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  departement: string;
  poste: string;
};

export default function AdminEmployesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    departement: "",
    poste: "",
  });

  const getEmployees = async () => {
    const res = await fetch("http://localhost:5001/api/employees");
    const data = await res.json();
    setEmployees(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      password: "",
      departement: "",
      poste: "",
    });
    setEditId(null);
    setIsEditMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (employee: Employee) => {
    setIsEditMode(true);
    setEditId(employee._id);
    setFormData({
      nom: employee.nom,
      prenom: employee.prenom,
      email: employee.email,
      password: "",
      departement: employee.departement,
      poste: employee.poste,
    });
    setShowModal(true);
  };

  const handleSubmitEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditMode
      ? `http://localhost:5001/api/employees/${editId}`
      : "http://localhost:5001/api/employees";

    const method = isEditMode ? "PUT" : "POST";

    const bodyData = isEditMode
      ? {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          departement: formData.departement,
          poste: formData.poste,
        }
      : formData;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Erreur");
      return;
    }

    toast.success(
      isEditMode
        ? "Employé modifié avec succès"
        : "Employé ajouté avec succès"
    );

    setShowModal(false);
    resetForm();
    getEmployees();
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Voulez-vous vraiment supprimer cet employé ?");

    if (!confirmed) return;

    const response = await fetch(`http://localhost:5001/api/employees/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Erreur lors de la suppression");
      return;
    }

    toast.success("Employé supprimé avec succès");
    getEmployees();
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.prenom} ${employee.nom}`;
    const keyword = search.toLowerCase();

    return (
      fullName.toLowerCase().includes(keyword) ||
      employee.email.toLowerCase().includes(keyword) ||
      employee.departement.toLowerCase().includes(keyword) ||
      employee.poste.toLowerCase().includes(keyword)
    );
  });

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">Administration</p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Gestion des employés
          </h2>
          <p className="mt-2 text-gray-500">
            Liste des employés enregistrés dans MongoDB.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter employé
        </button>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 md:w-96">
          <Search size={20} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-4">Employé</th>
                <th>Email</th>
                <th>Poste</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="border-b border-gray-100">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <Users size={20} />
                      </div>

                      <span className="font-semibold text-gray-900">
                        {employee.prenom} {employee.nom}
                      </span>
                    </div>
                  </td>

                  <td>{employee.email}</td>
                  <td>{employee.poste}</td>
                  <td>{employee.departement}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(employee)}
                        className="flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-200"
                      >
                        <Pencil size={16} />
                        Modifier
                      </button>

                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Aucun employé trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {isEditMode ? "Modifier un employé" : "Ajouter un employé"}
            </h2>

            <form onSubmit={handleSubmitEmployee} className="space-y-4">
              <input
                required
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />

              <input
                required
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />

              {!isEditMode && (
                <input
                  required
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                />
              )}

              <input
                required
                placeholder="Département"
                value={formData.departement}
                onChange={(e) =>
                  setFormData({ ...formData, departement: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />

              <input
                required
                placeholder="Poste"
                value={formData.poste}
                onChange={(e) =>
                  setFormData({ ...formData, poste: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {isEditMode ? "Modifier" : "Ajouter"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
    </ProtectedRoute>
  );
}