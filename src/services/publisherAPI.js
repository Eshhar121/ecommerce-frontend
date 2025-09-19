import api from './axios';

/**
 * Fetches the earnings report for the current publisher.
 * @returns {Promise} Axios response promise.
 */
export const getEarnings = () => api.get('/publisher/earnings');

/**
 * Fetches sales analytics for the current publisher.
 * @returns {Promise} Axios response promise.
 */
export const getSalesAnalytics = () => api.get('/publisher/sales-analytics');

/**
 * Fetches orders for the current publisher's products.
 * @returns {Promise} Axios response promise.
 */
export const getPublisherOrders = () => api.get('/publisher/orders');

/**
 * Fetches the profile for the current publisher.
 * @returns {Promise} Axios response promise.
 */
export const getPublisherProfile = () => api.get('/publisher/profile');

/**
 * Updates the profile for the current publisher.
 * @param {object} profileData - The updated profile data.
 * @returns {Promise} Axios response promise.
 */
export const updatePublisherProfile = (profileData) => api.put('/publisher/profile', profileData);
