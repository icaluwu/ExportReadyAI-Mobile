import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/theme/colors';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#CBD5E1';
    switch (variant) {
      case 'primary': return colors.light.primary;
      case 'accent': return colors.light.accent;
      case 'outline': return '#FFFFFF';
      case 'ghost': return 'transparent';
      default: return colors.light.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return '#94A3B8';
    switch (variant) {
      case 'primary': return colors.light.primaryForeground;
      case 'accent': return colors.light.accentForeground;
      case 'outline': return colors.light.primary;
      case 'ghost': return colors.light.primary;
      default: return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && { borderWidth: 1.5, borderColor: colors.light.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
