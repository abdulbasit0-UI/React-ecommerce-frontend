import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle,  Home } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const orderId = searchParams.get('orderId') || 'ORD-12345';

  useEffect(() => {
    // Clear cart when order is successful
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
            <p className="font-mono font-semibold text-lg">{orderId}</p>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            You will receive a confirmation email shortly with your order details and tracking information.
          </p>
          
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/orders" className="block">
              <Button variant="outline" className="w-full">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}