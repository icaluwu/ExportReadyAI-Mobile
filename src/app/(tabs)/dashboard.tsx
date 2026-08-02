import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { AppCard } from '@/components/ui/AppCard';
import { AppButton } from '@/components/ui/AppButton';
import { apiFetch } from '@/services/api';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { colors } from '@/theme/colors';

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-assessments'],
    queryFn: () => apiFetch('/api/mobile/v1/assessments'),
  });

  const assessments = data?.data?.assessments || [];
  const latestAssessment = assessments[0];
  const averageScore = assessments.length
    ? Math.round(assessments.reduce((acc: number, item: any) => acc + (item.readiness_score || 0), 0) / assessments.length)
    : 0;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 40 }]}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Ringkasan Ekspor UMKM</Text>
        <Text style={styles.subtext}>Pantau progres kesiapan ekspor usaha Anda secara praktis.</Text>
      </View>

      <View style={styles.metricsGrid}>
        <AppCard style={styles.metricCard}>
          <Text style={styles.metricNumber}>{assessments.length}</Text>
          <Text style={styles.metricLabel}>Total Assessment</Text>
        </AppCard>
        <AppCard style={styles.metricCard}>
          <Text style={styles.metricNumber}>{averageScore}</Text>
          <Text style={styles.metricLabel}>Rata-rata Score</Text>
        </AppCard>
      </View>

      {latestAssessment ? (
        <AppCard>
          <Text style={styles.sectionTitle}>Assessment Terakhir</Text>
          <Text style={styles.productName}>{latestAssessment.product_name}</Text>
          <Text style={styles.category}>{latestAssessment.category}</Text>
          <ScoreRing score={latestAssessment.readiness_score} size={100} />
          <AppButton
            title="Lihat Laporan Detail"
            variant="outline"
            onPress={() => router.push(`/results/${latestAssessment.id}`)}
          />
        </AppCard>
      ) : (
        <AppCard style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ fontSize: 40, marginBottom: 12 }}>📋</Text>
          <Text style={styles.sectionTitle}>Belum Ada Assessment</Text>
          <Text style={{ textAlign: 'center', color: '#64748B', marginVertical: 8 }}>
            Evaluasi kesiapan ekspor produk Anda sekarang untuk mendapatkan analisis pasar & rekomendasi AI.
          </Text>
          <AppButton
            title="Mulai Assessment Sekarang"
            onPress={() => router.push('/(tabs)/assessment')}
            style={{ width: '100%', marginTop: 8 }}
          />
        </AppCard>
      )}

      <AppCard>
        <Text style={styles.sectionTitle}>Aksi Cepat</Text>
        <AppButton
          title="Tanya Konsultan AI Ekspor"
          variant="accent"
          onPress={() => router.push('/(tabs)/consultant')}
        />
        <AppButton
          title="Lihat Roadmap Ekspor Saya"
          variant="primary"
          onPress={() => router.push('/(tabs)/roadmap')}
        />
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light.background,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.light.primary,
  },
  subtext: {
    fontSize: 14,
    color: colors.light.mutedForeground,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricCard: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: 20,
  },
  metricNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.light.primary,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.light.mutedForeground,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: 6,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.light.primary,
  },
  category: {
    fontSize: 13,
    color: colors.light.mutedForeground,
  },
});
