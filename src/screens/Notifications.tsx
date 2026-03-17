import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Bell, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Ölçüm Hatırlatıcı', message: 'Öğle yemeği sonrası 1. saat kan şekeri ölçüm zamanınız geldi.', time: '10 dk önce', type: 'reminder', icon: Clock, color: '#3B82F6', bgColor: '#EFF6FF', read: false },
    { id: 2, title: 'Düşük Kan Şekeri Uyarısı', message: 'Son ölçümünüz (60 mg/dL) hedef aralığın altında. Lütfen müdahale edin.', time: '2 saat önce', type: 'alert', icon: AlertCircle, color: '#EF4444', bgColor: '#FEF2F2', read: false },
    { id: 3, title: 'Yeni Eğitim İçeriği', message: '"Hipoglisemi Yönetimi" videosu eğitim listenize eklendi.', time: '5 saat önce', type: 'info', icon: Bell, color: '#A855F7', bgColor: '#FAF5FF', read: false },
    { id: 4, title: 'Hedef Tamamlandı', message: 'Tebrikler! Günlük su tüketimi hedefinize ulaştınız.', time: 'Dün', type: 'success', icon: CheckCircle2, color: '#22C55E', bgColor: '#F0FDF4', read: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bildirimler</Text>
        {notifications.some(n => !n.read) && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markReadText}>Tümünü Oku</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.list}>
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <View 
              key={notif.id} 
              style={[
                styles.notifCard, 
                notif.read && styles.readCard,
                !notif.read && styles.unreadCard
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: notif.bgColor }]}>
                <Icon size={24} color={notif.color} />
              </View>
              <View style={styles.content}>
                <View style={styles.notifHeader}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    {!notif.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.timeText}>{notif.time}</Text>
                </View>
                <Text style={styles.messageText}>{notif.message}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <Bell size={48} color="#CBD5E1" />
          <Text style={styles.emptyText}>Henüz bir bildiriminiz bulunmuyor.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A5F7A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  list: {
    gap: 12,
  },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  unreadCard: {
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 122, 0.1)',
  },
  readCard: {
    opacity: 0.6,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#1A5F7A',
    borderRadius: 4,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
  },
  messageText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
  },
});
