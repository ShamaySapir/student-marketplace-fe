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
  price: string;
  rating: string;
  serviceGroup: string;
  title: string;
}

export interface Service extends DescriptionItem {
  description: string;
  sellerDesc: string;
  sellerPhone: string;
}

export interface GroupedItems {
  [string]: [DescriptionItem];
}
