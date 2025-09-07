import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../../types/cart';
import { toast } from 'sonner';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        if (existingItem.quantity + action.payload.quantity <= existingItem.product.stock) {
          existingItem.quantity += action.payload.quantity;
          toast.success('Quantity updated in cart');
        } else {
          toast.error('Not enough stock available');
          return;
        }
      } else {
        state.items.push(action.payload);
        toast.success('Product added to cart');
      }

      // Recalculate totals
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      toast.success('Product removed from cart');
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.product.id === action.payload.productId);
      
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== action.payload.productId);
          toast.success('Product removed from cart');
        } else if (action.payload.quantity <= item.product.stock) {
          item.quantity = action.payload.quantity;
          toast.success('Quantity updated');
        } else {
          toast.error('Not enough stock available');
          return;
        }
        
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      toast.success('Cart cleared');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;