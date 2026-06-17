import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  subtitle?: string;
};

export default function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="mt-2 text-sm text-gray-400">{subtitle}</p>}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}