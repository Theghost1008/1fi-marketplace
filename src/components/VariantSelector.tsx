import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme/token';
import { ProductVariant } from '@/types';

interface Props {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: Props) {
  if (variants.length <= 1) return null;
  return (
    <View>
      <Text style={styles.label}>Variant</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <Pressable
              key={variant.id}
              disabled={!variant.inStock}
              onPress={() => onSelect(variant.id)}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                !variant.inStock && styles.chipDisabled,
              ]}
            >
              <Text
                style={[
                  styles.chipLabel,
                  isSelected && styles.chipLabelSelected,
                  !variant.inStock && styles.chipLabelDisabled,
                ]}
              >
                {variant.label}
                {!variant.inStock ? ' · Out of stock' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.chipBackground,
  },
  chipDisabled: {
    opacity: 0.4,
  },
  chipLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  chipLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  chipLabelDisabled: {
    color: colors.textMuted,
  },
});
