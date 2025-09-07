import { orderApi } from '@/lib/orderApi';
import { paymentApi } from '@/lib/paymentApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: ({ orderId, successUrl, cancelUrl }: {
      orderId: string;
      successUrl: string;
      cancelUrl: string;
    }) => orderApi.createCheckoutSession(orderId, successUrl, cancelUrl),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create checkout session');
    },
  });
};

export const useProcessPayment = () => {
  return useMutation({
    mutationFn: paymentApi.processPayment,
    onSuccess: () => {
      toast.success('Payment processed successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Payment failed');
    },
  });
};