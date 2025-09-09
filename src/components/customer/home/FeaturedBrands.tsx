import { Link } from 'react-router-dom';
import { useBrands } from '@/hooks/useBrands';
import LoadingSpinner from '../../layout/LoadingSpinner';

export default function FeaturedBrands() {
  const { data: brands = [], isLoading } = useBrands();
  const displayed = brands.slice(0, 12);
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Brands</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Shop from your favorite brands
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {displayed.map((brand) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${encodeURIComponent(brand.slug)}`}
              className="group flex flex-col items-center"
            >
              <div className="w-32 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                <img
                  src={brand.logo || '/placeholder-brand.png'}
                  alt={brand.name}
                  className="max-w-20 max-h-12 object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">
                {brand.name}
              </p>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}