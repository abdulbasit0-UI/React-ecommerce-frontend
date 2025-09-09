import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import LoadingSpinner from '../../layout/LoadingSpinner';
import type { Category, CreateCategoryDto } from '../../../types/category';
import { categorySchema } from '../../../lib/categoryValidation';
import CategoryImageUpload from './CategoryImageUpload';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CreateCategoryDto) => Promise<void>;
  isLoading?: boolean;
}

export default function CategoryForm({ category, onSubmit, isLoading }: CategoryFormProps) {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCategoryDto>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || {
      name: '',
      description: '',
      image: '',
      isActive: true,
    },
  });

  const image = watch('image');

  const handleFormSubmit = async (data: CreateCategoryDto) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Enter category name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter category description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Category Image</Label>
        <CategoryImageUpload
          image={image}
          onChange={(newImage) => setValue('image', newImage)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isActive">Status</Label>
        <Select
          value={watch('isActive')?.toString()}
          onValueChange={(value) => setValue('isActive', value === 'true')}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            category ? 'Update Category' : 'Create Category'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/categories')}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}