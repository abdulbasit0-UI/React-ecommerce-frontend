import api from "./api";

export const paymentApi = {
  processPayment: async (paymentData: {
    amount: number;
    currency: string;
    paymentMethodId: string;
  }) => {
    const response = await api.post('/payments/process', paymentData);
    return response.data;
  },

  getPaymentMethods: async () => {
    const response = await api.get('/payments/methods');
    return response.data;
  },
};