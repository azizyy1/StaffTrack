"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { FileText, Search, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Attendance = {
  _id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  employee: {
    nom: string;
    prenom: string;
  };
};

export default function AdminRapportsPage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAttendances = async () => {
      const res = await fetch("http://localhost:5001/api/attendance");
      const data = await res.json();
      setAttendances(Array.isArray(data) ? data : []);
    };

    fetchAttendances();
  }, []);

  const filteredAttendances = attendances.filter((item) => {
    const fullName = `${item.employee?.prenom || ""} ${
      item.employee?.nom || ""
    }`;

    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Rapport des pointages", 14, 20);

    doc.setFontSize(10);
    doc.text(`Date d'export : ${new Date().toLocaleDateString("fr-FR")}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [["Employé", "Date", "Entrée", "Sortie", "Statut"]],
      body: filteredAttendances.map((item) => [
        `${item.employee?.prenom || ""} ${item.employee?.nom || ""}`,
        item.date,
        item.checkIn || "-",
        item.checkOut || "-",
        item.status,
      ]),
    });

    doc.save("rapport-pointage.pdf");
  };

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">Administration</p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Rapports de pointage
          </h2>

          <p className="mt-2 text-gray-500">
            Consultez les pointages enregistrés dans MongoDB.
          </p>
        </div>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 font-semibold text-white hover:bg-emerald-700"
        >
          <Download size={20} />
          Exporter PDF
        </button>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 md:w-96">
          <Search size={20} className="text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un employé..."
            className="w-full outline-none"
          />
        </div>

        <div className="mb-6 rounded-3xl bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <FileText />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Résumé des pointages
              </h3>

              <p className="text-sm text-gray-500">
                {filteredAttendances.length} pointage(s) affiché(s)
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-4">Employé</th>
                <th>Date</th>
                <th>Entrée</th>
                <th>Sortie</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendances.map((attendance) => (
                <tr key={attendance._id} className="border-b border-gray-100">
                  <td className="py-5 font-semibold text-gray-900">
                    {attendance.employee?.prenom} {attendance.employee?.nom}
                  </td>

                  <td className="text-gray-600">{attendance.date}</td>

                  <td className="text-gray-600">
                    {attendance.checkIn || "--"}
                  </td>

                  <td className="text-gray-600">
                    {attendance.checkOut || "--"}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        attendance.status === "Retard"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {attendance.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredAttendances.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Aucun pointage trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>

  );
}