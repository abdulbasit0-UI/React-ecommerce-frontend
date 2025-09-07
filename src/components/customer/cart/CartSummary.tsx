import { Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, shipping, tax, total, onCheckout }: CartSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span className="text-gray-900 dark:text-white">Total</span>
          <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90" 
        onClick={onCheckout}
        disabled={subtotal === 0}
      >
        Proceed to Checkout
      </Button>

      {/* Benefits */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Truck className="h-4 w-4" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-4 w-4" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <RefreshCw className="h-4 w-4" />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
}