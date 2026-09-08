import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors, radius, spacing, typography } from '@/theme/token';

export interface SearchBarHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

interface Props {
  onDebouncedChange: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
  debounceMs?: number;
}

export const SearchBar = forwardRef<SearchBarHandle, Props>(
  ({ onDebouncedChange, placeholder = 'Search...', onSubmitEditing, debounceMs = 500 }, ref) => {
    const [text, setText] = useState('');
    const inputRef = useRef<TextInput>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        setText('');
        if (timerRef.current) clearTimeout(timerRef.current);
        onDebouncedChange(''); // notify parent immediately, no need to wait for debounce
      },
    }));

    const handleChangeText = (value: string) => {
      setText(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onDebouncedChange(value);
      }, debounceMs);
    };

    return (
      <View style={styles.container}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
  },
});