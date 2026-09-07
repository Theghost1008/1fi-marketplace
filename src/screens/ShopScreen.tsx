import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme/token';
import { SectionTabs } from '@/components/SectionTabs';
import { MarketplaceScreen } from './MarketplaceScreen';
import { ShopTab } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Shop'>;


function BlankSection({ label }: { label: string }) {
  return (
    <View style={styles.blank}>
      <Text style={styles.blankText}>{label} — coming soon</Text>
    </View>
  );
}

export function ShopScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<ShopTab>('marketplace');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
      </View>
      <SectionTabs active={activeTab} onChange={setActiveTab} />
      {activeTab === 'topBrands' && <BlankSection label="Top Brands" />}
      {activeTab === 'nearbyStores' && <BlankSection label="Nearby Stores" />}
      {activeTab === 'marketplace' && (
        <MarketplaceScreen onSelectProduct={(id) => navigation.navigate('ProductDetail', { productId: id })} />
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
  blank: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
