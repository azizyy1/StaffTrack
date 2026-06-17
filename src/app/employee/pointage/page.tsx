"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MapPin, QrCode, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type User = {
  id?: string;
  _id?: string;
  role: string;
};

export default function PointagePage() {
  const [location, setLocation] = useState("Non vérifiée");
  const [qrCode, setQrCode] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  const VALID_QR_CODE = "POINTAGEPRO-2026";

  const getUser = (): User | null => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  };

  const verifyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
        );
        toast.success("Position GPS vérifiée");
      },
      () => {
        toast.error("Impossible de récupérer la position GPS.");
      }
    );
  };

  const validateQrCode = () => {
    if (qrCode.trim() === VALID_QR_CODE) {
      setQrScanned(true);
      toast.success("QR Code validé");
    } else {
      setQrScanned(false);
      toast.error("QR Code incorrect");
    }
  };

  const handleAttendance = async (type: "check-in" | "check-out") => {
    const user = getUser();
    const employeeId = user?.id || user?._id;

    if (!employeeId) {
      toast.error("Utilisateur non connecté");
      return;
    }

    if (location === "Non vérifiée") {
      toast.error("Veuillez vérifier votre position GPS.");
      return;
    }

    if (!qrScanned) {
      toast.error("Veuillez valider le QR Code.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/api/attendance/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erreur de pointage");
        return;
      }

      toast.success(data.message);
    } catch (error) {
      toast.error("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Pointage intelligent
        </p>

        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Pointer votre présence
        </h2>

        <p className="mt-2 text-gray-500">
          Vérifiez votre position GPS, saisissez le QR Code puis validez votre
          entrée ou sortie.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <MapPin />
          </div>

          <h3 className="mt-5 text-xl font-semibold">Étape 1</h3>

          <p className="mt-2 text-gray-500">
            Vérification de la localisation GPS.
          </p>

          <div className="mt-5 rounded-xl bg-white p-4 text-sm text-gray-600">
            Position : {location}
          </div>

          <button
            onClick={verifyLocation}
            className="mt-5 w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Vérifier GPS
          </button>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white">
            <QrCode />
          </div>

          <h3 className="mt-5 text-xl font-semibold">Étape 2</h3>

          <p className="mt-2 text-gray-500">
            Saisissez le QR Code fourni par l'entreprise.
          </p>

          <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5">
            <p className="mb-2 text-sm text-gray-500">
              Code démo : POINTAGEPRO-2026
            </p>

            <input
              value={qrCode}
              onChange={(e) => {
                setQrCode(e.target.value);
                setQrScanned(false);
              }}
              placeholder="Entrer le QR Code"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
            />

            <button
              onClick={validateQrCode}
              className="mt-4 w-full rounded-2xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Valider QR Code
            </button>
          </div>

          {qrScanned && (
            <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
              QR Code validé avec succès.
            </p>
          )}
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Clock />
          </div>

          <h3 className="mt-5 text-xl font-semibold">Étape 3</h3>

          <p className="mt-2 text-gray-500">
            Valider votre entrée ou sortie.
          </p>

          <div className="mt-5 space-y-3">
            <button
              disabled={loading}
              onClick={() => handleAttendance("check-in")}
              className="w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              Pointer l'entrée
            </button>

            <button
              disabled={loading}
              onClick={() => handleAttendance("check-out")}
              className="w-full rounded-2xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              Pointer la sortie
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-emerald-50 p-6 text-emerald-700">
        <div className="flex items-center gap-3">
          <CheckCircle />

          <p className="font-semibold">
            Les pointages sont enregistrés dans MongoDB après validation GPS et
            QR Code.
          </p>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}