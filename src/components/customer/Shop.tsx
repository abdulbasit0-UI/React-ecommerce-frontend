import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import ProductGrid from '../../components/customer/shop/ProductGrid';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import ShopFilters from './shop/ShopFilters';
import SortOptions from './shop/SortOptions';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();

  const selectedCategorySlug = searchParams.get('category');
  const selectedBrandSlug = searchParams.get('brand');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    searchParams.set('sort', newSort);
    setSearchParams(searchParams);
  };

  const handleFilterChange = (type: 'category' | 'brand', value: string | null) => {
    if (value) {
      searchParams.set(type, value);
    } else {
      searchParams.delete(type);  
    }
    setSearchParams(searchParams);
  };

  // Generate dynamic SEO content based on filters
  const getPageTitle = () => {
    const categoryName = categories.find(c => c.slug === selectedCategorySlug)?.name;
    const brandName = brands.find(b => b.slug === selectedBrandSlug)?.name;
    if (categoryName && brandName) {
      return `${categoryName} by ${brandName} - Shop Online`;
    } else if (categoryName) {
      return `${categoryName} Products - Shop Online`;
    } else if (brandName) {
      return `${brandName} Products - Shop Online`;
    } else if (searchQuery) {
      return `Search Results for "${searchQuery}" - Shop Online`;
    }
    return 'Shop All Products - Online Store';
  };

  const getPageDescription = () => {
    const categoryName = categories.find(c => c.slug === selectedCategorySlug)?.name;
    const brandName = brands.find(b => b.slug === selectedBrandSlug)?.name;
    if (categoryName && brandName) {
      return `Browse ${categoryName} products by ${brandName}. Quality products with fast shipping and secure payment.`;
    } else if (categoryName) {
      return `Discover our collection of ${categoryName} products. Shop quality items with fast shipping and excellent customer service.`;
    } else if (brandName) {
      return `Explore ${brandName} products. Premium quality items with fast shipping and secure payment options.`;
    } else if (searchQuery) {
      return `Search results for "${searchQuery}". Find the perfect products with our advanced search and filtering options.`;
    }
    return 'Browse our complete collection of products. Shop by category, brand, or search for specific items. Fast shipping, secure payment, and excellent customer service.';
  };

  const getKeywords = () => {
    const baseKeywords = 'shop, online shopping, products, ecommerce, buy online';
    const categoryName = categories.find(c => c.slug === selectedCategorySlug)?.name;
    const brandName = brands.find(b => b.slug === selectedBrandSlug)?.name;
    if (categoryName) {
      return `${categoryName}, ${baseKeywords}`;
    }
    if (brandName) {
      return `${brandName}, ${baseKeywords}`;
    }
    if (searchQuery) {
      return `${searchQuery}, search, ${baseKeywords}`;
    }
    return baseKeywords;
  };

  return (
    <>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={getKeywords()} />
        <meta name="url" content="/shop" />
        <meta name="type" content="website" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shop</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover our amazing collection of products
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </form>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <SortOptions value={sortBy} onChange={handleSortChange} />
          
          <div className="hidden sm:flex items-center gap-1 border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <ShopFilters
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategorySlug}
            selectedBrand={selectedBrandSlug}
            onCategoryChange={(categorySlug) => handleFilterChange('category', categorySlug)}
            onBrandChange={(brandSlug) => handleFilterChange('brand', brandSlug)}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid
            categoryId={categories.find(c => c.slug === selectedCategorySlug)?.id || undefined}
            brandId={brands.find(b => b.slug === selectedBrandSlug)?.id || undefined}
            searchQuery={searchQuery || undefined}
            sortBy={sortBy}
          />
        </div>
      </div>
      </div>
    </>
  );
}