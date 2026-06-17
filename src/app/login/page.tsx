"use client";

import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [role, setRole] = useState<"admin" | "employee">("admin");
  const [email, setEmail] = useState("admin@pointagepro.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erreur de connexion");
        return;
      }

      if (role === "admin" && data.user.role !== "admin") {
        toast.error("Ce compte appartient à l'espace Employé");
        return;
      }

      if (role === "employee" && data.user.role !== "employee") {
        toast.error("Ce compte appartient à l'espace Administrateur");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Connexion réussie");

      if (data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/employee/dashboard";
      }
    } catch (error) {
      toast.error("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: "url('/company.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-black/20 p-12 text-white lg:flex">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={34} />
            </div>

            <h1 className="text-5xl font-bold">Infinity Soft</h1>

            <p className="mt-4 text-lg text-white/70">
              Digital Innovation Company
            </p>

            <p className="mt-8 leading-8 text-white/75">
              Plateforme interne de gestion des présences, du pointage GPS, des
              QR Codes, des congés et des rapports RH.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">GPS</p>
              <p className="text-sm text-white/60">Pointage sécurisé</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">QR</p>
              <p className="text-sm text-white/60">Validation QR Code</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">RH</p>
              <p className="text-sm text-white/60">Dashboard Admin</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              PointagePro
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Connexion
            </h2>

            <p className="mt-3 text-gray-500">
              Accédez à votre espace sécurisé.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-gray-100 p-2">
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setEmail("admin@pointagepro.com");
                setPassword("123456");
              }}
              className={`rounded-xl py-3 text-sm font-semibold transition ${
                role === "admin"
                  ? "bg-black text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Administrateur
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("employee");
                setEmail("salma@pointagepro.com");
                setPassword("123456");
              }}
              className={`rounded-xl py-3 text-sm font-semibold transition ${
                role === "employee"
                  ? "bg-black text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Employé
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Mail size={20} className="text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Lock size={20} className="text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Infinity Soft © 2026
          </p>
        </div>
      </div>
    </main>
  );
}