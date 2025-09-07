// src/pages/customer/UserAccount.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDashboardLayout from '../../components/customer/user/UserDashboardLayout';
import UserOverview from '../../components/customer/user/UserOverview';
import UserOrders from '../../components/customer/user/UserOrders';
import UserProfile from '../../components/customer/user/UserProfile';
import UserAddresses from './user/UserAddresses';
import UserWishlist from './user/UserWishlist';
import UserSettings from './user/UserSettings';

export default function UserAccount() {
  return (
    <UserDashboardLayout>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<UserOverview />} />
        <Route path="orders" element={<UserOrders />} />
        {/* <Route path="orders/:id" element={<UserOrderDetail />} /> */}
        <Route path="profile" element={<UserProfile />} />
        <Route path="addresses" element={<UserAddresses />} />
        <Route path="wishlist" element={<UserWishlist />} />
        <Route path="settings" element={<UserSettings />} />
      </Routes>
    </UserDashboardLayout>
  );
}