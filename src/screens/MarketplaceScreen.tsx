import { FlatList, View, StyleSheet } from "react-native";
import { useProductList } from '@/hooks/useProductList';
import { ProductCard } from '@/components/ProductsCard';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { spacing } from '@/theme/token';
import { ReactElement, useMemo, useCallback } from "react";

interface Props {
    onSelectProduct: (id: string) => void;
    ListHeaderComponent?: ReactElement;
    searchQuery?: string;
    onScrollBeginDrag?: () => void;
}

export function MarketplaceScreen({ onSelectProduct, ListHeaderComponent, searchQuery = '', onScrollBeginDrag }: Props) {
    const { data: products, isLoading, isError, error, refetch, isRefetching } = useProductList();

    const query = searchQuery.trim().toLocaleLowerCase();
    const filterProducts = useMemo(() => {
        if (!products) return [];
        return query
            ? products.filter((p) =>
                p.name.toLowerCase().includes(query) || p.brand?.toLowerCase().includes(query)
              )
            : products;
    }, [products, query]);

    const renderItem = useCallback(
        ({ item }: { item: (typeof filterProducts)[number] }) => (
            <View style={styles.cell}>
                <ProductCard product={item} onPress={onSelectProduct} />
            </View>
        ), [onSelectProduct]
    );

    const keyExtractor = useCallback((item: { id: string }) => item.id, []);

    if (isLoading)
        return <LoadingView message="Loading marketplace..." />
    if (isError)
        return <ErrorView message={(error as Error)?.message} onRetry={refetch} />
    if (!products || products.length === 0)
        return <ErrorView message="No products available right now." onRetry={refetch} />

    return (
        <FlatList
            data={filterProducts}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            refreshing={isRefetching}
            onRefresh={refetch}
            ListHeaderComponent={ListHeaderComponent}
            onScrollBeginDrag={onScrollBeginDrag}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
                query ? (
                    <View style={styles.emptyWrap}>
                        <ErrorView message={`No results for "${searchQuery}"`} onRetry={() => {}} />
                    </View>
                ) : null
            }
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: spacing.sm,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: spacing.sm,
    },
    cell: {
        width: '48%',
        marginBottom: spacing.sm,
    },
    emptyWrap: {
        paddingTop: spacing.lg,
    },
});