import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Activity, Apple, Droplets } from 'lucide-react';

interface FormsMenuProps {
  onNavigate: (screen: string) => void;
}

const { width } = Dimensions.get('window');

export const FormsMenu: React.FC<FormsMenuProps> = ({ onNavigate }) => {
  const forms = [
    { id: 'blood-sugar', label: 'Kan Şekeri İzlem', icon: Droplets, color: '#FEF2F2', iconColor: '#EF4444' },
    { id: 'physical-activity', label: 'Fiziksel Aktivite', icon: Activity, color: '#EFF6FF', iconColor: '#3B82F6' },
    { id: 'nutrition', label: 'Beslenme Değerlendirme', icon: Apple, color: '#F0FDF4', iconColor: '#22C55E' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {forms.map((form) => (
          <TouchableOpacity
            key={form.id}
            onPress={() => onNavigate(form.id)}
            style={styles.card}
          >
            <View style={[styles.iconBox, { backgroundColor: form.color }]}>
              <form.icon size={36} color={form.iconColor} />
            </View>
            <Text style={styles.label}>{form.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    paddingBottom: 32,
  },
  card: {
    width: '47.5%',
    minHeight: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 18,
  },
});
