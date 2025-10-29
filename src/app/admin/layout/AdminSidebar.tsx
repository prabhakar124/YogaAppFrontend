// src/app/admin/layout/AdminSidebar.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Star,
  Image,
  BarChart3,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/admin' 
    },
    { 
      id: 'blogs', 
      icon: FileText, 
      label: 'Blogs', 
      href: '/admin/blogs' 
    },
    { 
      id: 'reviews', 
      icon: Star, 
      label: 'Reviews', 
      href: '/admin/reviews' 
    },
    { 
      id: 'media', 
      icon: Image, 
      label: 'Media', 
      href: '/admin/media' 
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: 'Analytics', 
      href: '/admin/analytics' 
    },
    { 
      id: 'users', 
      icon: Users, 
      label: 'Users', 
      href: '/admin/users' 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings', 
      href: '/admin/settings' 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-indigo-900 to-indigo-800 dark:from-gray-900 dark:to-gray-800 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-indigo-700 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <Link href="/admin" className="text-xl font-bold">
              YogaAdmin
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-gray-700 text-indigo-900 dark:text-white shadow-lg'
                  : 'hover:bg-indigo-700 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-indigo-700 dark:border-gray-700">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-gray-600 flex items-center justify-center font-semibold">
            AD
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-indigo-300 dark:text-gray-400">admin@yoga.com</p>
            </div>
          )}
        </div>
        {isOpen && (
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}