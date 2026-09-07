import { FlatList, View, StyleSheet } from "react-native";
import { useProductList } from '@/hooks/useProductList';
import { ProductCard } from '@/components/ProductsCard';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { spacing } from '@/theme/token';

interface Props{
    onSelectProduct: (id: string)=>void;
}

export function MarketplaceScreen({ onSelectProduct }:Props){
    const { data: products, isLoading, isError, error, refetch, isRefetching} = useProductList();
    if(isLoading)
        return <LoadingView message="Loading marketplace..."/>
    if(isError)
        return <ErrorView message={(error as Error)?.message} onRetry={refetch}/>
    if(!products || products.length===0)
        return <ErrorView message="No products available right now." onRetry={refetch}/>
    return (
        <FlatList
        data={products}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={({item})=>(
            <View style={styles.cell}>
                <ProductCard product={item} onPress={onSelectProduct}/>
            </View>
        )}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        padding: spacing.sm,
    },
    cell:{
        flex:1,
    }
});