import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { useProducts } from '../../../hooks/useProducts';

interface ProductGridProps {
  categoryId?: string;
  brandId?: string;
  searchQuery?: string;
  sortBy?: string;
}

export default function ProductGrid({ categoryId, brandId, searchQuery, sortBy }: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const filters = {
    ...(categoryId && { categoryId }),
    ...(brandId && { brandId }),
    ...(searchQuery && { search: searchQuery }),
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProducts(1, 12, filters, sortBy);

  const products = data?.pages.flatMap(page => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCard.Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
}