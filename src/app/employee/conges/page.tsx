"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { CalendarDays, Send } from "lucide-react";
import toast from "react-hot-toast";

type Leave = {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
};

export default function EmployeeCongesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  const fetchLeaves = async () => {
    const user = getUser();

    const res = await fetch(
      `http://localhost:5001/api/leaves/${user.id || user._id}`
    );

    const data = await res.json();
    setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = getUser();

    const res = await fetch("http://localhost:5001/api/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: user.id || user._id,
        startDate,
        endDate,
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Erreur");
      return;
    }

    toast.success("Demande envoyée");
    setStartDate("");
    setEndDate("");
    setReason("");
    fetchLeaves();
  };

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">Congés</p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Mes demandes de congé
        </h2>
        <p className="mt-2 text-gray-500">
          Envoyez une demande et suivez son statut.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <CalendarDays />
          </div>

          <h3 className="text-xl font-semibold">Nouvelle demande</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Date fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Motif
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Expliquez brièvement votre demande..."
                className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none"
                required
              />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700">
              <Send size={20} />
              Envoyer la demande
            </button>
          </form>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xl font-semibold">Historique des demandes</h3>

          <div className="mt-6 space-y-4">
            {leaves.map((leave) => (
              <div key={leave._id} className="rounded-2xl bg-white p-5">
                <p className="font-semibold text-gray-900">
                  Du {leave.startDate} au {leave.endDate}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Motif : {leave.reason}
                </p>

                <span
                  className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                    leave.status === "Approuvé"
                      ? "bg-emerald-100 text-emerald-700"
                      : leave.status === "Refusé"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}