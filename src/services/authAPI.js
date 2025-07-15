import api from './axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (data) => api.post('/auth/signup', data);
export const getCurrentUser = () => api.get('/auth/me').then(res => res.data);
export const logout = () => api.post('/auth/logout');
export const sendResetEmail = (email) => api.post('/auth/forgot-password', { email })