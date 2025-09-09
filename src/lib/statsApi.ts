import api from './api';
import {
  type StatsOverview,
  type RevenueStats,
  type OrderStats,
  type ProductStats,
  type CustomerStats,
  type RevenueTrend,
  type TopSellingProduct
} from '../types/stats';

export const statsApi = {
  // Get overview statistics
  getOverview: async (): Promise<StatsOverview> => {
    const response = await api.get('/stats/overview');
    return response.data;
  },

  // Get revenue statistics
  getRevenue: async (): Promise<RevenueStats> => {
    const response = await api.get('/stats/revenue');
    return response.data;
  },

  // Get order statistics
  getOrders: async (): Promise<OrderStats> => {
    const response = await api.get('/stats/orders');
    return response.data;
  },

  // Get product statistics
  getProducts: async (): Promise<ProductStats> => {
    const response = await api.get('/stats/products');
    return response.data;
  },

  // Get customer statistics
  getCustomers: async (): Promise<CustomerStats> => {
    const response = await api.get('/stats/customers');
    return response.data;
  },

  // Get revenue trends
  getRevenueTrend: async (days: number = 30): Promise<RevenueTrend[]> => {
    const response = await api.get(`/stats/revenue/trend?days=${days}`);
    return response.data;
  },

  // Get top selling products
  getTopSellingProducts: async (limit: number = 10): Promise<TopSellingProduct[]> => {
    const response = await api.get(`/stats/products/top-selling?limit=${limit}`);
    return response.data;
  }
};
