export interface Category {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateCategoryDto {
    name: string;
    description?: string;
    isActive?: boolean;
  }
  
  export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}