import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "@/api/marketplaceApi";

export function useProductList(){
    return useQuery({
        queryKey: ["marketplace", "products"],
        queryFn: fetchProductList,
        staleTime: 60_000,
    });
}