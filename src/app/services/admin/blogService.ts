// src/services/admin/blogService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Blog Service for Admin Panel
export const blogService = {
  /**
   * Get all blogs with optional filters
   * @param params - Query parameters for filtering
   * @returns List of blogs with pagination info
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.category) queryParams.append('category', params.category);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_BASE_URL}/api/admin/blogs?${queryString}`
        : `${API_BASE_URL}/api/admin/blogs`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get blogs error:', error);
      throw error;
    }
  },

  /**
   * Get single blog by ID
   * @param id - Blog ID
   * @returns Blog data
   */
  async getById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get blog error:', error);
      throw error;
    }
  },

  /**
   * Create new blog
   * @param blogData - Blog content and metadata
   * @returns Created blog
   */
  async create(blogData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Create blog error:', error);
      throw error;
    }
  },

  /**
   * Update existing blog
   * @param id - Blog ID
   * @param blogData - Updated blog data
   * @returns Updated blog
   */
  async update(id: string, blogData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Update blog error:', error);
      throw error;
    }
  },

  /**
   * Delete blog
   * @param id - Blog ID
   * @returns Success response
   */
  async delete(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Delete blog error:', error);
      throw error;
    }
  },

  /**
   * Publish or unpublish a blog
   * @param id - Blog ID
   * @param published - Publish status
   * @returns Updated blog
   */
  async togglePublish(id: string, published: boolean) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/blogs/${id}/publish`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ published }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update blog status');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Toggle publish error:', error);
      throw error;
    }
  },

  /**
   * Upload blog image
   * @param file - Image file
   * @returns Image URL
   */
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Upload image error:', error);
      throw error;
    }
  },

  /**
   * Bulk delete multiple blogs
   * @param ids - Array of blog IDs
   * @returns Success response
   */
  async bulkDelete(ids: string[]) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/blogs/bulk-delete`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ ids }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete blogs');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Bulk delete error:', error);
      throw error;
    }
  },

  /**
   * Get blog statistics
   * @param id - Blog ID
   * @returns Blog stats (views, likes, etc.)
   */
  async getStats(id: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/blogs/${id}/stats`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch blog stats');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get stats error:', error);
      throw error;
    }
  },
};