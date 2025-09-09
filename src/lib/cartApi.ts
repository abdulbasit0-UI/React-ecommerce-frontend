import api from './api';
import type { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

export interface ServerCartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
  lineTotal: number;
}

export interface ServerCartResponse {
  items: ServerCartItem[];
  total: number;
  itemCount: number;
}

// Session ID management for guests
export const sessionManager = {
  getSessionId: (): string => {
    if (typeof window === 'undefined') return '';
    
    let sessionId = localStorage.getItem('cart-session-id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('cart-session-id', sessionId);
    }
    return sessionId;
  },

  clearSessionId: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart-session-id');
    }
  },

  // Add session ID to request headers
  getCartHeaders: (): Record<string, string> => {
    const sessionId = sessionManager.getSessionId();
    return {
      'x-session-id': sessionId,
    };
  }
};

export const cartApi = {
  getMyCart: async (): Promise<ServerCartResponse> => {
    const response = await api.get('/cart', {
      headers: sessionManager.getCartHeaders(),
    });
    return response.data as ServerCartResponse;
  },

  addItem: async (params: { productId: string; quantity: number }) => {
    const response = await api.post('/cart/add', params, {
      headers: sessionManager.getCartHeaders(),
    });
    return response.data as ServerCartItem;
  },

  updateItem: async (productId: string, quantity: number) => {
    const response = await api.put('/cart/update', { productId, quantity }, {
      headers: sessionManager.getCartHeaders(),
    });
    return response.data as ServerCartItem;
  },

  removeItem: async (productId: string): Promise<void> => {
    await api.delete(`/cart/remove/${productId}`, {
      headers: sessionManager.getCartHeaders(),
    });
  },

  clearCart: async (): Promise<void> => {
    await api.delete('/cart/clear', {
      headers: sessionManager.getCartHeaders(),
    });
  },

  // New method to merge guest cart when user logs in
  mergeGuestCart: async (): Promise<void> => {
    await api.post('/cart/merge', {}, {
      headers: sessionManager.getCartHeaders(),
    });
  },

  // Get cart item count for badge/header display
  getCartCount: async (): Promise<{ count: number }> => {
    const response = await api.get('/cart/count', {
      headers: sessionManager.getCartHeaders(),
    });
    return response.data;
  },
};

