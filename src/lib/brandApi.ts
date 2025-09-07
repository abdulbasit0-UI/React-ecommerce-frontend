import api from './api';
import type { Brand, CreateBrandDto, UpdateBrandDto } from '../types/brand';

export const brandApi = {
  // Get all brands
  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data as Brand[];
  },

  // Get single brand
  getBrand: async (id: string) => {
    const response = await api.get(`/brands/${id}`);
    return response.data as Brand;
  },

  // Create brand
  createBrand: async (data: CreateBrandDto) => {
    const response = await api.post('/brands', data);
    return response.data as Brand;
  },

  // Update brand
  updateBrand: async (id: string, data: UpdateBrandDto) => {
    const response = await api.patch(`/brands/${id}`, data);
    return response.data as Brand;
  },

  // Delete brand
  deleteBrand: async (id: string) => {
    await api.delete(`/brands/${id}`);
  },

  // Upload brand logo
  uploadLogo: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/brands/upload-logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.url;
  },
};