import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Button } from '../../ui/button';

interface ProductReviewsProps {
  productId: string;
}

const reviews = [
  {
    id: '1',
    user: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    comment: 'Excellent product! Exceeded my expectations in every way.',
    helpful: 12,
  },
  {
    id: '2',
    user: 'Mike Chen',
    rating: 4,
    date: '2024-01-10',
    comment: 'Good quality, fast shipping. Would recommend to others.',
    helpful: 8,
  },
  {
    id: '3',
    user: 'Emily Davis',
    rating: 5,
    date: '2024-01-05',
    comment: 'Amazing! Best purchase I have made this year.',
    helpful: 15,
  },
];

export default function ProductReviews({ productId }: ProductReviewsProps) {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{review.user}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
}