export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductDetail {
  id: string;
  storyNumber: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  extendedDescription: string;
  editorialMood: string;
  location: string;
  features: string[];
  fabricCare: string;
  stylingNote: string;
  primaryImage: string;
  alternateImages: {
    url: string;
    caption: string;
    viewType: 'Editorial Focus' | 'Movement & Drape' | 'Detail & Texture' | 'Full Silhouette';
  }[];
  availableSizes: ProductSize[];
  soldOutSizes?: ProductSize[];
  inStock: boolean;
  editionBadge: string;
}

export interface CartItem {
  id: string; // unique item id based on product id and selected size
  productId: string;
  name: string;
  price: number;
  size: ProductSize;
  quantity: number;
  image: string;
  editionBadge: string;
}
