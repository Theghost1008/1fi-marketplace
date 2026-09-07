export const colors = {
  background: '#F5F4FA',
  surface: '#FFFFFF',
  primary: '#6C3CE0',
  primaryDark: '#4B15C0',
  primaryText: '#FFFFFF',
  textPrimary: '#15131C',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#ECEAF3',
  success: '#1E8E5A',
  error: '#DC2626',
  tabInactive: '#9CA3AF',
  tabActive: '#6C3CE0',
  chipBackground: '#EFE9FB',
  segmentTrack: '#EEECF6',
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
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const typography = {
  fontFamily: undefined as string | undefined,
  h1: { fontSize: 24, fontWeight: '800' as const },
  h2: { fontSize: 20, fontWeight: '800' as const },
  h3: { fontSize: 16, fontWeight: '700' as const },
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
