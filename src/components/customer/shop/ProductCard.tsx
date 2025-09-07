import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Skeleton } from '../../ui/skeleton';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import type { Product } from '../../../types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    console.log(product);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock || 0,
      },
      quantity: 1,
    }));
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
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
                  className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(4.8)</span>
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
              disabled={product.stock === 0}
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