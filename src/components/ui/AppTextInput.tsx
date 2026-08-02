import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/theme/colors';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.primary,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.light.foreground,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: colors.light.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.light.danger,
    marginTop: 4,
  },
});
