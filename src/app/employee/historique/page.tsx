"use client";
import { useEffect, useState } from "react"; 
import { History } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

type Attendance = { 
  _id: string; 
  date: string; 
  checkIn: string;
  checkOut: string; 
  status: string; 
}; 

export default function HistoriquePage() { 
  const [attendances, setAttendances] = useState<Attendance[]>([]); 
  
  useEffect(() => {
  const fetchAttendance = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const employeeId = user.id || user._id;

    if (!employeeId) {
      setAttendances([]);
      return;
    }

    const response = await fetch(
      `http://localhost:5001/api/attendance/${employeeId}`
    );

    const data = await response.json();

    setAttendances(Array.isArray(data) ? data : []);
  };

  fetchAttendance();
}, []);




return ( 
<ProtectedRoute>
<DashboardLayout> 
      <div className="mb-8"> 
        <p className="text-sm font-medium text-blue-600">
          Historique 
          </p>

    <h2 className="mt-2 text-4xl font-bold text-gray-900"> 
      Mes pointages 
      </h2> 
      
      <p className="mt-2 text-gray-500"> 
        Consultez toutes vos présences. 
        </p> 
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="mb-6 flex items-center gap-3"> 
            <History className="text-blue-600" /> 
            <h3 className="text-xl font-semibold"> 
              Historique complet 
              </h3> 
              </div> 
              
        <div className="overflow-x-auto"> 
          <table className="w-full border-collapse text-left">
            <thead> 
              <tr className="border-b border-gray-200"> 
                <th className="py-4">Date</th> 
                <th>Entrée</th>
                <th>Sortie</th> 
                <th>Statut</th> 
                </tr> 
                </thead>

              <tbody>
                {attendances.map((attendance) => (
                  <tr 
                  key={attendance._id}
                  className="border-b border-gray-100" >
                    <td className="py-4"> 
                    {attendance.date} 
                    </td> 
                    
                    <td>{attendance.checkIn}</td>
                    
                    <td> {attendance.checkOut || "--"} 
                      </td>  

                      <td> 
                        <span 
                        className={`rounded-full px-3 py-1 text-sm font-medium ${ attendance.status === "Retard" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600" }`} >
                          {attendance.status}
                        </span> 
                      </td> 
                    </tr>
                  ))} 
                </tbody> 
              </table> 
            </div> 
        </div>
</DashboardLayout>
</ProtectedRoute>
 );
}