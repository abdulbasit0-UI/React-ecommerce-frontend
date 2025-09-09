import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { useProductReviews, useCreateReview, useMarkReviewHelpful } from '@/hooks/useReviews';
import { useForm } from 'react-hook-form';

interface ProductReviewsProps {
  productId: string;
}

interface ReviewFormValues {
  rating: number;
  comment: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: reviews = [], isLoading } = useProductReviews(productId);
  const createReview = useCreateReview(productId);
  const markHelpful = useMarkReviewHelpful();

  const { register, handleSubmit, reset } = useForm<ReviewFormValues>({
    defaultValues: { rating: 5, comment: '' },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    await createReview.mutateAsync({ rating: Number(values.rating), comment: values.comment });
    reset({ rating: 5, comment: '' });
  };

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center gap-4 mb-3">
          <label className="text-sm">Rating:</label>
          <select className="border rounded p-1" {...register('rating', { valueAsNumber: true })}>
            {[5,4,3,2,1].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <textarea className="w-full border rounded p-2 mb-3" placeholder="Write your review" {...register('comment')} />
        <Button type="submit" disabled={createReview.isPending}>Submit Review</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review.</p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{(review.userName || 'U').charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{review.userName || 'Anonymous'}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 dark:text-gray-400"
                    onClick={() => markHelpful.mutate(review.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpfulCount})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}