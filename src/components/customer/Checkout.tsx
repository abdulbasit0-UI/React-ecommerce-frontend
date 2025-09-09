import { useState } from 'react';
import CheckoutSteps from '../../components/customer/checkout/CheckoutSteps';
import CheckoutForm from '../../components/customer/checkout/CheckoutForm';
import OrderSummary from '../../components/customer/checkout/OrderSummary';
import StripeProvider from '../../components/providers/StripeProvider';
import { useMyCart } from '@/hooks/useCart';
export default function Checkout() {
  const { data: cart, isLoading } = useMyCart();
  const items = cart?.items || [];
const [currentStep, setCurrentStep] = useState(1);

  const subtotal = cart?.total || 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };


  if (!isLoading && items.length === 0) {
    window.location.href = '/cart';
    return null;
  }

  return (
    <StripeProvider>
        <title>Secure Checkout</title>
        <meta name="description" content={`Complete your order securely. ${items.length} item${items.length !== 1 ? 's' : ''} in your cart. Total: $${total.toFixed(2)}. Fast shipping and secure payment processing.`} />
        <meta name="keywords" content="checkout, secure payment, order, stripe, ecommerce, fast shipping" />
        <meta name="url" content="/checkout" />
        <meta name="noindex" content="true" />
        <meta name="nofollow" content="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
        
        <CheckoutSteps currentStep={currentStep} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <CheckoutForm
              currentStep={currentStep}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          </div>
          
          <div className="lg:col-span-1">
            {!isLoading && (
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                items={items}
              />
            )}
          </div>
        </div>
      </div>
    </StripeProvider>
  );
}