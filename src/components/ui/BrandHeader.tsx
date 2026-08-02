import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface BrandHeaderProps {
  title?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.brandTitle}>
          ExportReady <Text style={styles.brandAi}>AI</Text>
        </Text>
        {title && title !== 'ExportReady AI' && (
          <Text style={styles.subTitle}>• {title}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 6,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  brandAi: {
    color: '#F59E0B', // Orange/Amber accent
    fontWeight: '900',
    fontStyle: 'italic',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginLeft: 6,
  },
});
