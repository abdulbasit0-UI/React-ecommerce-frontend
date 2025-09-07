import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../shop/ProductCard';
import { useProducts } from '../../../hooks/useProducts';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { data, isLoading } = useProducts(1, 4, { categoryId });

  if (isLoading) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const relatedProducts = data?.pages[0]?.data.filter(p => p.id !== currentProductId) || [];

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Products</h2>
        <Link
          to={`/shop?category=${categoryId}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}