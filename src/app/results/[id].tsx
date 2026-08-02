import React from 'react';
import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AppCard } from '@/components/ui/AppCard';
import { AppButton } from '@/components/ui/AppButton';

import { colors } from '@/theme/colors';

export default function ResultsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const mockScore = 78;
  const mockAiResult = {
    summary: 'Produk Anda memiliki potensi tinggi di pasar Asia Tenggara dengan kapasitas produksi yang solid.',
    topCountries: [
      { country: 'Malaysia', flag: '🇲🇾', demandLevel: 'Tinggi', reason: 'Permintaan produk halal dan olahan tinggi.' },
      { country: 'Singapura', flag: '🇸🇬', demandLevel: 'Tinggi', reason: 'Daya beli tinggi untuk produk berkualitas.' },
    ],
    gaps: [
      'Belum memiliki sertifikasi kebersihan HACCP.',
      'Kemasan belum menggunakan Bahasa Inggris.',
    ],
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hasil Export Readiness Score saya adalah ${mockScore}/100! Cek analisis kesiapan ekspor UMKM di ExportReadyAI.`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 40 }]}>
      <AppCard style={{ alignItems: 'center' }}>
        <Text style={styles.cardTitle}>Export Readiness Score</Text>
        <ScoreRing score={mockScore} size={130} />
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Ringkasan Eksekutif AI</Text>
        <Text style={styles.bodyText}>{mockAiResult.summary}</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Rekomendasi Negara Tujuan</Text>
        {mockAiResult.topCountries.map((c, idx) => (
          <View key={idx} style={styles.countryRow}>
            <Text style={styles.countryFlag}>{c.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.countryName}>{c.country} ({c.demandLevel})</Text>
              <Text style={styles.countryReason}>{c.reason}</Text>
            </View>
          </View>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Gap / Perbaikan Utama</Text>
        {mockAiResult.gaps.map((gap, idx) => (
          <Text key={idx} style={styles.gapText}>• {gap}</Text>
        ))}
      </AppCard>

      <AppButton
        title="Bagikan Hasil Assessment"
        variant="accent"
        onPress={handleShare}
        style={{ marginVertical: 12 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light.background,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.light.primary,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: colors.light.foreground,
    lineHeight: 22,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  countryFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  countryName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.light.primary,
  },
  countryReason: {
    fontSize: 13,
    color: colors.light.mutedForeground,
  },
  gapText: {
    fontSize: 14,
    color: colors.light.danger,
    marginVertical: 3,
  },
});
