import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/marketplaceApi";

export function useProduct(productId: string){
    return useQuery({
        queryKey: ["marketplace","product", productId],
        queryFn:()=> fetchProductById(productId),
        enabled: !!productId,
        staleTime: 60_000,
    })
}