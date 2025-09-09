import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import LoadingSpinner from '../../layout/LoadingSpinner';

export default function FeaturedCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const displayed = categories.slice(0, 8);
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover our wide range of product categories
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={category.image || '/placeholder-category.png'}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200">Explore products</p>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}