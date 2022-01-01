export interface ItemType {
  id: number;
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
