"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { User, Mail, Briefcase, Building2, ShieldCheck } from "lucide-react";

type ProfileUser = {
  id?: string;
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  role: "admin" | "employee";
  departement?: string;
  poste?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null;

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">Profil</p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Mon profil
        </h2>
        <p className="mt-2 text-gray-500">
          Informations du compte connecté.
        </p>
      </div>

      <div className="glass-card max-w-3xl rounded-3xl p-8">
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white">
            <User size={36} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {user.prenom} {user.nom}
            </h3>
            <p className="mt-1 text-gray-500">
              {user.role === "admin" ? "Administrateur" : "Employé"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5">
            <div className="flex items-center gap-3 text-gray-500">
              <Mail size={20} />
              <span>Email</span>
            </div>
            <p className="mt-3 font-semibold text-gray-900">{user.email}</p>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <div className="flex items-center gap-3 text-gray-500">
              <ShieldCheck size={20} />
              <span>Rôle</span>
            </div>
            <p className="mt-3 font-semibold text-gray-900">
              {user.role === "admin" ? "Administrateur" : "Employé"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <div className="flex items-center gap-3 text-gray-500">
              <Building2 size={20} />
              <span>Département</span>
            </div>
            <p className="mt-3 font-semibold text-gray-900">
              {user.departement || "Non défini"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <div className="flex items-center gap-3 text-gray-500">
              <Briefcase size={20} />
              <span>Poste</span>
            </div>
            <p className="mt-3 font-semibold text-gray-900">
              {user.poste || "Non défini"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}