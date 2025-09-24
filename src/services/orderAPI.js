import api from './axios';

/**
 * Places a new order.
 * @param {object} orderData - The data for the order.
 * @returns {Promise} Axios response promise.
 */
export const placeOrder = (orderData) => api.post('/orders/place', orderData);

/**
 * Fetches the current user's orders.
 * @returns {Promise} Axios response promise.
 */
export const getMyOrders = () => api.get('/orders/my');

/**
 * Fetches all orders (admin only).
 * @returns {Promise} Axios response promise.
 */
export const getAllOrders = () => api.get('/admin/orders');

/**
 * Marks an order as delivered (admin only).
 * @param {string} orderId - The ID of the order.
 * @returns {Promise} Axios response promise.
 */
export const markOrderAsDelivered = (orderId) => api.put(`/admin/orders/${orderId}/deliver`);

/**
 * Creates a checkout session for payment.
 * @param {object} orderItems - The items to be included in the checkout.
 * @returns {Promise} Axios response promise.
 */
export const createCheckoutSession = (orderItems) => api.post('/payment/create-checkout-session', orderItems);

/**
 * Marks an order as paid.
 * @param {string} orderId - The ID of the order.
 * @returns {Promise} Axios response promise.
 */
export const markOrderAsPaid = (orderId) => api.put(`/payment/${orderId}/pay`);
