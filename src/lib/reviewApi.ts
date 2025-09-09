import api from './api';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  helpfulCount: number;
  createdAt: string;
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
}

export const reviewApi = {
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data as Review[];
  },

  createReview: async (productId: string, data: CreateReviewDto): Promise<Review> => {
    const response = await api.post(`/reviews`, {
      productId,
      ...data,
    });
    return response.data as Review;
  },

  markHelpful: async (reviewId: string): Promise<{ helpfulCount: number }> => {
    const response = await api.post(`/reviews/${reviewId}/helpful`);
    return response.data as { helpfulCount: number };
  },
};


