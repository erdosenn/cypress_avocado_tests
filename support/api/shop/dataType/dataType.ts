export interface CategoryData {
  parent_id?: number;
  translations?: {
    pl_PL: {
      name: string;
      active: boolean;
    };
  };
}

export interface ProductData {
  category_id: number;
  code?: string;
  pkwiu?: string;
  stock?: {
    price?: number;
    stock?: number;
  };
  translations?: {
    pl_PL: {
      name: string;
      active: boolean;
    };
  };
}

export interface OrderData {
  status_id: number;
}

export interface AddressData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
}
