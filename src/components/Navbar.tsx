"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type User = {
  role: "admin" | "employee";
};

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!mounted) return null;

  if (pathname !== "/") return null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-3xl font-bold text-white">
          Infinity Soft
        </Link>

        {!user ? (
          <Link
            href="/login"
            className="rounded-xl bg-white px-5 py-2 font-semibold text-black"
          >
            Connexion
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href={
                user.role === "admin"
                  ? "/admin/dashboard"
                  : "/employee/dashboard"
              }
              className="font-medium text-white"
            >
              Dashboard
            </Link>

            <Link href="/profile" className="font-medium text-white">
              Profil
            </Link>

            <button
              onClick={logout}
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}