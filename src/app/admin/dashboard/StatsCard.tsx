// src/app/admin/dashboard/StatsCard.tsx
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ label, value, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
        </div>
      </div>
    </div>
  );
}