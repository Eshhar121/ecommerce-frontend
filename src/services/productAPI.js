import api from './axios';

export const addProduct = (formData) =>
    api.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
