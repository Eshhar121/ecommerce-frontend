import api from './axios';

/**
 * Fetches the current user's cart.
 * @returns {Promise} Axios response promise.
 */
export const getCart = () => api.get('/cart/');

/**
 * Adds an item to the cart.
 * @param {object} itemData - Data for the item to add (e.g., productId, quantity).
 * @returns {Promise} Axios response promise.
 */
export const addToCart = (itemData) => api.post('/cart/', itemData);

/**
 * Removes all items from the cart.
 * @returns {Promise} Axios response promise.
 */
export const clearCart = () => api.delete('/cart/clear');

/**
 * Initiates the checkout process for the cart.
 * @returns {Promise} Axios response promise.
 */
export const checkout = () => api.post('/cart/checkout');

/**
 * Removes a specific product from the cart.
 * @param {string} productId - The ID of the product to remove.
 * @returns {Promise} Axios response promise.
 */
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);
