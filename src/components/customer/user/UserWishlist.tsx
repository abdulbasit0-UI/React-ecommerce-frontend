// src/components/customer/user/UserWishlist.tsx
import { useUserWishlist, useRemoveFromWishlist } from '../../../hooks/useUser';
import { Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import type { Product } from '../../../types/product';
import { toast } from 'sonner';

export default function UserWishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: wishlist = [], isLoading } = useUserWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const handleAddToCart = (product: Product) => {
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
    toast.success('Added to cart');
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist.mutateAsync(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

//   const handleAddToWishlist = async (productId: string) => {
//     try {
//       await addToWishlist.mutateAsync(productId);
//       toast.success('Added to wishlist');
//     } catch (error) {
//       toast.error('Failed to add to wishlist');
//     }
//   };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span className="text-gray-600 dark:text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Save items you love and we'll notify you when they're back in stock or on sale.
            </p>
            <Button onClick={() => navigate('/shop')}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product: Product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.images[0] || '/placeholder-product.png'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.categoryName}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.stock && product.stock < 10 && product.stock > 0 && (
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Only {product.stock} left!
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}