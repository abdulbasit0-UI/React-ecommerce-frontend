import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/category';
import type { Brand } from '@/types/brand';

interface ShopFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string | null; // slug
  selectedBrand?: string | null; // slug
  onCategoryChange: (category: string | null) => void; // expects slug
  onBrandChange: (brand: string | null) => void; // expects slug
}

export default function ShopFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: ShopFiltersProps) {
  const clearFilters = () => {
    onCategoryChange(null);
    onBrandChange(null);
  };

  const hasActiveFilters = selectedCategory || selectedBrand;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={selectedCategory || 'all'}
          onValueChange={(value) => onCategoryChange(value === 'all' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory && (
          <Badge variant="secondary" className="mt-1">
            {categories.find(c => c.slug === selectedCategory)?.name}
            <button
              onClick={() => onCategoryChange(null)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <Select
          value={selectedBrand || 'all'}
          onValueChange={(value) => onBrandChange(value === 'all' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedBrand && (
          <Badge variant="secondary" className="mt-1">
            {brands.find(b => b.slug === selectedBrand)?.name}
            <button
              onClick={() => onBrandChange(null)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Max"
            className="w-full"
          />
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-2">
        <Label>Stock Status</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
}