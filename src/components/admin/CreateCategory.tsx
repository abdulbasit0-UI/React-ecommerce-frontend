import { useNavigate } from 'react-router-dom';
import { useCreateCategory } from '@/hooks/useCategories';
import type { CreateCategoryDto } from '@/types/category';
import CategoryForm from './categories/CategoryForm';

export default function CreateCategory() {
  const navigate = useNavigate();
  const createCategory = useCreateCategory();

  const handleSubmit = async (data: CreateCategoryDto) => {
    await createCategory.mutateAsync(data);
    navigate('/admin/categories');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Category</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new category to your store
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <CategoryForm onSubmit={handleSubmit} isLoading={createCategory.isPending} />
        </div>
      </div>
    </div>
  );
}