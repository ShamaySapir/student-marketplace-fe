export interface ItemType {
  id: string;
  name: string;
}

export interface MarketplaceUser {
  isSeller;
}

export interface MPUser {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  isSeller: boolean;
  sellerDescription: string;
  images: [string];
  googleId: string;
}

export interface DescriptionItem {
  id: string;
  image: string;
  price: number;
  rating: number;
  serviceGroup: string;
  title: string;
  walletNumber: string;
}

export interface Service extends DescriptionItem {
  description: string;
  sellerDesc: string;
  sellerPhone: string;
  sellerName: string;
}

export interface GroupedItems {
  [string]: [DescriptionItem];
}

export interface PurchaseData {
  buyerId: string;
  buyerEmail: string;
  itemId: string;
  quantity: number;
}

export interface GetUserIdPayload {
  userId: string;
}

export interface UserPurchases {
  purchaseId: string;
  buyerId: string;
  buyerName: string;
  date: string;
  sellerId: string;
  sellerName: string;
  itemId: string;
  itemName: string;
  quantity: string;
  price: string;
  totalPrice: string;
  rating: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof UserPurchases;
  label: string;
  numeric: boolean;
}

export interface RankedItem {
  itemId: string;
  rating: number;
}
