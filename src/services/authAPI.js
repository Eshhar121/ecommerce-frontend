import api from './axios';

/**
 * Registers a new user.
 * @param {object} data - User registration data (e.g., name, email, password).
 * @returns {Promise} Axios response promise.
 */
export const signup = (data) => api.post('/auth/signup', data);

/**
 * Verifies a user's email with a token.
 * @param {string} token - The email verification token.
 * @returns {Promise} Axios response promise.
 */
export const verifyEmail = (token) => api.get(`/auth/verify-email/${token}`);

/**
 * Logs in a user.
 * @param {object} credentials - User credentials (email, password).
 * @returns {Promise} Axios response promise.
 */
export const login = (credentials) => api.post('/auth/login', credentials);

/**
 * Sends a password reset email.
 * @param {object} email - The user's email address.
 * @returns {Promise} Axios response promise.
 */
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });

/**
 * Resets the user's password using a token.
 * @param {string} token - The password reset token.
 * @param {string} password - The new password.
 * @returns {Promise} Axios response promise.
 */
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, { password });

/**
 * Logs out the current user.
 * @returns {Promise} Axios response promise.
 */
export const logout = () => api.post('/auth/logout');

/**
 * Fetches the current authenticated user's data.
 * @returns {Promise} Axios response promise.
 */
export const getCurrentUser = () => api.get('/auth/me');
