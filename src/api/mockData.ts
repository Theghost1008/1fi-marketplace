import { Product } from '@/types/index';
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    category: 'Two Wheelers',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600',
    basePrice: 218000,
    rating: 4.6,
    description:
      'Finance your Classic 350 against your mutual fund portfolio — your investments stay invested and keep compounding while you pay 0% interest EMIs.',
    variants: [
      { id: 'v1', label: 'Chrome Black', priceDelta: 0, inStock: true },
      { id: 'v2', label: 'Stealth Black', priceDelta: 4000, inStock: true },
      { id: 'v3', label: 'Signals Series', priceDelta: 12000, inStock: false },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 6, monthlyAmount: 36333, interestRatePct: 0, totalPayable: 218000, processingFee: 999, isRecommended: false },
      { id: 'e2', tenureMonths: 12, monthlyAmount: 18167, interestRatePct: 0, totalPayable: 218000, processingFee: 999, isRecommended: true },
      { id: 'e3', tenureMonths: 24, monthlyAmount: 9084, interestRatePct: 0, totalPayable: 218000, processingFee: 1499, isRecommended: false },
    ],
  },
  {
    id: 'p2',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    basePrice: 114900,
    rating: 4.8,
    description:
      'Get the M3 MacBook Air today without redeeming your mutual funds. Pledge your portfolio, unlock instant liquidity, and pay it off in flexible EMIs.',
    variants: [
      { id: 'v1', label: '8GB / 256GB / Midnight', priceDelta: 0, inStock: true },
      { id: 'v2', label: '16GB / 512GB / Starlight', priceDelta: 25000, inStock: true },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, monthlyAmount: 38300, interestRatePct: 0, totalPayable: 114900, processingFee: 499, isRecommended: false },
      { id: 'e2', tenureMonths: 6, monthlyAmount: 19150, interestRatePct: 0, totalPayable: 114900, processingFee: 499, isRecommended: true },
      { id: 'e3', tenureMonths: 12, monthlyAmount: 9575, interestRatePct: 0, totalPayable: 114900, processingFee: 999, isRecommended: false },
    ],
  },
  {
    id: 'p3',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Mobiles',
    imageUrl: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=600',
    basePrice: 69900,
    rating: 4.7,
    description:
      'Own the iPhone 15 now — collateralize your mutual fund holdings instead of selling them, and repay on a 0% EMI schedule.',
    variants: [
      { id: 'v1', label: '128GB / Black', priceDelta: 0, inStock: true },
      { id: 'v2', label: '128GB / Blue', priceDelta: 0, inStock: true },
      { id: 'v3', label: '256GB / Black', priceDelta: 10000, inStock: true },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, monthlyAmount: 23300, interestRatePct: 0, totalPayable: 69900, processingFee: 299, isRecommended: false },
      { id: 'e2', tenureMonths: 6, monthlyAmount: 11650, interestRatePct: 0, totalPayable: 69900, processingFee: 299, isRecommended: true },
      { id: 'e3', tenureMonths: 9, monthlyAmount: 7767, interestRatePct: 0, totalPayable: 69900, processingFee: 499, isRecommended: false },
    ],
  },
  {
    id: 'p4',
    name: 'Samsung 55" Neo QLED TV',
    brand: 'Samsung',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600',
    basePrice: 89990,
    rating: 4.4,
    description:
      'Upgrade your home entertainment without touching your investments. Pledge, purchase, repay — your portfolio keeps growing in the background.',
    variants: [{ id: 'v1', label: 'Standard', priceDelta: 0, inStock: true }],
    emiPlans: [
      { id: 'e1', tenureMonths: 6, monthlyAmount: 14998, interestRatePct: 0, totalPayable: 89990, processingFee: 399, isRecommended: true },
      { id: 'e2', tenureMonths: 12, monthlyAmount: 7499, interestRatePct: 0, totalPayable: 89990, processingFee: 599, isRecommended: false },
    ],
  },
];

export function simulateNetworkDelay<T>(data: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}