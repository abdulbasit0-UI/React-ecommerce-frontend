import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../lib/statsApi';

export const useStats = {
  // Overview stats
  useOverview: () => {
    return useQuery({
      queryKey: ['stats', 'overview'],
      queryFn: statsApi.getOverview,
      refetchInterval: 60000, // Refetch every minute
      staleTime: 30000, // Consider data stale after 30 seconds
    });
  },

  // Revenue stats
  useRevenue: () => {
    return useQuery({
      queryKey: ['stats', 'revenue'],
      queryFn: statsApi.getRevenue,
      refetchInterval: 60000,
      staleTime: 30000,
    });
  },

  // Order stats
  useOrders: () => {
    return useQuery({
      queryKey: ['stats', 'orders'],
      queryFn: statsApi.getOrders,
      refetchInterval: 60000,
      staleTime: 30000,
    });
  },

  // Product stats
  useProducts: () => {
    return useQuery({
      queryKey: ['stats', 'products'],
      queryFn: statsApi.getProducts,
      refetchInterval: 60000,
      staleTime: 30000,
    });
  },

  // Customer stats
  useCustomers: () => {
    return useQuery({
      queryKey: ['stats', 'customers'],
      queryFn: statsApi.getCustomers,
      refetchInterval: 60000,
      staleTime: 30000,
    });
  },

  // Revenue trends
  useRevenueTrend: (days: number = 30) => {
    return useQuery({
      queryKey: ['stats', 'revenue-trend', days],
      queryFn: () => statsApi.getRevenueTrend(days),
      refetchInterval: 60000,
      staleTime: 30000,
    });
  },

  // Top selling products
  useTopSellingProducts: (limit: number = 10) => {
    return useQuery({
      queryKey: ['stats', 'top-selling-products', limit],
      queryFn: () => statsApi.getTopSellingProducts(limit),
      refetchInterval: 60000,
      staleTime: 30000,
    });
  }
};
