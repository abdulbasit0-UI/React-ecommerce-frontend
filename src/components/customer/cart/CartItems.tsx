import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../store/slices/cartSlice';
import type { CartItem } from '../../../types/cart';
import { Link } from 'react-router-dom';

interface CartItemsProps {
  items: CartItem[];
}

export default function CartItems({ items }: CartItemsProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex gap-4"
        >
          {/* Product Image */}
          <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
            <img
              src={item.product.images[0] || '/placeholder-product.png'}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link to={`/product/${item.product.id}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ${Number(item.product.price).toFixed(2)} each
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subtotal: ${(Number(item.product.price) * item.quantity).toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}