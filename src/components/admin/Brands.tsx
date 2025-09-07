import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import BrandForm from './brands/BrandForm';
import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from '@/hooks/useBrands';
import type { Brand, CreateBrandDto } from '@/types/brand';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import BrandTable from './brands/BrandTable';

export default function Brands() {
  const [search, setSearch] = useState('');
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: brands = [], isLoading } = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (data: CreateBrandDto) => {
    if (editingBrand) {
      await updateBrand.mutateAsync({ id: editingBrand.id, data });
    } else {
      await createBrand.mutateAsync(data);
    }
    setIsDialogOpen(false);
    setEditingBrand(null);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingBrand(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Brands</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product brands
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search brands..."
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

      <BrandTable
        data={filteredBrands}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteBrand.mutate}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBrand ? 'Edit Brand' : 'Create Brand'}
            </DialogTitle>
            <DialogDescription>
              {editingBrand
                ? 'Update brand information'
                : 'Add a new brand to your store'}
            </DialogDescription>
          </DialogHeader>
          <BrandForm
            brand={editingBrand || undefined}
            onSubmit={handleSubmit}
            isLoading={createBrand.isPending || updateBrand.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}