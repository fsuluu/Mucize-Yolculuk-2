import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Platform } from 'react-native';
import { Calendar, Plus, Info, Trash2, Clock, Droplet, Utensils, CheckCircle2 } from 'lucide-react';
import { BloodSugarRecord } from '../types';

interface BloodSugarTrackingProps {
  onAddPoints?: (amount: number) => void;
}

export const BloodSugarTracking: React.FC<BloodSugarTrackingProps> = ({ onAddPoints }) => {
  const [records, setRecords] = useState<BloodSugarRecord[]>([
    {
      id: '1',
      meal: 'Sabah',
      hungerStatus: 'Açlık',
      date: '05-03-2023',
      time: '16:58:00',
      value: 60,
      insulinDose: '-'
    }
  ]);

  const [showWarning, setShowWarning] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newMeal, setNewMeal] = useState('Sabah');

  const handleAdd = () => {
    if (!newValue) return;
    const val = parseInt(newValue);
    const newRecord: BloodSugarRecord = {
      id: Math.random().toString(36).substr(2, 9),
      meal: newMeal,
      hungerStatus: 'Açlık',
      date: new Date().toLocaleDateString('tr-TR'),
      time: new Date().toLocaleTimeString('tr-TR'),
      value: val,
      insulinDose: '-'
    };
    setRecords([newRecord, ...records]);
    
    // Award points for logging blood sugar
    if (onAddPoints) {
      onAddPoints(30);
    }

    setNewValue('');
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    if (val < 70) setShowWarning(true);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <View style={styles.dateInfo}>
          <Calendar size={20} color="#1A5F7A" />
          <Text style={styles.dateText}>{new Date().toLocaleDateString('tr-TR')}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setShowAddModal(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {showSuccess && (
        <View style={styles.successToast}>
          <CheckCircle2 size={16} color="#FFFFFF" />
          <Text style={styles.successToastText}>Kayıt Başarılı! +30 Puan</Text>
        </View>
      )}

      {/* Records List */}
      <View style={styles.list}>
        {records.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            {record.value < 70 && <View style={styles.warningIndicator} />}
            
            <View style={styles.cardHeader}>
              <View style={styles.mealInfo}>
                <View style={styles.iconBox}>
                  <Utensils size={20} color="#1A5F7A" />
                </View>
                <View>
                  <Text style={styles.mealName}>{record.meal}</Text>
                  <Text style={styles.hungerStatus}>{record.hungerStatus}</Text>
                </View>
              </View>
              <View style={styles.valueContainer}>
                <Text style={[styles.valueText, record.value < 70 && styles.warningText]}>
                  {record.value} <Text style={styles.unitText}>mg/dL</Text>
                </Text>
              </View>
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.detailItem}>
                <Calendar size={14} color="#64748B" />
                <Text style={styles.detailText}>{record.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.detailText}>{record.time}</Text>
              </View>
              <View style={[styles.detailItem, { width: '100%', marginTop: 8 }]}>
                <Droplet size={14} color="#159895" />
                <Text style={styles.detailText}>
                  İnsülin Dozu: <Text style={styles.detailValue}>{record.insulinDose}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Info size={18} color="#159895" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(record.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Add Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Kayıt Ekle</Text>
            <View style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Öğün</Text>
                <View style={styles.pickerSim}>
                  <Text style={styles.pickerText}>{newMeal}</Text>
                  {/* Simplified picker for now */}
                  <View style={styles.pickerOptions}>
                    {['Sabah', 'Öğle', 'Akşam', 'Ara Öğün'].map(m => (
                      <TouchableOpacity key={m} onPress={() => setNewMeal(m)} style={[styles.option, newMeal === m && styles.optionActive]}>
                        <Text style={[styles.optionText, newMeal === m && styles.optionTextActive]}>{m}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Değer (mg/dL)</Text>
                <TextInput 
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={newValue}
                  onChangeText={setNewValue}
                  placeholder="Örn: 90"
                />
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  onPress={() => setShowAddModal(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleAdd}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Warning Modal */}
      <Modal
        visible={showWarning}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWarning(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.warningModal]}>
            <View style={styles.warningHeader}>
              <View style={styles.warningIconBox}>
                <Info size={24} color="#EF4444" />
              </View>
              <Text style={styles.warningTitle}>UYARI</Text>
            </View>
            
            <Text style={styles.warningMessage}>
              Lütfen 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. Ardından ek bir ara öğün alınız. 
              15 dakika sonra kan şekerine bakınız. Normal sınırlara dönene kadar tekrarlayınız ve diyabet eğitiminizden danışmanlık alınız.
            </Text>

            <TouchableOpacity 
              onPress={() => setShowWarning(false)}
              style={styles.warningOkButton}
            >
              <Text style={styles.warningOkButtonText}>TAMAM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateText: {
    color: '#1A5F7A',
    fontWeight: '800',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#1A5F7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  list: {
    gap: 16,
    paddingBottom: 20,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  warningIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: '#EF4444',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(26, 95, 122, 0.08)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  hungerStatus: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A5F7A',
  },
  warningText: {
    color: '#EF4444',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 18,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  detailValue: {
    color: '#1E293B',
    fontWeight: '700',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(21, 152, 149, 0.08)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  modalForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalInput: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1E293B',
  },
  pickerSim: {
    gap: 8,
  },
  pickerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A5F7A',
    marginBottom: 4,
  },
  pickerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  optionActive: {
    backgroundColor: '#1A5F7A',
  },
  optionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#64748B',
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#1A5F7A',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  warningModal: {
    borderTopWidth: 4,
    borderTopColor: '#EF4444',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  warningIconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    letterSpacing: -0.5,
  },
  warningMessage: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: '500',
  },
  warningOkButton: {
    backgroundColor: '#1A5F7A',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningOkButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  successToast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    justifyContent: 'center',
  },
  successToastText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
