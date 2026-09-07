import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme/token';
import { EMIPlan } from '@/types';
import { formatINR } from '@/utils/currency';

interface Props {
  plan: EMIPlan;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function EMIPlanCard({ plan, selected, onSelect }: Props) {
  return (
    <Pressable
      onPress={() => onSelect(plan.id)}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={styles.radioOuter}>{selected && <View style={styles.radioInner} />}</View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
          {plan.isRecommended && (
            <View style={styles.recommendedPill}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
        <Text style={styles.amount}>{formatINR(plan.monthlyAmount)}/mo</Text>
        <Text style={styles.meta}>
          {plan.interestRatePct === 0 ? '0% interest' : `${plan.interestRatePct}% interest`} · Processing
          fee {formatINR(plan.processingFee)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.chipBackground,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tenure: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  recommendedPill: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  recommendedText: {
    ...typography.caption,
    color: colors.primaryText,
    fontWeight: '600',
  },
  amount: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
