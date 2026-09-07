import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, shadow, typography } from '@/theme/token';
import { ProductListItem } from '@/types';
import { formatINR } from '@/utils/currency';

interface Props {
  product: ProductListItem;
  onPress: (id: string) => void;
}

export function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(product.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.name}`}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatINR(product.basePrice)}</Text>
        <View style={styles.emiPill}>
          <Text style={styles.emiText}>
            EMI from {formatINR(product.startingEmi)}/mo
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    margin: spacing.sm,
    ...shadow.card,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: colors.chipBackground,
  },
  body: {
    padding: spacing.md,
  },
  brand: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 2,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    minHeight: 40,
  },
  price: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emiPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.chipBackground,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  emiText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
