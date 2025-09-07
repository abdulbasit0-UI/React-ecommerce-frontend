import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './products/ProductForm';
import { useProduct, useUpdateProduct } from '@/hooks/useProducts';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import type { UpdateProductDto } from '@/types/product';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id!);
  const updateProduct = useUpdateProduct();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSubmit = async (data: UpdateProductDto) => {
    await updateProduct.mutateAsync({ id: id!, data });
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update product information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            isLoading={updateProduct.isPending}
          />
        </div>
      </div>
    </div>
  );
}