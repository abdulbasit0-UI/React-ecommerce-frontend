import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/useCategories';
import type { Category, CreateCategoryDto } from '@/types/category';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CategoryTable from './categories/CategoryTable';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import CategoryForm from './categories/CategoryForm';


export default function Categories() {
  const [search, setSearch] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (data: CreateCategoryDto) => {
    if (editingCategory) {
      await updateCategory.mutateAsync({ id: editingCategory.id, data: { ...data, id: editingCategory.id } });
    } else {
      await createCategory.mutateAsync(data);
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product categories
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <CategoryTable
        data={filteredCategories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteCategory.mutate}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Update category information'
                : 'Add a new category to your store'}
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            category={editingCategory || undefined}
            onSubmit={handleSubmit}
            isLoading={createCategory.isPending || updateCategory.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}