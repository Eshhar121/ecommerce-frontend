import api from './axios';

/**
 * Fetches all categories.
 * @returns {Promise} Axios response promise.
 */
export const getCategories = () => api.get('/categories');

/**
 * Creates a new category.
 * @param {object} categoryData - The data for the new category (e.g., { name }).
 * @returns {Promise} Axios response promise.
 */
export const createCategory = (categoryData) => api.post('/categories', categoryData);

/**
 * Updates an existing category.
 * @param {string} categoryId - The ID of the category to update.
 * @param {object} categoryData - The updated data for the category.
 * @returns {Promise} Axios response promise.
 */
export const updateCategory = (categoryId, categoryData) => api.put(`/categories/${categoryId}`, categoryData);

/**
 * Deletes a category.
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);
