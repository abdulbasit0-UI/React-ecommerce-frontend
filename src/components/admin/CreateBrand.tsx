import { useNavigate } from 'react-router-dom';
import { useCreateBrand } from '@/hooks/useBrands';
import type { CreateBrandDto } from '@/types/brand';
import BrandForm from './brands/BrandForm';

export default function CreateBrand() {
  const navigate = useNavigate();
  const createBrand = useCreateBrand();

  const handleSubmit = async (data: CreateBrandDto) => {
    await createBrand.mutateAsync(data);
    navigate('/admin/brands');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Brand</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new brand to your store
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <BrandForm onSubmit={handleSubmit} isLoading={createBrand.isPending} />
        </div>
      </div>
    </div>
  );
}