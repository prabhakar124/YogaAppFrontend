// src/services/admin/reviewService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const reviewService = {
  /**
   * Get all reviews with optional filters
   */
  async getAll(params?: { 
    status?: string; 
    page?: number; 
    limit?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_BASE_URL}/api/admin/reviews?${queryString}`
        : `${API_BASE_URL}/api/admin/reviews`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get reviews error:', error);
      throw error;
    }
  },

  /**
   * Get pending reviews
   */
  async getPending() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reviews/pending`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pending reviews');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get pending reviews error:', error);
      throw error;
    }
  },

  /**
   * Approve a review
   */
  async approve(id: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reviews/${id}/approve`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to approve review');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Approve review error:', error);
      throw error;
    }
  },

  /**
   * Reject a review
   */
  async reject(id: string, reason?: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reviews/${id}/reject`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reject review');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Reject review error:', error);
      throw error;
    }
  },

  /**
   * Update a review
   */
  async update(id: string, reviewData: any) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reviews/${id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Update review error:', error);
      throw error;
    }
  },

  /**
   * Delete a review
   */
  async delete(id: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reviews/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Delete review error:', error);
      throw error;
    }
  },
};

// ================================================
// src/services/admin/analyticsService.ts
// ================================================

export const analyticsService = {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/analytics/dashboard`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  /**
   * Get user analytics
   */
  async getUserStats(params?: { 
    startDate?: string; 
    endDate?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('start_date', params.startDate);
      if (params?.endDate) queryParams.append('end_date', params.endDate);

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_BASE_URL}/api/admin/analytics/users?${queryString}`
        : `${API_BASE_URL}/api/admin/analytics/users`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user stats');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get user stats error:', error);
      throw error;
    }
  },

  /**
   * Get content performance
   */
  async getContentPerformance() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/analytics/content`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch content performance');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get content performance error:', error);
      throw error;
    }
  },

  /**
   * Get traffic analytics
   */
  async getTrafficStats(params?: {
    period?: 'day' | 'week' | 'month' | 'year';
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.period) queryParams.append('period', params.period);

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_BASE_URL}/api/admin/analytics/traffic?${queryString}`
        : `${API_BASE_URL}/api/admin/analytics/traffic`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch traffic stats');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get traffic stats error:', error);
      throw error;
    }
  },

  /**
   * Get popular content
   */
  async getPopularContent(limit: number = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/analytics/popular?limit=${limit}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch popular content');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get popular content error:', error);
      throw error;
    }
  },
};