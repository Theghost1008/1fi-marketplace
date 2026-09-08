import React, { useRef, useState,useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Keyboard, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme/token';
import { SectionTabs } from '@/components/SectionTabs';
import { MarketplaceScreen } from './MarketplaceScreen';
import { ShopTab } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { SearchBar, SearchBarHandle } from '@/components/SearchBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Shop'>;

const PLACEHOLDERS: Record<ShopTab, string> = {
    topBrands: 'Search online stores...',
    nearbyStores: 'Search nearby stores...',
    marketplace: 'Search products',
};

function BlankSection({ label }: { label: string }) {
    return (
        <View style={styles.blank}>
            <Text style={styles.blankText}>{label} — coming soon</Text>
        </View>
    );
}

export function ShopScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState<ShopTab>('marketplace');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const searchInputRef = useRef<SearchBarHandle>(null);

    const dismissSearch = useCallback(() => {
        searchInputRef.current?.blur();
        Keyboard.dismiss();
    },[]);

    const handleTabChange = useCallback((tab: ShopTab) => {
        dismissSearch();
        searchInputRef.current?.clear();
        setDebouncedQuery('');
        setActiveTab(tab);
    },[dismissSearch]);

    const handleSelectProduct = useCallback((id: string) => {
        dismissSearch();
        navigation.navigate('ProductDetail', { productId: id });
    },[dismissSearch,navigation]);

    const listHeader = useMemo(()=>(
        <View>
            <Image
                source={require('../../assets/promo_banner.png')}
                style={styles.promoBanner}
            />
            <SectionTabs active={activeTab} onChange={handleTabChange} />
            <SearchBar
                ref={searchInputRef}
                onDebouncedChange={setDebouncedQuery}
                placeholder={PLACEHOLDERS[activeTab]}
                onSubmitEditing={dismissSearch}
            />
        </View>
    ),[activeTab,handleTabChange,dismissSearch]);

    return (
        <SafeAreaView style={styles.container}>
            {activeTab === 'marketplace' ? (
                <MarketplaceScreen
                    ListHeaderComponent={listHeader}
                    searchQuery={debouncedQuery}
                    onSelectProduct={handleSelectProduct}
                    onScrollBeginDrag={dismissSearch}
                />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    onScrollBeginDrag={dismissSearch}
                    keyboardShouldPersistTaps="handled"
                >
                    {listHeader}
                    {activeTab === 'topBrands' && <BlankSection label="Top Brands" />}
                    {activeTab === 'nearbyStores' && <BlankSection label="Nearby Stores" />}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  promoBanner: {
    width: '100%',
    height: 200,
  },
  blank: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  blankText: {
    ...typography.body,
    color: colors.textMuted,
  },
});