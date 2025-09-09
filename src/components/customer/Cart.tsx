import { useNavigate } from 'react-router-dom';
import CartItems from '../../components/customer/cart/CartItems';
import CartSummary from '../../components/customer/cart/CartSummary';
import EmptyCart from '../../components/customer/cart/EmptyCart';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useMyCart } from '@/hooks/useCart';

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart, isLoading } = useMyCart();
  const items = cart?.items || [];
  const subtotal = cart?.total || 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (!isLoading && items.length === 0) {
    return (
      <>
          <title>Shopping Cart - Empty</title>
          <meta name="description" content="Your shopping cart is empty. Continue shopping to add items to your cart." />
        <meta name="keywords" content="shopping cart, empty cart, continue shopping, ecommerce" />
        <meta name="url" content="/cart" />
        <meta name="noindex" content="true" />
        <EmptyCart />
      </>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
        <title>Shopping Cart</title>
        <meta name="description" content={`Review your ${items.length} item${items.length !== 1 ? 's' : ''} in your shopping cart. Total: $${total.toFixed(2)}. Secure checkout with fast shipping.`} />
        <meta name="keywords" content="shopping cart, checkout, review order, ecommerce, secure payment" />
        <meta name="url" content="/cart" />
        <meta name="noindex" content="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isLoading ? 'Loading your cart...' : (
            <>You have {items.length} item{items.length !== 1 ? 's' : ''} in your cart</>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!isLoading && <CartItems items={items} />}
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
      </div>
    </>
  );
}