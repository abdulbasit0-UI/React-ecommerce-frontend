import { useParams, useNavigate } from 'react-router-dom';
import { useCategory, useUpdateCategory } from '@/hooks/useCategories';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import type { UpdateCategoryDto } from '@/types/category';
import CategoryForm from './admin/categories/CategoryForm';

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: category, isLoading } = useCategory(id!);
  const updateCategory = useUpdateCategory();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleSubmit = async (data: UpdateCategoryDto) => {
    await updateCategory.mutateAsync({ id: id!, data });
    navigate('/admin/categories');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Category</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update category information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <CategoryForm
            category={category}
            onSubmit={handleSubmit}
            isLoading={updateCategory.isPending}
          />
        </div>
      </div>
    </div>
  );
}