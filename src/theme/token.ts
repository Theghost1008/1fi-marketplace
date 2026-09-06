export const colors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  primary: '#1B4D3E', // deep green — common in fintech; swap for 1Fi's brand color
  primaryText: '#FFFFFF',
  textPrimary: '#12161C',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  success: '#1E8E5A',
  error: '#DC2626',
  tabInactive: '#9CA3AF',
  tabActive: '#1B4D3E',
  chipBackground: '#EEF2F1',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  fontFamily: undefined as string | undefined, // set to a custom family once loaded via expo-font
  h1: { fontSize: 24, fontWeight: '700' as const },
  h2: { fontSize: 20, fontWeight: '700' as const },
  h3: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  bodyMedium: { fontSize: 14, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};
