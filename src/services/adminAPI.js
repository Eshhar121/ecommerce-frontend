import api from './axios';

/**
 * Fetches overview statistics (admin only).
 * @returns {Promise} Axios response promise.
 */
export const getOverviewStats = () => api.get('/admin/overview');

/**
 * Fetches all products (admin only).
 * @returns {Promise} Axios response promise.
 */
export const getAllProducts = () => api.get('/admin/products');

/**
 * Updates an existing product (admin only).
 * @param {string} productId - The ID of the product to update.
 * @param {object} formData - The updated data for the product.
 * @returns {Promise} Axios response promise.
 */
export const updateProduct = (productId, formData) => {
  return api.put(`/admin/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Deletes a product (admin only).
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteProduct = (productId) => api.delete(`/admin/products/${productId}`);