import { supabase } from './supabase';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

async function getAuthHeader(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }

  const guestToken = await SecureStore.getItemAsync('guest_session_token');
  if (guestToken) {
    return { Authorization: `Bearer ${guestToken}` };
  }

  return {};
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data: T | null; error: { code: string; message: string } | null }> {
  const authHeader = await getAuthHeader();
  const headers = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const json = await res.json();
    return json;
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Gagal terhubung ke server ExportReadyAI.',
      },
    };
  }
}
