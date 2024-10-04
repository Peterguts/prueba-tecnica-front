export const API_URL = 'http://localhost:5092';
export const TOKEN_STORAGE_KEY = 'token';
export const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
export const ADMIN_ROLE = 'Administrador';
export const USER_ROLE = 'Colaborador';
export const DASHBOARD_ROUTE = '/dashboard';

// Rutas de la API
export const API_ROUTES = {
  LOGIN: `${API_URL}/login`,
  PRODUCTS: `${API_URL}/api/Productos`,
  PRODUCT: (id) => `${API_URL}/api/Productos/${id}`,
};