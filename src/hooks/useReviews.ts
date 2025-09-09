import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reviewApi, type Review, type CreateReviewDto } from '@/lib/reviewApi';

export const useProductReviews = (productId: string) => {
  return useQuery<Review[]>({
    queryKey: ['productReviews', productId],
    queryFn: () => reviewApi.getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewDto) => reviewApi.createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      toast.success('Review submitted');
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to submit review';
      toast.error(message);
    },
  });
};

export const useMarkReviewHelpful = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => reviewApi.markHelpful(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews'] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to mark as helpful';
      toast.error(message);
    },
  });
};

export const useProductRating = (productId: string) => {
  const { data: reviews = [], isLoading } = useProductReviews(productId);
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  
  return {
    rating: averageRating,
    reviewCount: reviews.length,
    isLoading
  };
};


