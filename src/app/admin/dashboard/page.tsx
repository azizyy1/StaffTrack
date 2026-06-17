"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { CalendarCheck, Clock, Users, CalendarDays } from "lucide-react";
import Link from "next/link";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Lun", presents: 20, retards: 2 },
  { day: "Mar", presents: 18, retards: 3 },
  { day: "Mer", presents: 22, retards: 1 },
  { day: "Jeu", presents: 19, retards: 4 },
  { day: "Ven", presents: 21, retards: 2 },
];

const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentsToday: 0,
    lateToday: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/stats/dashboard");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const presenceData = [
    { name: "Présents", value: stats.presentsToday },
    { name: "Retards", value: stats.lateToday },
    { name: "Congés", value: stats.pendingLeaves },
  ];

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-4 flex justify-end">
  <Link
    href="/"
    className="rounded-xl bg-black px-5 py-2 font-semibold text-white hover:bg-gray-800"
  >
    Accueil
  </Link>
</div>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">Tableau de bord</p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Bonjour, Administrateur 👋
        </h2>
        <p className="mt-2 text-gray-500">
          Suivi global des présences, retards et congés.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Employés" value={String(stats.totalEmployees)} subtitle="Total employés actifs" icon={<Users size={24} />} />
        <StatCard title="Présents" value={String(stats.presentsToday)} subtitle="Aujourd'hui" icon={<CalendarCheck size={24} />} />
        <StatCard title="Retards" value={String(stats.lateToday)} subtitle="Aujourd'hui" icon={<Clock size={24} />} />
        <StatCard title="Congés en attente" value={String(stats.pendingLeaves)} subtitle="Demandes à traiter" icon={<CalendarDays size={24} />} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Présence hebdomadaire
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Comparaison entre présences et retards.
          </p>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="presents" fill="#2563eb" radius={[8, 8, 0, 0]} />
                <Bar dataKey="retards" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Répartition du jour
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Présents, retards et congés.
          </p>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={presenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {presenceData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-center gap-4 text-sm">
            <span className="text-emerald-600">Présents</span>
            <span className="text-amber-600">Retards</span>
            <span className="text-blue-600">Congés</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}