// src/services/admin/mediaService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const mediaService = {
  /**
   * Get all media files
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    type?: 'image' | 'video' | 'document';
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.type) queryParams.append('type', params.type);

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_BASE_URL}/api/admin/media?${queryString}`
        : `${API_BASE_URL}/api/admin/media`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get media error:', error);
      throw error;
    }
  },

  /**
   * Upload single media file
   */
  async upload(file: File, metadata?: {
    title?: string;
    alt?: string;
    description?: string;
  }) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (metadata?.title) formData.append('title', metadata.title);
      if (metadata?.alt) formData.append('alt', metadata.alt);
      if (metadata?.description) formData.append('description', metadata.description);

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Upload media error:', error);
      throw error;
    }
  },

  /**
   * Upload multiple files
   */
  async uploadMultiple(files: File[]) {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/media/upload-multiple`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Upload multiple error:', error);
      throw error;
    }
  },

  /**
   * Update media metadata
   */
  async update(id: string, metadata: {
    title?: string;
    alt?: string;
    description?: string;
  }) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/media/${id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(metadata),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Update media error:', error);
      throw error;
    }
  },

  /**
   * Delete media file
   */
  async delete(id: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/media/${id}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Delete media error:', error);
      throw error;
    }
  },

  /**
   * Delete multiple media files
   */
  async bulkDelete(ids: string[]) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/media/bulk-delete`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ ids }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete media files');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Bulk delete media error:', error);
      throw error;
    }
  },

  /**
   * Get media by ID
   */
  async getById(id: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/media/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get media error:', error);
      throw error;
    }
  },

  /**
   * Search media by filename or metadata
   */
  async search(query: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/media/search?q=${encodeURIComponent(query)}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search media');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Search media error:', error);
      throw error;
    }
  },
};