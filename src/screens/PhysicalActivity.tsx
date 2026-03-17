import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Plus, Trash2, Clock, Calendar, Activity } from 'lucide-react';
import { ActivityRecord } from '../types';

interface PhysicalActivityProps {
  onAddPoints?: (amount: number) => void;
}

export const PhysicalActivity: React.FC<PhysicalActivityProps> = ({ onAddPoints }) => {
  const [activities, setActivities] = useState<ActivityRecord[]>([
    {
      id: '1',
      type: 'yürüyüş',
      duration: 30,
      status: 'Yapıldı',
      dateTime: '23-08-2022 08:25'
    },
    {
      id: '2',
      type: 'yürüyüş',
      duration: 20,
      status: 'Yapıldı',
      dateTime: '05-03-2023 14:17'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newType, setNewType] = useState('Yürüyüş');
  const [newDuration, setNewDuration] = useState('');

  const handleAdd = () => {
    if (!newDuration) return;
    const newActivity: ActivityRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type: newType,
      duration: parseInt(newDuration),
      status: 'Yapıldı',
      dateTime: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setActivities([newActivity, ...activities]);
    
    // Award points for logging activity
    if (onAddPoints) {
      onAddPoints(100);
    }

    setNewDuration('');
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>
          Düzenli fiziksel aktivite gebelik diyabeti yönetiminde kritik rol oynar. 
          Lütfen aktivitelerinizi günlük olarak kaydediniz.
        </Text>
        <View style={styles.headerFooter}>
          <Text style={styles.lastRecordText}>
            Son Kayıt: {activities.length > 0 ? activities[0].dateTime.split(' ')[0] : '-'}
          </Text>
          <TouchableOpacity 
            onPress={() => setShowAddModal(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showSuccess && (
        <View style={styles.successToast}>
          <Activity size={16} color="#FFFFFF" />
          <Text style={styles.successToastText}>Aktivite Kaydedildi! +100 Puan</Text>
        </View>
      )}

      {/* Activity List */}
      <View style={styles.list}>
        {activities.map((activity, index) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.cardHeader}>
              <View style={styles.activityInfo}>
                <View style={styles.iconBox}>
                  <Activity size={24} color="#159895" />
                </View>
                <View>
                  <Text style={styles.activityTitle}>{activities.length - index}. Gün Aktivitesi</Text>
                  <Text style={styles.activityType}>{activity.type}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{activity.status}</Text>
              </View>
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Süre</Text>
                <View style={styles.detailValueRow}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.detailValue}>{activity.duration} dk</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Tarih-Saat</Text>
                <View style={styles.detailValueRow}>
                  <Calendar size={14} color="#64748B" />
                  <Text style={styles.detailValue}>{activity.dateTime}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                onPress={() => handleDelete(activity.id)}
                style={styles.deleteButton}
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
            <Text style={styles.modalTitle}>Aktivite Ekle</Text>
            <View style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Aktivite Türü</Text>
                <View style={styles.pickerSim}>
                  <View style={styles.pickerOptions}>
                    {['Yürüyüş', 'Yoga', 'Yüzme', 'Esneme'].map(t => (
                      <TouchableOpacity key={t} onPress={() => setNewType(t)} style={[styles.option, newType === t && styles.optionActive]}>
                        <Text style={[styles.optionText, newType === t && styles.optionTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Süre (Dakika)</Text>
                <TextInput 
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={newDuration}
                  onChangeText={setNewDuration}
                  placeholder="Örn: 30"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  headerText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    fontWeight: '500',
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  lastRecordText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    borderLeftWidth: 6,
    borderLeftColor: '#159895',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(21, 152, 149, 0.08)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  activityType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#159895',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: 'rgba(21, 152, 149, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#159895',
    textTransform: 'uppercase',
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 18,
  },
  detailItem: {
    gap: 6,
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
