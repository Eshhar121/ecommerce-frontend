import api from './axios';

/**
 * Fetches the current user's profile data.
 * @returns {Promise} Axios response promise.
 */
export const getUserProfile = () => api.get('/user');

/**
 * Updates the current user's profile data.
 * @param {object} profileData - The new profile data.
 * @returns {Promise} Axios response promise.
 */
export const updateUserProfile = (profileData) => api.put('/user', profileData); // Assuming PUT /api/user/ endpoint

/**
 * Fetches all reviews written by the current user.
 * @returns {Promise} Axios response promise.
 */
export const getMyReviews = () => api.get('/user/reviews'); // Assuming this endpoint exists

/**
 * Submits a request for the user to become a publisher.
 * @param {object} data - Application data required to become a publisher.
 * @returns {Promise} Axios response promise.
 */
export const becomePublisher = (data) => api.post('/user/become-publisher', data);

/**
 * Fetches a list of all users (admin only).
 * @returns {Promise} Axios response promise.
 */
export const getUsers = () => api.get('/admin/users'); // Assuming GET /api/admin/users endpoint

/**
 * Updates a user's role (admin only).
 * @param {string} userId - The ID of the user to update.
 * @param {string} newRole - The new role for the user.
 * @returns {Promise} Axios response promise.
 */
export const updateUserRole = (userId, newRole) => api.put(`/admin/users/${userId}/role`, { role: newRole });

/**
 * Deletes a user (admin only).
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
