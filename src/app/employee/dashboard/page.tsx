import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import StatCard from "@/components/StatCard";
import { Clock, CalendarCheck, CalendarDays, Timer } from "lucide-react";
import Link from "next/link";

export default function EmployeeDashboardPage() {
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
        <p className="text-sm font-medium text-blue-600">Espace Employé</p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Bonjour, Salma 👋
        </h2>
        <p className="mt-2 text-gray-500">
          Voici le résumé de votre présence aujourd’hui.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Statut" value="Présente" subtitle="Pointée à 08:55" icon={<CalendarCheck />} />
        <StatCard title="Heures" value="6h 20" subtitle="Aujourd’hui" icon={<Timer />} />
        <StatCard title="Retard" value="0 min" subtitle="Aucun retard" icon={<Clock />} />
        <StatCard title="Congés" value="2" subtitle="Demandes en attente" icon={<CalendarDays />} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold">Action rapide</h3>
          <p className="mt-2 text-gray-500">
            Scannez le QR Code et validez votre position GPS.
          </p>

          <Link
            href="/employee/pointage"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Pointer maintenant
          </Link>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold">Derniers pointages</h3>

          <div className="mt-6 space-y-4">
            {[
              "Entrée : 08:55 - Validée GPS",
              "Sortie : 17:04 - Validée GPS",
              "Entrée : 09:02 - Retard 2 min",
            ].map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 text-sm text-gray-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}