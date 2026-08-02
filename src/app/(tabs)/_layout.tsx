import React from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { Home, ClipboardList, Map, MessageSquare, User } from 'lucide-react-native';
import { BrandHeader } from '@/components/ui/BrandHeader';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 8;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.light.primary,
        tabBarInactiveTintColor: colors.light.mutedForeground,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 56 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: { backgroundColor: colors.light.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerTitle: () => <BrandHeader title="Dashboard" />,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          title: 'Assessment',
          headerTitle: () => <BrandHeader title="Assessment" />,
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: 'Roadmap',
          headerTitle: () => <BrandHeader title="Roadmap" />,
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="consultant"
        options={{
          title: 'Konsultan AI',
          headerTitle: () => <BrandHeader title="Konsultan AI" />,
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          headerTitle: () => <BrandHeader title="Profil" />,
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

