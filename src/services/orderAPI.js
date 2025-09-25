import api from './axios';

export const placeOrder = () => api.post('/orders');

/**
 * Fetches the current user's orders.
 * @returns {Promise} Axios response promise.
 */
export const getMyOrders = () => api.get('/orders');

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

/**
 * Updates the status of an order (admin only).
 * @param {string} orderId - The ID of the order.
 * @param {string} status - The new status of the order.
 * @returns {Promise} Axios response promise.
 */
export const updateOrderStatus = (orderId, status) => api.patch(`/orders/${orderId}/status`, { status });