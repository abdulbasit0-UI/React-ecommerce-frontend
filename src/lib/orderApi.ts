import api from './api';
import { type CreateOrderDto, type OrderResponseDto, type CheckoutSession } from '../types/order';

export const orderApi = {
  createOrder: async (data: CreateOrderDto) => {
    console.log(data)
    const response = await api.post('/orders', data);
    return response.data as OrderResponseDto;
  },

  createCheckoutSession: async (
    orderId: string, 
    successUrl: string, 
    cancelUrl: string
  ) => {
    const response = await api.post(`/orders/${orderId}/checkout`, {
      successUrl,
      cancelUrl,
    });
    return response.data as CheckoutSession;
  },

  getOrders: async () => {
    const response = await api.get('/orders');
    console.log(response.data);
    return response.data as OrderResponseDto[];
  },


  getAdminOrders: async () => {
    const response = await api.get('/orders/admin');
    return response.data as OrderResponseDto[];
  },

  getOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data as OrderResponseDto;
  },

  getAdminOrder: async (id: string) => {
    const response = await api.get(`/orders/admin/${id}`);
    return response.data as OrderResponseDto;
  },
};