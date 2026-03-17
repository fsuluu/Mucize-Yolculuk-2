import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Apple, Plus, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface NutritionAssessmentProps {
  onAddPoints?: (amount: number) => void;
}

export const NutritionAssessment: React.FC<NutritionAssessmentProps> = ({ onAddPoints }) => {
  const [step, setStep] = useState<'form' | 'selection'>('form');
  const [totalCalories, setTotalCalories] = useState(0);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedItems, setAddedItems] = useState<any[]>([]);

  const foods = [
    { id: 1, name: 'Ayran', cal: 114, unit: 'Cc', per: 300, desc: '1,5 su bardağı' },
    { id: 2, name: 'Yumurta (Haşlanmış)', cal: 78, unit: 'Adet', per: 1, desc: '1 orta boy' },
    { id: 3, name: 'Peynir (Tam Yağlı)', cal: 93, unit: 'Gram', per: 30, desc: '1 dilim' },
    { id: 4, name: 'Zeytin', cal: 45, unit: 'Adet', per: 5, desc: '5 adet orta boy' },
    { id: 5, name: 'Ekmek (Tam Buğday)', cal: 65, unit: 'Dilim', per: 1, desc: '1 ince dilim' },
    { id: 6, name: 'Süt', cal: 120, unit: 'Cc', per: 200, desc: '1 su bardağı' },
    { id: 7, name: 'Yoğurt', cal: 130, unit: 'Gram', per: 200, desc: '1 kase' },
    { id: 8, name: 'Ceviz', cal: 130, unit: 'Adet', per: 2, desc: '2 tam ceviz' },
  ];

  const handleSave = () => {
    if (!amount || !selectedFood) return;
    const addedCals = (parseFloat(amount) / selectedFood.per) * selectedFood.cal;
    
    const newItem = {
      id: Date.now(),
      name: selectedFood.name,
      amount: amount,
      unit: selectedFood.unit,
      calories: addedCals
    };

    setAddedItems(prev => [...prev, newItem]);
    setTotalCalories(prev => prev + addedCals);
    
    // Award points for logging nutrition
    if (onAddPoints) {
      onAddPoints(50);
    }

    setAmount('');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setStep('form');
      setSelectedFood(null);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {step === 'form' ? (
        <View style={styles.stepContainer}>
          {/* Form Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Beslenme Ekleme Formu</Text>
            
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gebelik Haftasını Seçiniz</Text>
                <View style={styles.pickerSim}>
                  <Text style={styles.pickerText}>12. Hafta</Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Öğünü Seçiniz</Text>
                <View style={styles.pickerSim}>
                  <Text style={styles.pickerText}>Sabah</Text>
                </View>
              </View>

              <TouchableOpacity 
                onPress={() => setStep('selection')}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Besin Seçimine Git</Text>
                <ChevronRight size={16} color="#159895" />
              </TouchableOpacity>
            </View>

            {addedItems.length > 0 && (
              <View style={styles.addedItemsContainer}>
                <Text style={styles.addedItemsTitle}>Eklenen Besinler</Text>
                {addedItems.map(item => (
                  <View key={item.id} style={styles.addedItemRow}>
                    <View>
                      <Text style={styles.addedItemName}>{item.name}</Text>
                      <Text style={styles.addedItemDetails}>{item.amount} {item.unit}</Text>
                    </View>
                    <Text style={styles.addedItemCalories}>{item.calories.toFixed(1)} cal</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.statsBox}>
              <Text style={styles.statsLabel}>Toplam Kalori:</Text>
              <Text style={styles.statsValue}>{totalCalories.toFixed(2)} cal</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.stepContainer}>
          <TouchableOpacity 
            onPress={() => setStep('form')}
            style={styles.backButton}
          >
            <ChevronLeft size={14} color="#1A5F7A" />
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>

          {/* Add Food Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Besin Seçimi</Text>
            
            {!selectedFood ? (
              <ScrollView style={styles.foodList} showsVerticalScrollIndicator={false}>
                {foods.map(food => (
                  <TouchableOpacity 
                    key={food.id}
                    style={styles.foodItem}
                    onPress={() => setSelectedFood(food)}
                  >
                    <View style={styles.foodIconBox}>
                      <Apple size={20} color="#1A5F7A" />
                    </View>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      <Text style={styles.foodDesc}>{food.desc} ({food.cal} cal)</Text>
                    </View>
                    <Plus size={18} color="#CBD5E1" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.form}>
                <TouchableOpacity 
                  onPress={() => setSelectedFood(null)}
                  style={styles.selectedFoodHeader}
                >
                  <Text style={styles.selectedFoodName}>{selectedFood.name}</Text>
                  <Text style={styles.changeText}>Değiştir</Text>
                </TouchableOpacity>

                <View style={styles.infoBox}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Besin Adı</Text>
                    <Text style={styles.infoValue}>{selectedFood.name}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Kalorisi</Text>
                    <Text style={styles.infoValue}>{selectedFood.cal} cal / {selectedFood.per} {selectedFood.unit}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ölçüm Birimi</Text>
                    <Text style={styles.infoValue}>{selectedFood.unit}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ölçüm Açıklaması</Text>
                    <Text style={styles.infoValue}>{selectedFood.desc}</Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Besin miktarını giriniz ({selectedFood.unit})</Text>
                  <TextInput 
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Miktar giriniz..."
                    value={amount}
                    onChangeText={setAmount}
                    autoFocus
                  />
                </View>

                <TouchableOpacity 
                  onPress={handleSave}
                  style={[styles.saveButton, showSuccess && styles.successButton]}
                >
                  {showSuccess ? (
                    <CheckCircle2 size={18} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.saveButtonText}>LİSTEYE KAYDET</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    gap: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1A5F7A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  pickerSim: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  nextButton: {
    height: 52,
    backgroundColor: 'rgba(21, 152, 149, 0.08)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(21, 152, 149, 0.15)',
    marginTop: 8,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#159895',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsBox: {
    marginTop: 24,
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A5F7A',
  },
  infoBox: {
    backgroundColor: 'rgba(26, 95, 122, 0.05)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 122, 0.1)',
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  input: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1E293B',
  },
  saveButton: {
    height: 52,
    backgroundColor: '#1A5F7A',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 8,
  },
  successButton: {
    backgroundColor: '#22C55E',
    shadowColor: '#22C55E',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  foodList: {
    maxHeight: 400,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 12,
  },
  foodIconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  foodDesc: {
    fontSize: 12,
    color: '#64748B',
  },
  selectedFoodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  selectedFoodName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A5F7A',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#159895',
  },
  addedItemsContainer: {
    marginTop: 24,
    gap: 12,
  },
  addedItemsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  addedItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  addedItemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  addedItemDetails: {
    fontSize: 11,
    color: '#64748B',
  },
  addedItemCalories: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A5F7A',
  },
});
