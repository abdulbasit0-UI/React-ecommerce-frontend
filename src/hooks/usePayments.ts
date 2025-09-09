import { orderApi } from '@/lib/orderApi';
import { paymentApi } from '@/lib/paymentApi';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: ({ orderId, successUrl, cancelUrl }: {
      orderId: string;
      successUrl: string;
      cancelUrl: string;
    }) => orderApi.createCheckoutSession(orderId, successUrl, cancelUrl),
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string || 'Failed to create checkout session');
    },
  });
};

export const useProcessPayment = () => {
  return useMutation({
    mutationFn: paymentApi.processPayment,
    onSuccess: () => {
      toast.success('Payment processed successfully');
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string || 'Payment failed');
    },
  });
};