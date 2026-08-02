import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { colors } from '@/theme/colors';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 32 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.headerBar}>
          <Image
            source={require('@/../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>
            ExportReady <Text style={styles.brandAi}>AI</Text>
          </Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Badge Pill */}
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>⚡ KONSULTAN EKSPOR VIRTUAL 24/7</Text>
          </View>

          {/* Main Headline */}
          <Text style={styles.mainTitle}>
            Bantu UMKM Anda Siap Ekspor{' '}
            <Text style={styles.highlightText}>Kurang dari 30 Menit</Text>
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Dapatkan skor kesiapan, 3 negara tujuan, dan roadmap 4 fase—gratis, kapan pun Anda butuh.
          </Text>
        </View>

        {/* Mascot / Brand Image Display */}
        <View style={styles.brandCard}>
          <Image
            source={require('@/../assets/logo.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Evaluasi Kesiapan Ekspor UMKM</Text>
          <Text style={styles.cardDesc}>
            Analisis produk otomatis berbasis AI Gemini, rekomendasi regulasi bea cukai, dan roadmap terstruktur.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <AppButton
            title="Mulai Analisis Gratis  →"
            variant="primary"
            onPress={() => router.push('/(tabs)/assessment')}
            style={styles.primaryBtn}
          />
          <AppButton
            title="Lihat Dashboard"
            variant="outline"
            onPress={() => router.push('/(tabs)/dashboard')}
            style={styles.secondaryBtn}
          />
          <AppButton
            title="Masuk ke Akun Saya"
            variant="ghost"
            onPress={() => router.push('/(auth)/login')}
          />
        </View>

        {/* Trust Badges */}
        <View style={styles.trustBadgeContainer}>
          {['Gratis', 'Bahasa Indonesia', 'Cocok UMKM 1–5 orang', 'Akses 24/7', 'Tanpa kartu kredit'].map(
            (badge, idx) => (
              <View key={idx} style={styles.trustBadge}>
                <Text style={styles.trustBadgeText}>{badge}</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.light.background,
    alignItems: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
  logoImage: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderRadius: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.light.primary,
  },
  brandAi: {
    color: colors.light.accent,
    fontStyle: 'italic',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  pillBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.light.primary,
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.light.primary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  highlightText: {
    color: colors.light.accentDark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  brandCard: {
    width: '100%',
    backgroundColor: colors.light.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  mascotImage: {
    width: 110,
    height: 110,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.light.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    marginVertical: 12,
  },
  primaryBtn: {
    backgroundColor: colors.light.primary,
    height: 52,
    borderRadius: 14,
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.light.cardBorder,
    height: 50,
    borderRadius: 14,
  },
  trustBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  trustBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  trustBadgeText: {
    fontSize: 12,
    color: colors.light.mutedForeground,
    fontWeight: '500',
  },
});
