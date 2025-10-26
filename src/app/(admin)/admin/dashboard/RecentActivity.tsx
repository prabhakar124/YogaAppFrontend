// src/components/admin/dashboard/RecentActivity.tsx
"use client";

import { useEffect, useState } from 'react';
import { FileText, Star, Image, Users, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'blog' | 'review' | 'media' | 'user';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch('/api/admin/activities/recent', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const data = await response.json();
      setActivities(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Fallback to mock data for demo
      setActivities(getMockActivities());
      setLoading(false);
    }
  };

  const getMockActivities = (): Activity[] => [
    {
      id: '1',
      type: 'blog',
      title: 'New blog post published',
      description: '"Master Guide to Surya Namaskar" by Admin',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
    {
      id: '2',
      type: 'review',
      title: 'New review received',
      description: '5-star review from John Doe',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: 'John Doe',
    },
    {
      id: '3',
      type: 'media',
      title: 'Media uploaded',
      description: '3 new images added to gallery',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
    {
      id: '4',
      type: 'user',
      title: 'New user registered',
      description: 'Jane Smith joined the platform',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      user: 'Jane Smith',
    },
    {
      id: '5',
      type: 'blog',
      title: 'Blog post updated',
      description: '"Pranayama Techniques" was edited',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'blog':
        return { icon: FileText, color: 'bg-blue-100 text-blue-600' };
      case 'review':
        return { icon: Star, color: 'bg-yellow-100 text-yellow-600' };
      case 'media':
        return { icon: Image, color: 'bg-purple-100 text-purple-600' };
      case 'user':
        return { icon: Users, color: 'bg-green-100 text-green-600' };
      default:
        return { icon: FileText, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return past.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="mx-auto mb-2 text-gray-400" size={32} />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => {
            const { icon: Icon, color } = getActivityIcon(activity.type);
            
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
              >
                <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}