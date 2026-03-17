import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { MessageSquare, Phone, Clock, ShieldAlert, ExternalLink } from 'lucide-react';

export const Emergency: React.FC = () => {
  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Merhaba, desteğe ihtiyacım var.');
  };

  const handleCall = () => {
    Linking.openURL('tel:02125550000');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <View style={styles.bannerCircle} />
        <View style={styles.iconBox}>
          <ShieldAlert size={32} color="#FFFFFF" />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>ACİL DURUM</Text>
          <Text style={styles.headerSubtitle}>Hızlı destek için aşağıdaki kanalları kullanabilirsiniz.</Text>
        </View>
      </View>

      <View style={styles.actionList}>
        <TouchableOpacity onPress={handleWhatsApp} style={styles.actionCard}>
          <View style={[styles.actionIconBox, { backgroundColor: '#F0FDF4' }]}>
            <MessageSquare size={32} color="#22C55E" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Whatsapp Destek</Text>
            <Text style={styles.actionSubtitle}>Diyabet Eğitim Hemşiresi</Text>
            <View style={styles.actionLinkRow}>
              <Text style={styles.actionLinkText}>Hemen Mesaj Gönder</Text>
              <ExternalLink size={14} color="#22C55E" />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCall} style={styles.actionCard}>
          <View style={[styles.actionIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Phone size={32} color="#3B82F6" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Hastaneyi Ara</Text>
            <Text style={styles.actionSubtitle}>Kadın Doğum Acil Servis</Text>
            <View style={styles.actionLinkRow}>
              <Text style={[styles.actionLinkText, { color: '#3B82F6' }]}>0 (212) 555 00 00</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Clock size={20} color="#F97316" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Çalışma Saatleri</Text>
            <Text style={styles.infoDescription}>
              Whatsapp destek hattımız hafta içi 09:00 - 17:00 saatleri arasında hizmet vermektedir. 
              Acil durumlarda lütfen doğrudan hastaneyi arayınız.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerBanner: {
    backgroundColor: '#EF4444', // red-500
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    textAlign: 'center',
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 24,
  },
  bannerCircle: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 60,
  },
  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    textAlign: 'center',
  },
  actionList: {
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  actionIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  actionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  actionLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  actionLinkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  infoCard: {
    backgroundColor: '#FFF7ED',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C2410C',
  },
  infoDescription: {
    fontSize: 12,
    color: '#EA580C',
    lineHeight: 18,
  },
});
