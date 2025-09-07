// src/types/user.ts
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    bio?: string;
    preferences: {
      newsletter: boolean;
      smsNotifications: boolean;
      promotionalEmails: boolean;
      orderUpdates: boolean;
    };
    addresses: Address[];
    createdAt: string;
    updatedAt: string;
  }

  export interface AddressType {
    id: string;
    name: string;
  }
  
  export interface Address {
    id: string;
    type: AddressType['id'];
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    email?: string;
    isDefault: boolean;
  }
  
  export interface UpdateProfileDto {
    name?: string;
    phone?: string;
    dateOfBirth?: string;
    bio?: string;
    preferences?: Partial<UserProfile['preferences']>;
  }