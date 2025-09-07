import { Routes, Route } from 'react-router-dom';
import CustomerLayout from '../components/customer/layout/CustomerLayout';
import Home from '@/components/customer/Home';
import Shop from '@/components/customer/Shop';
import Cart from '@/components/customer/Cart';
import Checkout from '@/components/customer/Checkout';
import ProductDetail from '@/components/customer/ProductDetail';
import OrderSuccess from '@/components/customer/OrderSuccess';
import UserAccount from '@/components/customer/UserAccount';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="account/*" element={<UserAccount />} /> {/* Added /* for nested routes */}
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="categories" element={<Shop />} />
        <Route path="categories/:category" element={<Shop />} />
        <Route path="brands" element={<Shop />} />
        <Route path="brands/:brand" element={<Shop />} />
      </Route>
    </Routes>
  );
}