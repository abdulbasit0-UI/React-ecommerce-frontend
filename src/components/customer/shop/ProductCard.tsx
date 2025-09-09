import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Skeleton } from '../../ui/skeleton';
import { useAddCartItem } from '@/hooks/useCart';
import type { Product } from '../../../types/product';
import { useMemo, useState } from 'react';
import { useAddToWishlist, useRemoveFromWishlist, useUserWishlist } from '../../../hooks/useUser';
import { useProductRating } from '../../../hooks/useReviews';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addCartItem = useAddCartItem();
  const { data: wishlist = [] } = useUserWishlist();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const [isToggling, setIsToggling] = useState(false);
  const { rating: averageRating } = useProductRating(product.id);
  

  const isLiked = useMemo(() => {
    return wishlist?.some((p: Product) => p.id === product.id) ?? false;
  }, [wishlist, product.id]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addCartItem.mutateAsync({ productId: product.id, quantity: 1 });
    } catch {
      // errors are surfaced via toast in the hook
    }
  };

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isToggling) return;
    try {
      setIsToggling(true);
      if (isLiked) {
        await removeFromWishlist.mutateAsync(product.id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist.mutateAsync(product.id);
        toast.success('Added to wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.images[0] || '/placeholder-product.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.stock === 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
            )}
            {product.stock && product.stock < 5 && product.stock > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Low Stock</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={toggleLike}
              className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {product.categoryName}
            </p>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({averageRating.toFixed(1)})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.stock && product.stock < 10 && product.stock > 0 && (
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Only {product.stock} left!
                </p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addCartItem.isPending}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Skeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-16" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};