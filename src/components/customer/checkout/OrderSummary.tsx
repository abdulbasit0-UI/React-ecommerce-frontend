import { ShoppingBag, Truck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Separator } from '../../ui/separator';
import type { ServerCartItem } from '@/lib/cartApi';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: ServerCartItem[];
}

export default function OrderSummary({ subtotal, shipping, tax, total, items }: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary ({items.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.product.images[0] || '/placeholder-product.png'}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity} × ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <p className="font-medium">
                ${Number(item.lineTotal).toFixed(2)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Truck className="h-4 w-4" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-4 w-4" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
}