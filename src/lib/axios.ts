import axios from 'axios';
import { useAuthStore } from '@/store/auth';

// Create axios instance
export const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'https://api.schoolmanagement.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { accessToken, refreshToken, clearAuth } = useAuthStore.getState();

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If we have a refresh token, try to refresh
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/refresh', {
            refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
          
          // Update tokens in store
          useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect to login
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, clear auth and redirect
        clearAuth();
        window.location.href = '/login';
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error('Access forbidden:', error.response.data?.message);
    } else if (error.response?.status >= 500) {
      // Server errors
      console.error('Server error:', error.response.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;