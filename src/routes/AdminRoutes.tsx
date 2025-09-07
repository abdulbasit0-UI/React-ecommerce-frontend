import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import Products from '../components/admin/Products';
import CreateProduct from '../components/admin/CreateProduct';
import EditProduct from '../components/admin/EditProduct';
import Categories from '../components/admin/Categories';
import CreateCategory from '../components/admin/CreateCategory';
import Brands from '../components/admin/Brands';
import CreateBrand from '../components/admin/CreateBrand';
import EditBrand from '../components/admin/EditBrand';
import EditCategory from '@/components/EditCategory';
import { Orders } from '@/components/admin/Orders';
import { Customers } from '@/components/admin/Customers';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* Product Routes */}
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        
        {/* Category Routes */}
        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />
        
        {/* Brand Routes */}
        <Route path="brands" element={<Brands />} />
        <Route path="brands/create" element={<CreateBrand />} />
        <Route path="brands/:id/edit" element={<EditBrand />} />




        {/* Order Routes */}
        <Route path="orders" element={<Orders />} />

        {/* Customer Routes */}
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}