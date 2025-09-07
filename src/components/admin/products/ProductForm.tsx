import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import LoadingSpinner from '../../layout/LoadingSpinner';
import ProductImagesUpload from './ProductImagesUpload';
import { useCategories } from '../../../hooks/useCategories';
import type { Product, CreateProductDto } from '../../../types/product';
import { productSchema } from '@/lib/productValidation';
import { useBrands } from '@/hooks/useBrands';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductDto) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      categoryId: '',
      brandId: '',
      isActive: true,
    },
  });

  const images = watch('images') || [];

  const handleFormSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    await onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <Select
            value={watch('categoryId')}
            onValueChange={(value) => setValue('categoryId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandId">Brand *</Label>
          <Select
            value={watch('brandId')}
            onValueChange={(value) => setValue('brandId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.brandId && (
            <p className="text-sm text-red-500">{errors.brandId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-sm text-red-500">{errors.stock.message}</p>
          )}
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter product description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Product Images</Label>
        <ProductImagesUpload
          images={images}
          onChange={(newImages) => setValue('images', newImages)}
        />
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
            product ? 'Update Product' : 'Create Product'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/products')}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}