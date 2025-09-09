import api from './api';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../types/category';

export const categoryApi = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data as Category[];
  },

  // Get single category
  getCategory: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data as Category;
  },

  // Create category
  createCategory: async (data: CreateCategoryDto) => {
    const response = await api.post('/categories', data);
    return response.data as Category;
  },

  // Update category
  updateCategory: async (id: string, data: UpdateCategoryDto) => {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data as Category;
  },

  // Delete category
  deleteCategory: async (id: string) => {
    await api.delete(`/categories/${id}`);
  },

  // Upload category image
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/categories/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url;
  },
};