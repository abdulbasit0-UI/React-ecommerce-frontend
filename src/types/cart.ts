export interface CartItem {
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      stock: number;
    };
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
  }