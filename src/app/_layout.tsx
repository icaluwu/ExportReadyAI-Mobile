import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/services/supabase';
import { colors } from '@/theme/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, _session) => {
      // Session automatically handled by ExpoSecureStoreAdapter
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.light.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.light.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ title: 'Masuk - ExportReady AI' }} />
        <Stack.Screen name="(auth)/register" options={{ title: 'Daftar Akun' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="results/[id]" options={{ title: 'Hasil Readiness Score' }} />
        <Stack.Screen name="payment/webview" options={{ title: 'Pembayaran Premium' }} />
      </Stack>
    </QueryClientProvider>
  );
}
