import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface ProductImagesProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export default function ProductImages({ images, selectedImage, onImageSelect }: ProductImagesProps) {
  const currentImages = images.length > 0 ? images : ['/placeholder-product.png'];

  const nextImage = () => {
    onImageSelect((selectedImage + 1) % currentImages.length);
  };

  const prevImage = () => {
    onImageSelect((selectedImage - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={currentImages[selectedImage]}
          alt="Product"
          className="w-full h-full object-cover"
        />
        
        {currentImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {currentImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedImage === index
                  ? 'border-primary'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}