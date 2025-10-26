// src/services/admin/index.ts

/**
 * Central export file for all admin services
 * Import services like: import { authService, blogService } from '@/services/admin'
 */

import { authService } from './authService';
import { blogService } from './blogService';
import { reviewService, analyticsService } from './reviewService';
import { mediaService } from './mediaService';

export { authService } from './authService';
export { blogService } from './blogService';
export { reviewService, analyticsService } from './reviewService';
export { mediaService } from './mediaService';

// You can also create a combined export
export default {
  auth: authService,
  blog: blogService,
  review: reviewService,
  analytics: analyticsService,
  media: mediaService,
};

// Usage examples:
// 
// Option 1: Named imports (recommended)
// import { authService, blogService } from '@/services/admin';
// await authService.login(email, password);
// await blogService.getAll();
//
// Option 2: Default import
// import adminServices from '@/services/admin';
// await adminServices.auth.login(email, password);
// await adminServices.blog.getAll();