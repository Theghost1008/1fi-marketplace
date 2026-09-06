export interface ProductVariant {
  id: string;
  label: string; // displays variant of a product
  priceDelta: number; // added or substracted from base price
  inStock: boolean;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRatePct: number; // 0 for 0%-interest LAMF plans
  totalPayable: number;
  processingFee: number;
  isRecommended?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  rating?: number;
  description: string;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}

export interface ProductListItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  startingEmi: number; // lowest monthly EMI across plans, for the list card
  category: string;
}

export type ShopTab = 'topBrands' | 'nearbyStores' | 'marketplace';

export type LoadState = 'idle' | 'loading' | 'success' | 'error';
