import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; href: string }>;
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 shadow-xl z-50 lg:hidden transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Quick Actions */}
          <div className="space-y-2">
            <Link
              to="/account/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Link>
            <Link
              to="/account/orders"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              My Orders
            </Link>
            <Link
              to="/account"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              My Account
            </Link>
          </div>

          <Separator className="my-4" />

          {/* Categories */}
          <div className="space-y-2">
            <h3 className="px-4 text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'].map((category) => (
              <Link
                key={category}
                to={`/categories/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Brands */}
          <div className="space-y-2">
            <h3 className="px-4 text-sm font-semibold text-gray-900 dark:text-white">Top Brands</h3>
            {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'].map((brand) => (
              <Link
                key={brand}
                to={`/brands/${brand.toLowerCase()}`}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {brand}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-2">
            <Link to="/contact" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Link>
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <p>© 2024 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}