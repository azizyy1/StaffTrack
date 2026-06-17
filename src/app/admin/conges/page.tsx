"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";

type Leave = {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employee: {
    nom: string;
    prenom: string;
    email: string;
  };
};

export default function AdminCongesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const fetchLeaves = async () => {
    const res = await fetch("http://localhost:5001/api/leaves");
    const data = await res.json();
    setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateLeaveStatus = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    const res = await fetch(
      `http://localhost:5001/api/leaves/${action}/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Erreur");
      return;
    }

    toast.success(data.message);
    fetchLeaves();
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Administration</p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Gestion des congés
        </h2>
        <p className="mt-2 text-gray-500">
          Validez ou refusez les demandes de congé des employés.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div key={leave._id} className="rounded-3xl bg-white p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <CalendarDays />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {leave.employee?.prenom} {leave.employee?.nom}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Du {leave.startDate} au {leave.endDate}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      Motif : {leave.reason}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <span
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      leave.status === "Approuvé"
                        ? "bg-emerald-100 text-emerald-700"
                        : leave.status === "Refusé"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {leave.status === "Approuvé" && <CheckCircle size={16} />}
                    {leave.status === "Refusé" && <XCircle size={16} />}
                    {leave.status === "En attente" && <Clock size={16} />}
                    {leave.status}
                  </span>

                  {leave.status === "En attente" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateLeaveStatus(leave._id, "approve")
                        }
                        className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Valider
                      </button>

                      <button
                        onClick={() =>
                          updateLeaveStatus(leave._id, "reject")
                        }
                        className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {leaves.length === 0 && (
            <p className="text-center text-gray-500">
              Aucune demande de congé pour le moment.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}