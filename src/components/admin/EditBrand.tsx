import { useParams, useNavigate } from 'react-router-dom';
import { useBrand, useUpdateBrand } from '@/hooks/useBrands';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import type { UpdateBrandDto } from '@/types/brand';
import BrandForm from './brands/BrandForm';

export default function EditBrand() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: brand, isLoading } = useBrand(id!);
  const updateBrand = useUpdateBrand();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!brand) {
    return <div>Brand not found</div>;
  }

  const handleSubmit = async (data: UpdateBrandDto) => {
    await updateBrand.mutateAsync({ id: id!, data });
    navigate('/admin/brands');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Brand</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update brand information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <BrandForm
            brand={brand}
            onSubmit={handleSubmit}
            isLoading={updateBrand.isPending}
          />
        </div>
      </div>
    </div>
  );
}