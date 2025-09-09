import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cartApi, sessionManager, type ServerCartResponse, } from '@/lib/cartApi';

export const useMyCart = () => {
  return useQuery<ServerCartResponse>({
    queryKey: ['cart'],
    queryFn: cartApi.getMyCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCartCount = () => {
  return useQuery({
    queryKey: ['cart', 'count'],
    queryFn: cartApi.getCartCount,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data.count,
  });
};

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { productId: string; quantity: number }) => cartApi.addItem(params),
    onSuccess: () => {
      // Invalidate both cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart', {
        position: 'top-center',
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add to cart';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => 
      cartApi.updateItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart updated', {
        position: 'top-center',
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to update cart';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => cartApi.removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed', {
        position: 'top-center',
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to remove item';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart cleared', {
        position: 'top-center',
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to clear cart';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};

// Hook to merge guest cart when user logs in
export const useMergeGuestCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.mergeGuestCart(),
    onSuccess: () => {
      // Clear the guest session after merging
      sessionManager.clearSessionId();
      // Refresh cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart synced with your account', {
        position: 'top-center',
      });
    },
    onError: (error: unknown) => {
      console.error('Failed to merge guest cart:', error);
      // Don't show toast for this error as it might be confusing for users
    },
  });
};

// Enhanced cart hook with additional utilities
export const useCartActions = () => {
  const addItem = useAddCartItem();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const clearCart = useClearCart();
  const mergeGuestCart = useMergeGuestCart();
  const { data: cart, isLoading, error } = useMyCart();
  const { data: cartCount } = useCartCount();

  // Helper function to check if product is in cart
  const isInCart = (productId: string): boolean => {
    return cart?.items.some(item => item.productId === productId) || false;
  };

  // Helper function to get quantity of specific product
  const getProductQuantity = (productId: string): number => {
    const item = cart?.items.find(item => item.productId === productId);
    return item?.quantity || 0;
  };

  // Helper function to increment quantity (or add if not in cart)
  const incrementQuantity = (productId: string) => {
    const currentQuantity = getProductQuantity(productId);
    if (currentQuantity === 0) {
      addItem.mutate({ productId, quantity: 1 });
    } else {
      updateItem.mutate({ productId, quantity: currentQuantity + 1 });
    }
  };

  // Helper function to decrement quantity (or remove if quantity becomes 0)
  const decrementQuantity = (productId: string) => {
    const currentQuantity = getProductQuantity(productId);
    if (currentQuantity > 1) {
      updateItem.mutate({ productId, quantity: currentQuantity - 1 });
    } else if (currentQuantity === 1) {
      removeItem.mutate(productId);
    }
  };

  return {
    cart,
    cartCount,
    isLoading,
    error,
    actions: {
      addItem: addItem.mutate,
      updateItem: updateItem.mutate,
      removeItem: removeItem.mutate,
      clearCart: clearCart.mutate,
      mergeGuestCart: mergeGuestCart.mutate,
      incrementQuantity,
      decrementQuantity,
    },
    helpers: {
      isInCart,
      getProductQuantity,
    },
    mutations: {
      addItem,
      updateItem,
      removeItem,
      clearCart,
      mergeGuestCart,
    }
  };
};
