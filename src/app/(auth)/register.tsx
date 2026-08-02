import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import { supabase } from '@/services/supabase';
import { colors } from '@/theme/colors';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Gagal Pendaftaran', error.message);
    } else {
      Alert.alert('Pendaftaran Berhasil', 'Silakan periksa email Anda untuk verifikasi akun.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') },
      ]);
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
        <Text style={styles.headerTitle}>Buat Akun ExportReadyAI</Text>
        <Text style={styles.headerSubtitle}>Mulai perjalanan ekspor produk UMKM Anda hari ini.</Text>

        <AppTextInput
          label="Email Usaha"
          placeholder="nama@perusahaan.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <AppTextInput
          label="Kata Sandi (Min 6 Karakter)"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          title="Daftar Akun"
          onPress={handleRegister}
          loading={loading}
          style={{ marginTop: 16 }}
        />

        <AppButton
          title="Sudah punya akun? Masuk"
          variant="ghost"
          onPress={() => router.push('/(auth)/login')}
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
