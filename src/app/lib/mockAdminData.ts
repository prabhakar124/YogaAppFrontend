// src/app/lib/mockAdminData.ts

/**
 * Mock data for admin panel development
 * Use this when backend is not available
 */

export const mockAdminData = {
  // Dashboard Statistics
  stats: {
    totalBlogs: 24,
    totalUsers: 156,
    pendingReviews: 8,
    totalViews: 12453,
  },

  // Blog Posts
  blogs: [
    {
      id: '1',
      title: 'Master Guide to Surya Namaskar',
      category: 'Asanas',
      status: 'Published' as const,
      views: 1234,
      author: 'Admin User',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      slug: 'master-guide-surya-namaskar',
      excerpt: 'Complete guide to Sun Salutation practice',
      image: '/images/surya-namaskar.jpg',
    },
    {
      id: '2',
      title: 'Pranayama Breathing Techniques for Beginners',
      category: 'Breathing',
      status: 'Published' as const,
      views: 892,
      author: 'Admin User',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      slug: 'pranayama-breathing-techniques',
      excerpt: 'Learn basic breathing exercises',
      image: '/images/pranayama.jpg',
    },
    {
      id: '3',
      title: 'Meditation Guide for Stress Relief',
      category: 'Meditation',
      status: 'Draft' as const,
      views: 0,
      author: 'Admin User',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      slug: 'meditation-guide-stress-relief',
      excerpt: 'Find peace through meditation',
      image: '/images/meditation.jpg',
    },
    {
      id: '4',
      title: 'Yoga Philosophy and History',
      category: 'Philosophy',
      status: 'Published' as const,
      views: 567,
      author: 'Admin User',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      slug: 'yoga-philosophy-history',
      excerpt: 'Understanding the roots of yoga',
      image: '/images/philosophy.jpg',
    },
    {
      id: '5',
      title: 'Advanced Vinyasa Flow Sequences',
      category: 'Asanas',
      status: 'Published' as const,
      views: 1456,
      author: 'Admin User',
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      slug: 'advanced-vinyasa-flow',
      excerpt: 'Take your practice to the next level',
      image: '/images/vinyasa.jpg',
    },
  ],

  // Recent Activities
  activities: [
    {
      id: '1',
      type: 'blog' as const,
      title: 'New blog post published',
      description: '"Master Guide to Surya Namaskar" by Admin',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
    {
      id: '2',
      type: 'review' as const,
      title: 'New review received',
      description: '5-star review from John Doe',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: 'John Doe',
    },
    {
      id: '3',
      type: 'media' as const,
      title: 'Media uploaded',
      description: '3 new images added to gallery',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
    {
      id: '4',
      type: 'user' as const,
      title: 'New user registered',
      description: 'Jane Smith joined the platform',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      user: 'Jane Smith',
    },
    {
      id: '5',
      type: 'blog' as const,
      title: 'Blog post updated',
      description: '"Pranayama Techniques" was edited',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      user: 'Admin',
    },
  ],

  // Reviews
  reviews: [
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Amazing yoga classes! Highly recommended.',
      status: 'pending' as const,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      user: 'Jane Smith',
      rating: 4,
      comment: 'Great instructors and peaceful environment.',
      status: 'approved' as const,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      user: 'Mike Johnson',
      rating: 5,
      comment: 'Life-changing experience. Thank you!',
      status: 'rejected' as const,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],

  // Users
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'student',
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'instructor',
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
  ],

  // Notifications
  notifications: [
    {
      id: '1',
      title: 'New Review',
      message: 'John Doe left a 5-star review',
      read: false,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      title: 'Blog Published',
      message: 'Your blog "Yoga Guide" is now live',
      read: false,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      title: 'New User',
      message: 'Jane Smith registered on the platform',
      read: true,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ],

  // Current User
  currentUser: {
    name: 'Admin User',
    email: 'admin@yoga.com',
    role: 'admin',
    avatar: null,
  },
};

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  async getDashboardStats() {
    await delay(500);
    return mockAdminData.stats;
  },

  async getBlogs(params?: { status?: string; search?: string }) {
    await delay(500);
    let blogs = [...mockAdminData.blogs];

    // Filter by status
    if (params?.status && params.status !== 'all') {
      blogs = blogs.filter(b => b.status.toLowerCase() === params.status);
    }

    // Filter by search
    if (params?.search) {
      const query = params.search.toLowerCase();
      blogs = blogs.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
      );
    }

    return blogs;
  },

  async getBlogById(id: string) {
    await delay(300);
    return mockAdminData.blogs.find(b => b.id === id);
  },

  async getActivities() {
    await delay(500);
    return mockAdminData.activities;
  },

  async getReviews() {
    await delay(500);
    return mockAdminData.reviews;
  },

  async getNotifications() {
    await delay(300);
    return mockAdminData.notifications;
  },

  async getCurrentUser() {
    await delay(300);
    return mockAdminData.currentUser;
  },

  async deleteBlog(id: string) {
    await delay(500);
    const index = mockAdminData.blogs.findIndex(b => b.id === id);
    if (index > -1) {
      mockAdminData.blogs.splice(index, 1);
      return { success: true, message: 'Blog deleted successfully' };
    }
    throw new Error('Blog not found');
  },

  async approveReview(id: string) {
    await delay(500);
    const review = mockAdminData.reviews.find(r => r.id === id);
    if (review) {
      review.status = 'approved';
      return { success: true, message: 'Review approved' };
    }
    throw new Error('Review not found');
  },

  async rejectReview(id: string) {
    await delay(500);
    const review = mockAdminData.reviews.find(r => r.id === id);
    if (review) {
      review.status = 'rejected';
      return { success: true, message: 'Review rejected' };
    }
    throw new Error('Review not found');
  },
};

export default mockAdminData;