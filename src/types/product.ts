export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  categoryName?: string;
  brandId: string;
  brandName?: string;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

  export interface CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock?: number;
    images: string[];
    categoryId: string;
    brandId: string;
    isActive?: boolean;
  }
  
  export interface UpdateProductDto extends Partial<CreateProductDto> {}
  
  export interface ProductFilters {
    search?: string;
    categoryId?: string;
    brandId?: string;
    isActive?: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      lastPage: number;
      perPage: number;
    };
  }