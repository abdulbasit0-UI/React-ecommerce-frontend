// src/hooks/useUser.ts (Complete version)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { UpdateProfileDto, Address } from '../types/user';
import { userApi } from '@/lib/userApi';

// Profile hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.getProfile,
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: userApi.getCustomers,
  });
};




export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => userApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully');
      return data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Avatar updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload avatar');
    },
  });
};

// Address hooks
export const useUserAddresses = () => {
  
  return useQuery({
    queryKey: ['userAddresses'],
    queryFn: userApi.getAddresses,
    
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (address: Omit<Address, 'id'>) => userApi.createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
      toast.success('Address added successfully');
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, address }: { id: string; address: Partial<Address> }) => 
      userApi.updateAddress(id, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
      toast.success('Address updated successfully');
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => userApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
      toast.success('Address deleted successfully');
    },
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => userApi.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
      toast.success('Default address updated');
    },
  });
};

// Order hooks
export const useMyOrders = (page = 1, limit = 10, status?: string) => {
  return useQuery({
    queryKey: ['myOrders', page, limit, status],
    queryFn: () => userApi.getMyOrders(page, limit, status),
  });
};

export const useMyOrderStats = () => {
  return useQuery({
    queryKey: ['myOrderStats'],
    queryFn: userApi.getMyOrderStats,
  });
};

export const useUserOrder = (id: string) => {
  return useQuery({
    queryKey: ['userOrder', id],
    queryFn: () => userApi.getMyOrder(id),
    enabled: !!id,
  });
};

// Wishlist hooks
export const useUserWishlist = () => {
  return useQuery({
    queryKey: ['userWishlist'],
    queryFn: userApi.getMyWishlist,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => userApi.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      toast.success('Added to wishlist');
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => userApi.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWishlist'] });
      toast.success('Removed from wishlist');
    },
  });
};

// Notification hooks
export const useUserNotifications = (page = 1, limit = 20, unread?: boolean) => {
  return useQuery({
    queryKey: ['userNotifications', page, limit, unread],
    queryFn: () => userApi.getMyNotifications(page, limit, unread),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => userApi.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => userApi.markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      toast.success('All notifications marked as read');
    },
  });
};