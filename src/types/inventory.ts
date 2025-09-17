export interface InventoryProduct {
  _id: string;
  title: string;
  price: number;
  discount: number;
  actualPrice: number;
  productImages: string[];
  stock: number;
  createdAt: string;
  initialStock: number;
  isActive: boolean;
}

export interface InventoryResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: InventoryProduct[];
}