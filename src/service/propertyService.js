// src/services/propertyService.js
import { API } from '@/config';

/**
 * Property API Service
 * Handles all property-related API calls with fallback to mock data
 */

// Base fetch with error handling
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw error;
  }
};

/**
 * Fetch all properties from the backend
 * Falls back to mock data if backend is not available
 */
export const fetchAllProperties = async () => {
  try {
    const properties = await apiCall(`${API}/api/properties`);
    return properties;
  } catch (error) {
    console.warn('Backend not available, falling back to mock data:', error.message);
    // Fallback to mock data (import dynamically to avoid circular dependencies)
    const { mockProperties } = await import('@/data/mockData');
    return mockProperties;
  }
};

/**
 * Fetch a single property by ID
 * Supports both ObjectId and numeric propertyId formats
 */
export const fetchPropertyById = async (id) => {
  try {
    const property = await apiCall(`${API}/api/properties/${id}`);
    return property;
  } catch (error) {
    console.warn(`Backend not available for property ${id}, falling back to mock data:`, error.message);
    // Fallback to mock data
    const { getPropertyById } = await import('@/data/mockData');
    return getPropertyById(id);
  }
};

/**
 * Fetch properties by city
 * Falls back to filtering mock data
 */
export const fetchPropertiesByCity = async (city) => {
  try {
    const properties = await apiCall(`${API}/api/properties?city=${encodeURIComponent(city)}`);
    return properties;
  } catch (error) {
    console.warn(`Backend not available for city ${city}, falling back to mock data:`, error.message);
    // Fallback to mock data
    const { getPropertiesByCity } = await import('@/data/mockData');
    return getPropertiesByCity(city);
  }
};

/**
 * Search properties with filters
 * Falls back to filtering mock data
 */
export const searchProperties = async (filters) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.city) queryParams.append('city', filters.city);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
    if (filters.propertyType) queryParams.append('propertyType', filters.propertyType);

    const properties = await apiCall(`${API}/api/properties/search?${queryParams}`);
    return properties;
  } catch (error) {
    console.warn('Backend search not available, falling back to mock data:', error.message);
    // Fallback to mock data
    const { searchProperties: mockSearch } = await import('@/data/mockData');
    return mockSearch(filters);
  }
};

/**
 * Check if the backend is available
 * Useful for showing connection status to users
 */
export const checkBackendHealth = async () => {
  try {
    await apiCall(`${API}/api/properties`);
    return { available: true, source: 'backend' };
  } catch (error) {
    return { available: false, source: 'mock', error: error.message };
  }
};

export default {
  fetchAllProperties,
  fetchPropertyById,
  fetchPropertiesByCity,
  searchProperties,
  checkBackendHealth,
};