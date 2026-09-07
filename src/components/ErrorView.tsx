import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme/token';
import { PrimaryButton } from './PrimaryButton';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({ message = 'Something went wrong.', onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unable to load</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <PrimaryButton label="Try again" onPress={onRetry} variant="secondary" style={styles.retryBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryBtn: {
    minWidth: 140,
  },
});
