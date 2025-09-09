import { useStats } from '../../../hooks/useStats';
import { Loader2, TrendingUp } from 'lucide-react';

export default function TopProducts() {
  const { data: topProducts, isLoading, error } = useStats.useTopSellingProducts(5);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
        <div className="flex items-center justify-center h-[200px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-gray-600 dark:text-gray-400">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Failed to load products</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Selling Products</h3>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {topProducts && topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <div key={product.productId} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {product.totalSold} sold
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No products data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
