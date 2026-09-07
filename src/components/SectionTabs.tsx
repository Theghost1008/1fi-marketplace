import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, shadow, typography } from '@/theme/token';
import { ShopTab } from '@/types';

const TABS: { key: ShopTab; label: string }[] = [
  { key: 'topBrands', label: 'Top Brands' },
  { key: 'nearbyStores', label: 'Nearby Stores' },
  { key: 'marketplace', label: '1Fi Marketplace' },
];

interface Props {
  active: ShopTab;
  onChange: (tab: ShopTab) => void;
}

export function SectionTabs({ active, onChange }: Props) {
  return (
    <View style={styles.track}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.segment, isActive && styles.segmentActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrack,
    borderRadius: radius.pill,
    padding: 4,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});