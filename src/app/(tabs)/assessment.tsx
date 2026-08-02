import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppTextInput } from '@/components/ui/AppTextInput';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { colors } from '@/theme/colors';
import { saveLocalDraft, getLocalDraft } from '@/services/db';
import { apiFetch } from '@/services/api';

const DRAFT_ID = 'active_assessment_draft';

export default function AssessmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hsLoading, setHsLoading] = useState(false);

  // Form State
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [hsCode, setHsCode] = useState('');
  const [capacity, setCapacity] = useState('1000');
  const [capacityUnit, setCapacityUnit] = useState('pcs');
  const [price, setPrice] = useState('150000');
  const [hasOnlinePresence, setHasOnlinePresence] = useState(true);
  const [exportExperience, setExportExperience] = useState('Belum pernah');
  const [certifications, setCertifications] = useState('Halal, BPOM');
  const [meetsInternationalStandards, setMeetsInternationalStandards] = useState('Sedang proses');
  const [hasTrademark, setHasTrademark] = useState(true);
  const [targetMarkets, setTargetMarkets] = useState('Malaysia, Singapura');
  const [exportMotivation, setExportMotivation] = useState('');
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  useEffect(() => {
    (async () => {
      const draft = await getLocalDraft(DRAFT_ID);
      if (draft) {
        setProductName(draft.productName || '');
        setCategory(draft.category || '');
        setDescription(draft.description || '');
        setHsCode(draft.hsCode || '');
        setCapacity(draft.capacity || '1000');
        setCapacityUnit(draft.capacityUnit || 'pcs');
        setPrice(draft.price || '150000');
        setCertifications(draft.certifications || 'Halal, BPOM');
        setTargetMarkets(draft.targetMarkets || 'Malaysia, Singapura');
      }
    })();
  }, []);

  const saveCurrentDraft = () => {
    saveLocalDraft(DRAFT_ID, {
      productName,
      category,
      description,
      hsCode,
      capacity,
      capacityUnit,
      price,
      certifications,
      targetMarkets,
    });
  };

  const handleHsFinder = async () => {
    if (!productName || !category) {
      Alert.alert('Perhatian', 'Isi Nama Produk dan Kategori terlebih dahulu.');
      return;
    }
    setHsLoading(true);
    const res = await apiFetch('/api/mobile/v1/hs-code', {
      method: 'POST',
      body: JSON.stringify({ productName, category, description }),
    });
    setHsLoading(false);

    if (res.success && res.data?.recommendations?.[0]) {
      const rec = res.data.recommendations[0];
      setHsCode(rec.code);
      Alert.alert('Rekomendasi HS Code AI', `Kode: ${rec.code}\n${rec.description}`);
    } else {
      Alert.alert('HS Code Finder', 'Gagal mendapatkan rekomendasi HS Code.');
    }
  };

  const handleSubmit = async () => {
    if (!privacyAccepted) {
      Alert.alert('Persetujuan Wajib', 'Anda harus menyetujui kebijakan privasi.');
      return;
    }

    setLoading(true);
    const certArray = certifications.split(',').map((s) => s.trim()).filter(Boolean);
    const marketArray = targetMarkets.split(',').map((s) => s.trim()).filter(Boolean);

    const payload = {
      productName,
      category,
      description,
      hsCode,
      capacity: Number(capacity),
      capacityUnit,
      price: Number(price),
      hasOnlinePresence,
      exportExperience,
      certifications: certArray,
      meetsInternationalStandards,
      hasTrademark,
      targetMarkets: marketArray,
      exportMotivation,
      email,
      privacyAccepted: true,
    };

    const res = await apiFetch('/api/mobile/v1/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (res.success && res.data?.assessmentId) {
      router.push(`/results/${res.data.assessmentId}`);
    } else {
      Alert.alert('Gagal Assessment', res.error?.message || 'Terjadi kesalahan saat memproses assessment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 40 }]}>
      <Text style={styles.stepTitle}>Langkah {step} dari 4</Text>

      {step === 1 && (
        <AppCard>
          <Text style={styles.cardHeader}>1. Profil Produk</Text>
          <AppTextInput label="Nama Produk" placeholder="Contoh: Keripik Tempe Organik" value={productName} onChangeText={setProductName} />
          <AppTextInput label="Kategori Produk" placeholder="Contoh: Makanan & Minuman Olahan" value={category} onChangeText={setCategory} />
          <AppTextInput label="Deskripsi Ringkas" placeholder="Keunggulan dan karakteristik produk" value={description} onChangeText={setDescription} multiline />
          <AppTextInput label="HS Code (Opsional)" placeholder="1905.90" value={hsCode} onChangeText={setHsCode} />
          <AppButton title="Cari HS Code Otomatis (AI)" variant="outline" onPress={handleHsFinder} loading={hsLoading} />
          <AppButton title="Lanjut ke Langkah 2" variant="primary" onPress={() => { saveCurrentDraft(); setStep(2); }} style={{ marginTop: 12 }} />
        </AppCard>
      )}

      {step === 2 && (
        <AppCard>
          <Text style={styles.cardHeader}>2. Kapasitas & Bisnis</Text>
          <AppTextInput label="Kapasitas Produksi per Bulan" keyboardType="numeric" value={capacity} onChangeText={setCapacity} />
          <AppTextInput label="Satuan Kapasitas" placeholder="pcs / kg / box" value={capacityUnit} onChangeText={setCapacityUnit} />
          <AppTextInput label="Harga Jual per Satuan (Rp)" keyboardType="numeric" value={price} onChangeText={setPrice} />
          <AppTextInput label="Pengalaman Ekspor" placeholder="Belum pernah / Pernah mencoba / Sudah rutin" value={exportExperience} onChangeText={setExportExperience} />
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Pemasaran Digital / Website Aktif</Text>
            <Switch value={hasOnlinePresence} onValueChange={setHasOnlinePresence} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <AppButton title="Kembali" variant="ghost" onPress={() => setStep(1)} style={{ flex: 0.45 }} />
            <AppButton title="Lanjut ke Langkah 3" variant="primary" onPress={() => { saveCurrentDraft(); setStep(3); }} style={{ flex: 0.45 }} />
          </View>
        </AppCard>
      )}

      {step === 3 && (
        <AppCard>
          <Text style={styles.cardHeader}>3. Sertifikasi & Standar</Text>
          <AppTextInput label="Daftar Sertifikasi (Pisahkan Koma)" placeholder="Halal, BPOM, HACCP, ISO" value={certifications} onChangeText={setCertifications} />
          <AppTextInput label="Standar Mutu Internasional" placeholder="Sudah dipenuhi / Sedang proses / Belum tahu" value={meetsInternationalStandards} onChangeText={setMeetsInternationalStandards} />
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Memiliki Hak Merek (HAKI)</Text>
            <Switch value={hasTrademark} onValueChange={setHasTrademark} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <AppButton title="Kembali" variant="ghost" onPress={() => setStep(2)} style={{ flex: 0.45 }} />
            <AppButton title="Lanjut ke Langkah 4" variant="primary" onPress={() => { saveCurrentDraft(); setStep(4); }} style={{ flex: 0.45 }} />
          </View>
        </AppCard>
      )}

      {step === 4 && (
        <AppCard>
          <Text style={styles.cardHeader}>4. Target Pasar & Finalisasi</Text>
          <AppTextInput label="Target Negara Tujuan (Pisahkan Koma)" placeholder="Malaysia, Singapura, Jepang" value={targetMarkets} onChangeText={setTargetMarkets} />
          <AppTextInput label="Motivasi / Target Ekspor" placeholder="Ingin ekspansi ke Asia Tenggara" value={exportMotivation} onChangeText={setExportMotivation} multiline />
          <AppTextInput label="Email Kontak (Opsional)" placeholder="kontak@perusahaan.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Setuju Syarat & Kebijakan Privasi</Text>
            <Switch value={privacyAccepted} onValueChange={setPrivacyAccepted} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <AppButton title="Kembali" variant="ghost" onPress={() => setStep(3)} style={{ flex: 0.45 }} />
            <AppButton title="Kirim & Analisis AI" variant="accent" onPress={handleSubmit} loading={loading} style={{ flex: 0.48 }} />
          </View>
        </AppCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light.background,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.mutedForeground,
    marginBottom: 8,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 14,
    color: colors.light.foreground,
    flex: 0.8,
  },
});
