/**
 * Centralized API Service
 * All API endpoints are defined here for easy maintenance
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies for auth
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ========================================
// BLOG API
// ========================================
export const blogAPI = {
  // Get all blogs with optional filters
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    category?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/blogs?${queryString}` : '/blogs';
    
    return fetchAPI<{ blogs: any[]; total: number; page: number }>(endpoint);
  },

  // Get single blog by slug/id
  getBySlug: async (slug: string) => {
    return fetchAPI<any>(`/blogs/${slug}`);
  },

  // Get related blogs
  getRelated: async (blogId: string, limit: number = 3) => {
    return fetchAPI<any[]>(`/blogs/${blogId}/related?limit=${limit}`);
  },

  // Search blogs
  search: async (query: string, limit: number = 5) => {
    return fetchAPI<{ blogs: any[] }>(`/blogs?search=${encodeURIComponent(query)}&per_page=${limit}`);
  },
};

// ========================================
// AUTH API (already handled by authSlice, but here for reference)
// ========================================
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{ user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    fetchAPI<{ email: string; message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  verifyEmail: (email: string, otp: string) =>
    fetchAPI<{ user: any }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    }),

  logout: () =>
    fetchAPI<void>('/auth/logout', {
      method: 'POST',
    }),

  getSession: () =>
    fetchAPI<{ user: any }>('/auth/me'),
};

// ========================================
// COURSE API
// ========================================
export const courseAPI = {
  getAll: () => fetchAPI<{ courses: any[] }>('/courses'),
  
  getById: (id: string) => fetchAPI<any>(`/courses/${id}`),
  
  enroll: (courseId: string) =>
    fetchAPI<{ course: any }>(`/courses/${courseId}/enroll`, {
      method: 'POST',
    }),
};

// ========================================
// ORDER/PAYMENT API
// ========================================
export const orderAPI = {
  create: (orderData: any) =>
    fetchAPI<{ order: any }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getAll: () => fetchAPI<{ orders: any[] }>('/orders'),
  
  getById: (orderId: string) => fetchAPI<any>(`/orders/${orderId}`),
};

// ========================================
// PROFILE API
// ========================================
export const profileAPI = {
  get: () => fetchAPI<{ profile: any }>('/profile'),
  
  update: (updates: any) =>
    fetchAPI<{ profile: any }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// ========================================
// Export all APIs
// ========================================
export default {
  blog: blogAPI,
  auth: authAPI,
  course: courseAPI,
  order: orderAPI,
  profile: profileAPI,
};