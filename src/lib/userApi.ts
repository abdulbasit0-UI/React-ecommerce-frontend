// src/lib/api/userApi.ts (Complete version)
import type { OrderResponseDto } from '@/types/order';
import type { Product } from '@/types/product';
import type { UserProfile, UpdateProfileDto, Address } from '../types/user';
import api from './api';

export const userApi = {
  // Profile management
  getProfile: async (): Promise<UserProfile> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.get(`/users/${user.id}`);
    return response.data;
  },

  getCustomers: async (): Promise<UserProfile[]> => {
    const response = await api.get('/users/customers');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileDto): Promise<UserProfile> => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.url;
  },

  // Address management
  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get('/users/me/addresses');
    return response.data;
  },

  createAddress: async (address: Omit<Address, 'id'>): Promise<Address> => {
    const response = await api.post('/users/me/addresses', address);
    return response.data;
  },

  updateAddress: async (id: string, address: Partial<Address>): Promise<Address> => {
    const response = await api.patch(`/users/me/addresses/${id}`, address);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<void> => {
    await api.delete(`/users/me/addresses/${id}`);
  },

  setDefaultAddress: async (id: string): Promise<Address> => {
    const response = await api.patch(`/users/me/addresses/${id}/default`);
    return response.data;
  },

  // User orders
  getMyOrders: async (page = 1, limit = 10, status?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append('status', status);

    const response = await api.get(`/users/me/orders?${params}`);
    return response.data;
  },

  getMyOrderStats: async () => {
    const response = await api.get('/users/me/orders/stats');
    return response.data;
  },

  getMyOrder: async (id: string): Promise<OrderResponseDto> => {
    const response = await api.get(`/users/me/orders/${id}`);
    return response.data;
  },

  // Wishlist (new base path)
  getMyWishlist: async (): Promise<Product[]> => {
    const response = await api.get('/wishlist/me');
    return response.data as Product[];
  },

  addToWishlist: async (productId: string): Promise<{ success: boolean }> => {
    const response = await api.post(`/wishlist/me/${productId}`);
    return response.data as { success: boolean };
  },

  removeFromWishlist: async (productId: string): Promise<void> => {
    await api.delete(`/wishlist/me/${productId}`);
  },

  // Notifications
  getMyNotifications: async (page = 1, limit = 20, unread?: boolean) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (unread !== undefined) params.append('unread', unread.toString());
    const response = await api.get(`/users/me/notifications?${params}`);
    return response.data;
  },
  markNotificationAsRead: async (id: string): Promise<void> => {
    await api.patch(`/users/me/notifications/${id}/read`);
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await api.patch('/users/me/notifications/read-all');
  }
}