import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import type { Product } from '../../../types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="py-12">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.description || 'No detailed description available for this product.'}</p>
            <h4>Key Features:</h4>
            <ul>
              <li>High-quality materials and construction</li>
              <li>Designed for comfort and durability</li>
              <li>Perfect for everyday use</li>
              <li>Available in multiple sizes and colors</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Product Details</h4>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Brand:</dt>
                  <dd>{product.brandName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Category:</dt>
                  <dd>{product.categoryName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">SKU:</dt>
                  <dd>{product.id}</dd>
                </div>
              </dl>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Dimensions & Weight</h4>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Weight:</dt>
                  <dd>1.2 lbs</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Dimensions:</dt>
                  <dd>10 × 8 × 4 inches</dd>
                </div>
              </dl>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Shipping Information</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Free standard shipping on orders over $50</li>
                <li>• Express shipping available for $9.99</li>
                <li>• International shipping to select countries</li>
                <li>• Estimated delivery: 3-7 business days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Return Policy</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• 30-day return window</li>
                <li>• Items must be unused and in original packaging</li>
                <li>• Free returns on defective items</li>
                <li>• Refund processed within 5-7 business days</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}