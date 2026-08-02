import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { AppButton } from '@/components/ui/AppButton';
import { apiFetch } from '@/services/api';

import { colors } from '@/theme/colors';

export default function PaymentWebViewScreen() {
  const insets = useSafeAreaInsets();
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    const res = await apiFetch('/api/mobile/v1/payment/midtrans', {
      method: 'POST',
      body: JSON.stringify({ planId: 'premium-monthly' }),
    });
    setLoading(false);

    if (res.success && res.data?.redirectUrl) {
      setPayUrl(res.data.redirectUrl);
    } else {
      alert(res.error?.message || 'Gagal memulai transaksi Midtrans.');
    }
  };

  if (!payUrl) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }
        ]}
      >
        <Text style={styles.title}>Langganan Premium ExportReadyAI</Text>
        <Text style={styles.sub}>Akses tanpa batas analisis pasar AI, regulasi ekspor RAG, dan konsultan ekspor 24/7.</Text>

        <View style={styles.priceCard}>
          <Text style={styles.priceText}>Rp 199.000 / Bulan</Text>
          <Text style={styles.priceSub}>Garansi pembatalan kapan saja.</Text>
        </View>

        <AppButton
          title="Lanjut ke Pembayaran Midtrans"
          variant="accent"
          onPress={startPayment}
          loading={loading}
        />
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <WebView
        source={{ uri: payUrl }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ flex: 1 }} size="large" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.light.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.light.primary,
    textAlign: 'center',
  },
  sub: {
    fontSize: 14,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  priceCard: {
    backgroundColor: colors.light.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priceSub: {
    fontSize: 12,
    color: '#93C5FD',
    marginTop: 4,
  },
});
