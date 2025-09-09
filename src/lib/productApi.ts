import type { CreateProductDto, PaginatedResponse, Product, ProductFilters, UpdateProductDto } from "@/types/product";
import api from "./api";

// src/lib/api/productApi.ts
export const productApi = {
  // Enhanced getProducts with all filter options
  getProducts: async (page = 1, limit = 10, filters?: ProductFilters) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.brandId) params.append('brandId', filters.brandId);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.inStock) params.append('inStock', filters.inStock.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get(`/products?${params}`);
    return response.data as PaginatedResponse<Product>;
  },

  // Get product by slug
  getProductBySlug: async (slug: string) => {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data as Product;
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    const response = await api.get(`/products/featured?limit=${limit}`);
    return response.data.data as Product[];
  },

  // Get trending products
  getTrendingProducts: async (limit = 8) => {
    const response = await api.get(`/products/trending?limit=${limit}`);
    return response.data.data as Product[];
  },

  // Keep existing methods...
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data as Product;
  },

  createProduct: async (data: CreateProductDto) => {
    const response = await api.post('/products', data);
    return response.data as Product;
  },

  updateProduct: async (id: string, data: UpdateProductDto) => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data as Product;
  },

  deleteProduct: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.imageUrl;
  },

  uploadMultipleImages: async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(file => productApi.uploadImage(file));
    return Promise.all(uploadPromises);
  },
};