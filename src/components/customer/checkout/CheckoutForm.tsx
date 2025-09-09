// src/components/checkout/CheckoutForm.tsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Loader2, CreditCard } from 'lucide-react';
import { useCreateOrder } from '@/hooks/useOrders';
import { useCreateCheckoutSession } from '@/hooks/usePayments';
import { useUserAddresses } from '@/hooks/useUser';      // <-- new
import { useMyCart } from '@/hooks/useCart';
const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  country: z.string().min(1, 'Country is required'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface CheckoutFormProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function CheckoutForm({
  currentStep,
  onNext,
  onPrev,
}: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: cart } = useMyCart();
  const items = cart?.items || [];
  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  /* ---------- Saved addresses ---------- */
  const { data: savedAddresses = [] } = useUserAddresses(); // Address[]
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [mode, setMode] = useState<'saved' | 'manual'>(
    savedAddresses.length ? 'saved' : 'manual'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: 'United States' },
  });

  /* Auto-fill when a saved address is picked */
  useEffect(() => {
    if (mode === 'saved' && selectedAddressId) {
      const addr = savedAddresses.find((a) => a.id === selectedAddressId);
      if (addr) {
        setValue('firstName', addr.firstName || '');
        setValue('lastName', addr.lastName || '');
        setValue('email', addr.email || '');
        setValue('phone', addr.phone || '');
        setValue('address', addr.address || '');
        setValue('city', addr.city || '');
        setValue('state', addr.state || '');
        setValue('zipCode', addr.zipCode || '');
        setValue('country', addr.country || 'United States');
      }
    }
  }, [selectedAddressId, mode, savedAddresses, setValue]);

  const onShippingSubmit = (data: ShippingFormData) => {
    sessionStorage.setItem('shippingAddress', JSON.stringify(data));
    onNext();
  };

  const onPaymentSubmit = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setIsProcessing(true);
    const rawShipping = sessionStorage.getItem('shippingAddress');
    const shippingAddress = rawShipping ? JSON.parse(rawShipping) : {};
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingFirstName: shippingAddress.firstName || null,
        shippingLastName: shippingAddress.lastName || null,
        shippingEmail: shippingAddress.email || null,
        shippingPhone: shippingAddress.phone || null,
        shippingAddress: shippingAddress.address || null, // note: field name conflict!
        shippingCity: shippingAddress.city || null,
        shippingState: shippingAddress.state || null,
        shippingZipCode: shippingAddress.zipCode || null,
        shippingCountry: shippingAddress.country || null,
      };
      const order = await createOrder.mutateAsync(orderData);
      const session = await createCheckoutSession.mutateAsync({
        orderId: order.id,
        successUrl: `${window.location.origin}/order-success?orderId=${order.id}`,
        cancelUrl: `${window.location.origin}/checkout`,
      });
      if (session.url) window.location.href = session.url;
      else throw new Error('No checkout URL received');
    } catch (err: unknown) {
      console.error(err);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  /* ---------- Render helpers ---------- */
  const renderSavedPicker = () => {
    if (!savedAddresses.length) return null;
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Use a saved address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select
            value={selectedAddressId ?? undefined}
            onValueChange={(val) => {
              setSelectedAddressId(val);
              setMode('saved');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pick an address…" />
            </SelectTrigger>
            <SelectContent>
              {savedAddresses.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.address}, {a.city}, {a.state} {a.zipCode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="link"
            className="px-0"
            onClick={() => {
              setMode('manual');
              setSelectedAddressId(null);
              reset({ country: 'United States' });
            }}
          >
            Enter a different address
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderManualForm = () => (
    <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register('firstName')} placeholder="John" />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register('lastName')} placeholder="Doe" />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="123 Main Street"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register('city')} placeholder="New York" />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input id="state" {...register('state')} placeholder="NY" />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input id="zipCode" {...register('zipCode')} placeholder="10001" />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Select
          value={watch('country')}
          onValueChange={(val) => setValue('country', val)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Continue to Payment
        </Button>
      </div>
    </form>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {renderSavedPicker()}
            {mode === 'saved' && selectedAddressId && (
              <div className="mb-6 p-4 border rounded-lg bg-muted">
                <p className="font-medium">Selected address</p>
                <p className="text-sm text-muted-foreground">
                  {watch('address')}, {watch('city')}, {watch('state')}{' '}
                  {watch('zipCode')}
                </p>
                <Button
                  variant="link"
                  className="px-0"
                  onClick={() => {
                    setMode('manual');
                    setSelectedAddressId(null);
                    reset({ country: 'United States' });
                  }}
                >
                  Change
                </Button>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={onPrev}>
                    Back
                  </Button>
                  <Button
                    onClick={onPaymentSubmit}
                    disabled={isProcessing}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Payment'
                    )}
                  </Button>
                </div>
              </div>
            )}
            {mode === 'manual' && renderManualForm()}
          </>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        Secure Card Payment
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You'll be redirected to Stripe's secure checkout to
                        complete your payment
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>• SSL encrypted and PCI compliant</p>
                    <p>• Accepts all major credit and debit cards</p>
                    <p>• No card details stored on our servers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                Back
              </Button>
              <Button
                onClick={onPaymentSubmit}
                disabled={isProcessing}
                className="bg-primary hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your order. You will receive a confirmation email
              shortly.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-6">{renderStepContent()}</div>;
}