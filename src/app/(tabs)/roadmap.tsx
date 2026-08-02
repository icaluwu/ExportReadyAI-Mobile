import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '@/components/ui/AppCard';
import { colors } from '@/theme/colors';

const INITIAL_ROADMAP = [
  {
    phase: 'Fase 1: Standarisasi & Legalitas',
    items: [
      { id: '1', title: 'Lengkapi sertifikasi Halal dan standar higienitas BPOM', done: true },
      { id: '2', title: 'Daftarkan Hak Kekayaan Intelektual (HAKI) Merek Usaha', done: false },
    ],
  },
  {
    phase: 'Fase 2: Produk & Kemasan Ekspor',
    items: [
      { id: '3', title: 'Gunakan kemasan kedap udara bermaterial food-grade', done: false },
      { id: '4', title: 'Cetak label bilingual (Bahasa Inggris & Bahasa Negara Tujuan)', done: false },
    ],
  },
  {
    phase: 'Fase 3: Pemasaran & Buyer Matching',
    items: [
      { id: '5', title: 'Buat E-Katalog Produk Ekspor PDF & Website Resmi', done: false },
      { id: '6', title: 'Ikuti pameran dagang internasional & Buyer Matching Kemenperin', done: false },
    ],
  },
  {
    phase: 'Fase 4: Logistik & Dokumen Ekspor',
    items: [
      { id: '7', title: 'Siapkan Commercial Invoice, Packing List, & PEB', done: false },
      { id: '8', title: 'Pilih freight forwarder terpercaya untuk skema LCL/FCL', done: false },
    ],
  },
];

export default function RoadmapScreen() {
  const insets = useSafeAreaInsets();
  const [roadmap, setRoadmap] = useState(INITIAL_ROADMAP);

  const toggleItem = (phaseIndex: number, itemIndex: number) => {
    const updated = [...roadmap];
    const item = updated[phaseIndex].items[itemIndex];
    item.done = !item.done;
    setRoadmap(updated);
  };

  const totalItems = roadmap.reduce((sum, phase) => sum + phase.items.length, 0);
  const completedItems = roadmap.reduce(
    (sum, phase) => sum + phase.items.filter((i) => i.done).length,
    0
  );
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 40 }]}>
      <Text style={styles.headerTitle}>Roadmap Akses Ekspor</Text>
      <Text style={styles.headerSub}>Langkah terstruktur menuju kesiapan ekspor pasar internasional.</Text>

      <AppCard style={styles.progressCard}>
        <Text style={styles.progressLabel}>Kemajuan Persiapan Ekspor</Text>
        <Text style={styles.progressValue}>{progressPercent}% Selesai</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
      </AppCard>

      {roadmap.map((section, pIdx) => (
        <AppCard key={pIdx}>
          <Text style={styles.phaseTitle}>{section.phase}</Text>
          {section.items.map((item, iIdx) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checkRow}
              activeOpacity={0.7}
              onPress={() => toggleItem(pIdx, iIdx)}
            >
              <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
                {item.done && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={[styles.itemText, item.done && styles.itemTextDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </AppCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light.background,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.light.primary,
  },
  headerSub: {
    fontSize: 14,
    color: colors.light.mutedForeground,
    marginBottom: 12,
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: colors.light.primary,
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 13,
    color: '#93C5FD',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.light.accent,
    borderRadius: 4,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.muted,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: colors.light.success,
    borderColor: colors.light.success,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  itemText: {
    fontSize: 14,
    color: colors.light.foreground,
    flex: 1,
    lineHeight: 20,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: colors.light.mutedForeground,
  },
});
