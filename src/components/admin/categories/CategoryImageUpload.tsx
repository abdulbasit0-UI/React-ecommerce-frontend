import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { useUploadCategoryImage } from '../../../hooks/useCategories';

interface CategoryImageUploadProps {
  image?: string;
  onChange: (image: string) => void;
}

export default function CategoryImageUpload({ image, onChange }: CategoryImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const uploadImage = useUploadCategoryImage();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      setUploading(true);
      try {
        const uploadedUrl = await uploadImage.mutateAsync(acceptedFiles[0]);
        onChange(uploadedUrl);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    },
    [onChange, uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB for category images
    maxFiles: 1,
  });

  const removeImage = () => {
    onChange('');
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
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive
              ? 'Drop the image here'
              : 'Drag & drop image here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            PNG, JPG, WEBP up to 5MB
          </p>
        </div>
      </div>

      {image && (
        <div className="relative inline-block group">
          <img
            src={image}
            alt="Category"
            className="h-32 w-32 object-cover rounded-lg border"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}


