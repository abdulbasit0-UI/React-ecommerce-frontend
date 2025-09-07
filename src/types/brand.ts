export interface Brand {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateBrandDto {
    name: string;
    description?: string;
    logo?: string;
    isActive?: boolean;
  }
  
  export interface UpdateBrandDto extends Partial<CreateBrandDto> {}