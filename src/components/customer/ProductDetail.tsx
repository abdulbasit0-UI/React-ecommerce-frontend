import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useProduct } from '../../hooks/useProducts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import LoadingSpinner from '../../components/layout/LoadingSpinner';
import ProductInfo from './product/ProductInfo';
import ProductReviews from './product/ProductReviews';
import ProductImages from './product/ProductImages';
import RelatedProducts from './product/RelatedProducts';
import { Helmet } from 'react-helmet';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: product, isLoading } = useProduct(id!);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div>Product not found</div>
      </>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock || 0,
      },
      quantity,
    }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/cart';
  };

  return (
    <>
        <title>{product.name + " - E-Commerce Store"}</title>
        <meta name="description" content={product.description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <ProductImages
            images={product.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.categoryName}</Badge>
              <Badge variant="outline">{product.brandName}</Badge>
              {product.stock === 0 && <Badge variant="destructive">Out of Stock</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">(4.8) • 124 reviews</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
            {product.stock && product.stock < 10 && product.stock > 0 && (
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Only {product.stock} items left in stock!
              </p>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description || 'No description available for this product.'}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                disabled={quantity >= (product.stock || 999)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'border-red-500 text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            Buy Now
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</p>
            </div>
            <div className="text-center">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <ProductInfo product={product} />

      {/* Reviews Section */}
      <ProductReviews productId={product.id} />

      {/* Related Products */}
      <RelatedProducts
        categoryId={product.categoryId} 
        currentProductId={product.id} 
      />
      </div>
    </>
  );
}