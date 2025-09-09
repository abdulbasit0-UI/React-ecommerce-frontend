import { orderApi } from '@/lib/orderApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getOrders,
  });
};

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: orderApi.getAdminOrders,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
  });
};

export const useAdminOrder = (id: string) => {
  return useQuery({
    queryKey: ['admin-order', id],
    queryFn: () => orderApi.getAdminOrder(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created successfully', {
        position: 'top-center',
      });
      return data;
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Failed to create order', {
        position: 'top-center',
      });
    },
  });
};