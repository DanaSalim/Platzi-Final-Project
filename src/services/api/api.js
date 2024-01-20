import axios from 'axios';

export const BACKEND_URL = 'https://api.escuelajs.co/api/v1';
const REQUEST_TIMEOUT = 5000;

export const API_ENDPOINTS = {
    PRODUCT: '/products',
    CATEGORY: '/categories',
    USER: '/users',
    AUTH: '/auth'
}

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  return api;
}

export default createAPI();