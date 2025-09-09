import type { Product } from '../../../types/product';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="py-12">
      
        
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.description || 'No detailed description available for this product.'}</p>
          </div>
    </div>
  );
}