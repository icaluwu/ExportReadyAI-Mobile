import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppCard } from '@/components/ui/AppCard';
import { AppButton } from '@/components/ui/AppButton';
import { supabase } from '@/services/supabase';
import { colors } from '@/theme/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserEmail(data.user.email || null);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Alert.alert('Keluar', 'Anda telah berhasil keluar dari akun.');
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 40 }]}>
      <AppCard style={styles.profileHeaderCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'G'}
          </Text>
        </View>
        <Text style={styles.userName}>{userEmail || 'Pengguna Tamu'}</Text>
        <Text style={styles.userRole}>
          {userEmail ? 'Akun UMKM Terverifikasi' : 'Sesi Tamu'}
        </Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Langganan & Pembayaran</Text>
        <Text style={styles.planBadge}>Paket Gratis</Text>
        <Text style={styles.planDesc}>
          Tingkatkan ke ExportReadyAI Premium untuk membuka analisis pasar AI penuh, rekomendasi regulasi RAG lengkap, dan konsultasi tanpa batas.
        </Text>
        <AppButton
          title="Upgrade ke Premium (Rp 199.000)"
          variant="accent"
          onPress={() => router.push('/payment/webview')}
        />
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Pengaturan Akun</Text>
        {userEmail ? (
          <AppButton
            title="Keluar Akun"
            variant="outline"
            onPress={handleLogout}
          />
        ) : (
          <AppButton
            title="Masuk / Register Akun"
            variant="primary"
            onPress={() => router.push('/(auth)/login')}
          />
        )}
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light.background,
  },
  profileHeaderCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.light.primary,
  },
  userRole: {
    fontSize: 13,
    color: colors.light.mutedForeground,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: 8,
  },
  planBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.light.success,
    marginBottom: 6,
  },
  planDesc: {
    fontSize: 13,
    color: colors.light.mutedForeground,
    lineHeight: 18,
    marginBottom: 12,
  },
});
