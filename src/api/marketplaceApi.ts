import { Product, ProductListItem } from '@/types';
import { MOCK_PRODUCTS, simulateNetworkDelay } from './mockData';

const SIMULATE_FAILURE_RATE = 0;

function mayFail(){
    if(Math.random()<SIMULATE_FAILURE_RATE)
        throw new Error("Failed to load marketplace data. Please try again.")
}

function toListItem(p: Product): ProductListItem{
    const startingEmi = Math.min(...p.emiPlans.map((e)=>e.monthlyAmount))
    return {
        id:p.id,
        name:p.name,
        brand:p.brand,
        imageUrl:p.imageUrl,
        basePrice:p.basePrice,
        startingEmi,
        category:p.category,
    };
}

export async function fetchProductList(): Promise<ProductListItem[]>{
    mayFail();
    const products = await simulateNetworkDelay(MOCK_PRODUCTS);
    return products.map(toListItem);
}

export async function fetchProductById(id:string): Promise<Product>{
    mayFail();
    const product = await simulateNetworkDelay(MOCK_PRODUCTS.find((p)=>p.id===id));
    if(!product)
        throw new Error("Product not found")
    return product
}