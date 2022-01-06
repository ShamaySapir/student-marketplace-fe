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

export interface DescriptionItem {
  id: string;
  image: string;
  price: number;
  rating: number;
  serviceGroup: string;
  title: string;
}

export interface GroupedItems {
  [string]: [DescriptionItem];
}
