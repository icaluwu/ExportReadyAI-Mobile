import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import { supabase } from '@/services/supabase';
import { colors } from '@/theme/colors';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Gagal Masuk', error.message);
    } else {
      router.replace('/(tabs)/dashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.light.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 32, paddingTop: Math.max(insets.top, 16) }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerTitle}>Selamat Datang Kembali</Text>
        <Text style={styles.headerSubtitle}>Masuk untuk melihat hasil assessment & roadmap ekspor Anda.</Text>

        <AppTextInput
          label="Email"
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <AppTextInput
          label="Kata Sandi"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          title="Masuk"
          onPress={handleLogin}
          loading={loading}
          style={{ marginTop: 16 }}
        />

        <AppButton
          title="Belum punya akun? Daftar sekarang"
          variant="ghost"
          onPress={() => router.push('/(auth)/register')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.light.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.light.primary,
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.light.mutedForeground,
    marginBottom: 24,
    marginTop: 6,
  },
});
