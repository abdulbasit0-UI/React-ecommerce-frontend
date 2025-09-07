import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { useUploadBrandLogo } from '../../../hooks/useBrands';

interface BrandLogoUploadProps {
  logo?: string;
  onChange: (logo: string) => void;
}

export default function BrandLogoUpload({ logo, onChange }: BrandLogoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const uploadLogo = useUploadBrandLogo();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      
      setUploading(true);
      try {
        const uploadedUrl = await uploadLogo.mutateAsync(acceptedFiles[0]);
        onChange(uploadedUrl);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    },
    [onChange, uploadLogo]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB for logos
    maxFiles: 1,
  });

  const removeLogo = () => {
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
              ? 'Drop the logo here'
              : 'Drag & drop logo here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            PNG, JPG, WEBP up to 2MB
          </p>
        </div>
      </div>

      {logo && (
        <div className="relative inline-block group">
          <img
            src={logo}
            alt="Brand logo"
            className="h-24 w-24 object-cover rounded-lg border"
          />
          <button
            onClick={removeLogo}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}