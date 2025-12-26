export interface InventoryProduct {
  _id: string;
  title: string;
  price: number;
  discount: number;
  actualPrice: number;
  productImages: string[];
  stock: number;
  createdAt: string;
  stockSold: number;
  surface: string;
  medium: string;
  isActive: boolean;
}

export interface InventoryResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: InventoryProduct[];
}
