import api from './axios';

/**
 * Fetches the current user's wishlist.
 * @returns {Promise} Axios response promise.
 */
export const getWishlist = () => api.get('/wishlist');

/**
 * Adds a product to the user's wishlist.
 * @param {string} productId - The ID of the product to add.
 * @returns {Promise} Axios response promise.
 */
export const addToWishlist = (productId) => api.post(`/wishlist/${productId}`);

/**
 * Removes a product from the user's wishlist.
 * @param {string} productId - The ID of the product to remove.
 * @returns {Promise} Axios response promise.
 */
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`);
