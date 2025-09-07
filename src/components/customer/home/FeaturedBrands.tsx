import { Link } from 'react-router-dom';

const brands = [
  {
    id: '1',
    name: 'Apple',
    logo: 'https://via.placeholder.com/150x80/000000/FFFFFF?text=Apple',
  },
  {
    id: '2',
    name: 'Samsung',
    logo: 'https://via.placeholder.com/150x80/1428A0/FFFFFF?text=Samsung',
  },
  {
    id: '3',
    name: 'Nike',
    logo: 'https://via.placeholder.com/150x80/111111/FFFFFF?text=Nike',
  },
  {
    id: '4',
    name: 'Adidas',
    logo: 'https://via.placeholder.com/150x80/000000/FFFFFF?text=Adidas',
  },
  {
    id: '5',
    name: 'Sony',
    logo: 'https://via.placeholder.com/150x80/000000/FFFFFF?text=Sony',
  },
  {
    id: '6',
    name: 'LG',
    logo: 'https://via.placeholder.com/150x80/A50034/FFFFFF?text=LG',
  },
];

export default function FeaturedBrands() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Brands</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Shop from your favorite brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.name.toLowerCase()}`}
              className="group flex flex-col items-center"
            >
              <div className="w-32 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                <img
                  src={brand.logo}
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
      </div>
    </section>
  );
}