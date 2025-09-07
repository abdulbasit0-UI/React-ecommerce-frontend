import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '../../ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice';
import type { Product } from '../../../types/product';
import { useState } from 'react';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({ products, title = "Featured Products", subtitle = "Handpicked items you'll love" }: FeaturedProductsProps) {
    console.log(products);
  const dispatch = useDispatch();
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

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
  };

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0] || '/placeholder-product.png'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
                      }`}
                  />
                </button>
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.categoryName}
                  </p>
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(4.8)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    {product.stock && product.stock < 10 && (
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        Only {product.stock} left!
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}