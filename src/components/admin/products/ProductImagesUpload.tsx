import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { useUploadProductImages } from '../../../hooks/useProducts';

interface ProductImagesUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ProductImagesUpload({ images, onChange }: ProductImagesUploadProps) {
  const [uploading, setUploading] = useState(false);
  const uploadImages = useUploadProductImages();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        const uploadedUrls = await uploadImages.mutateAsync(acceptedFiles);
        onChange([...images, ...uploadedUrls]);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, uploadImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {uploading ? (
            <LoadingSpinner className="mx-auto mb-2" />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive
              ? 'Drop the images here'
              : 'Drag & drop images here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            PNG, JPG, WEBP up to 5MB
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}