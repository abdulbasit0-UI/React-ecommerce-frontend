export interface CreateOrderDto {
    items: {
      productId: string;
      quantity: number;
    }[];
    shippingAddress: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }
  
  export interface OrderResponseDto {
    id: string;
    userId: string;
    total: number;
    status: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    stripeSessionId?: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    items: {
      id: string;
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      image?: string;
    }[];
  }
  
  export interface CheckoutSession {
    sessionId: string;
    url: string;
  }