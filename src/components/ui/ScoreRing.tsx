import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface ScoreRingProps {
  score: number;
  size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 120 }) => {
  const getScoreColor = () => {
    if (score >= 75) return colors.light.success; // Emerald Green
    if (score >= 50) return colors.light.warning; // Amber
    return colors.light.danger;                  // Red
  };

  const getScoreLabel = () => {
    if (score >= 75) return 'Siap Ekspor';
    if (score >= 50) return 'Cukup Siap';
    return 'Perlu Persiapan';
  };

  const ringColor = getScoreColor();

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, borderColor: ringColor }]}>
      <Text style={[styles.scoreText, { color: ringColor }]}>{score}</Text>
      <Text style={styles.maxText}>/ 100</Text>
      <Text style={[styles.label, { color: ringColor }]}>{getScoreLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginVertical: 12,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '800',
  },
  maxText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
});
