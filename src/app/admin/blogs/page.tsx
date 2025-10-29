
"use client";

import { useEffect, useState } from 'react';
import { FileText, Users, Star, Eye } from 'lucide-react';
import StatsCard from '../dashboard/StatsCard';
import RecentActivity from '../dashboard/RecentActivity';
import { mockAPI } from '@/app/lib/mockAdminData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    pendingReviews: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Try real API first
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      console.log('Using mock data (API not available)');
      // Fall back to mock data
      const mockStats = await mockAPI.getDashboardStats();
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      label: 'Total Blogs',
      value: stats.totalBlogs,
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      change: '+18%',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      change: '-5%',
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      label: 'Total Views',
      value: stats.totalViews,
      change: '+23%',
      icon: Eye,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/admin/blogs/create'}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-left"
            >
              + Create New Blog
            </button>
            <button className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors font-medium text-left">
              Review Pending Content
            </button>
            <button className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors font-medium text-left">
              Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
