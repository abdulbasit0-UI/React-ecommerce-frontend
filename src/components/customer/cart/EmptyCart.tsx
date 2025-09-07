import { ShoppingBag } from 'lucide-react';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link to="/shop">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}