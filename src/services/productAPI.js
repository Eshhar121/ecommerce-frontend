import api from './axios';

/**
 * Fetches a list of all products.
 * @returns {Promise} Axios response promise.
 */
export const getProducts = (searchQuery = '') => api.get(`/products?search=${searchQuery}`);

/**
 * Fetches a list of all products for the current publisher.
 * @returns {Promise} Axios response promise.
 */
export const getPublisherProducts = () => api.get('/products/publisher');

/**
 * Fetches all reviews for the current publisher's products.
 * @returns {Promise} Axios response promise.
 */
export const getPublisherReviews = () => api.get('/reviews/publisher');

/**
 * Creates a new product.
 * @param {FormData} formData - The form data for the new product, including the image.
 * @returns {Promise} Axios response promise.
 */
export const createProduct = (formData) => {
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Updates an existing product.
 * @param {string} productId - The ID of the product to update.
 * @param {FormData} formData - The updated data for the product.
 * @returns {Promise} Axios response promise.
 */
export const updateProduct = (productId, formData) => {
  return api.put(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Deletes a product.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteProduct = (productId) => api.delete(`/products/${productId}`);

/**
 * Adds a review for a product.
 * @param {object} reviewData - The review data (e.g., productId, rating, comment).
 * @returns {Promise} Axios response promise.
 */
export const addProductReview = (reviewData) => api.post('/reviews', reviewData);

/**
 * Updates an existing review.
 * @param {string} reviewId - The ID of the review to update.
 * @param {object} reviewData - The updated data for the review.
 * @returns {Promise} Axios response promise.
 */
export const updateReview = (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData);

/**
 * Deletes a review.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);

/**
 * Fetches all reviews for a specific product.
 * @param {string} productId - The ID of the product.
 * @returns {Promise} Axios response promise.
 */
export const getProductReviews = (productId) => api.get(`/reviews/${productId}`);

/**
 * Fetches a single product by its ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise} Axios response promise.
 */
export const getProductById = (productId) => api.get(`/products/${productId}`);


