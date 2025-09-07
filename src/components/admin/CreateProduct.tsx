import { useNavigate } from 'react-router-dom';
import { useCreateProduct } from '@/hooks/useProducts';
import type { CreateProductDto } from '@/types/product';
import ProductForm from './products/ProductForm';

export default function CreateProduct() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const handleSubmit = async (data: CreateProductDto) => {
    await createProduct.mutateAsync(data);
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Product</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new product to your store
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <ProductForm onSubmit={handleSubmit} isLoading={createProduct.isPending} />
        </div>
      </div>
    </div>
  );
}