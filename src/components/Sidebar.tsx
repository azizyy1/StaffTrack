"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Clock,
  CalendarDays,
  Users,
  FileText,
  LogOut,
  History,
  User
} from "lucide-react";

type User = {
  role: "admin" | "employee";
};

const adminMenu = [
  { label: "Dashboard Admin", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Employés", href: "/admin/employes", icon: Users },
  { label: "Congés Admin", href: "/admin/conges", icon: CalendarDays },
  { label: "Rapports", href: "/admin/rapports", icon: FileText },
  { label: "Profil", href: "/profile", icon: User },
];

const employeeMenu = [
  { label: "Dashboard Employé", href: "/employee/dashboard", icon: LayoutDashboard },
  { label: "Pointer", href: "/employee/pointage", icon: Clock },
  { label: "Historique", href: "/employee/historique", icon: History },
  { label: "Mes congés", href: "/employee/conges", icon: CalendarDays },
  { label: "Profil", href: "/profile", icon: User },
];

export default function Sidebar() {
  const [role, setRole] = useState<"admin" | "employee" | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setRole(user.role);
    }
  }, []);

  const menu = role === "admin" ? adminMenu : employeeMenu;

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">PointagePro</h1>
        <p className="mt-1 text-sm text-slate-400">Smart Attendance System</p>
      </div>

      <nav className="mt-6 px-4">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {role === "admin" ? "Administration" : "Espace employé"}
        </p>

        <div className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-blue-600 hover:text-white"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}