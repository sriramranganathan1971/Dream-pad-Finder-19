// src/config.js - API Configuration for Development and Production
const config = {
  // API Base URL - uses environment variable in production
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Frontend URL for CORS
  FRONTEND_URL: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
  
  // Environment check
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Backward compatibility
export const API = config.API_BASE_URL;

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 API Configuration:', {
    API_BASE_URL: config.API_BASE_URL,
    FRONTEND_URL: config.FRONTEND_URL,
    Environment: config.isDevelopment ? 'Development' : 'Production'
  });
}

export default config;
