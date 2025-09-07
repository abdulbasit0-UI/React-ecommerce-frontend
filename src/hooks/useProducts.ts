import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Product, CreateProductDto, UpdateProductDto, ProductFilters } from '../types/product';
import { productApi } from '@/lib/productApi';

// Updated to use infinite query for proper pagination
export const useProducts = (page = 1, limit = 10, filters?: ProductFilters, sortBy?: string) => {
  return useInfiniteQuery({
    queryKey: ['products', filters, sortBy, limit],
    queryFn: ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString(),
      });

      if (filters?.search) params.append('search', filters.search);
      if (filters?.categoryId) params.append('categoryId', filters.categoryId);
      if (filters?.brandId) params.append('brandId', filters.brandId);
      if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
      if (sortBy) params.append('sortBy', sortBy);

      return productApi.getProducts(pageParam, limit, filters);
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.meta.lastPage ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: () => productApi.getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productApi.getFeaturedProducts(limit),
  });
};

export const useTrendingProducts = (limit = 8) => {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: () => productApi.getTrendingProducts(limit),
  });
};


export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductDto) => productApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
      productApi.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    },
  });
};

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: (files: File[]) => productApi.uploadMultipleImages(files),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload images');
    },
  });
};