import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PlayCircle, BookOpen, FileText, ChevronRight, ArrowLeft, Clock, Share2 } from 'lucide-react';

export const Education: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const modules = [
    { id: 1, title: 'Gebelik Diyabeti Nedir?', type: 'Video', duration: '5:30 dk', icon: PlayCircle, color: '#3B82F6', content: 'Gebelik diyabeti (gestasyonel diyabet), ilk kez gebelik sırasında ortaya çıkan veya fark edilen kan şekeri yüksekliğidir. Genellikle doğumdan sonra düzelir.' },
    { id: 2, title: 'Beslenme İlkeleri', type: 'Okuma', duration: '10 dk', icon: BookOpen, color: '#22C55E', content: 'Dengeli beslenme, gebelik diyabeti yönetiminin temel taşıdır. Karbonhidrat sayımı ve öğün düzeni çok önemlidir.' },
    { id: 3, title: 'İnsülin Uygulama Teknikleri', type: 'Video', duration: '8:15 dk', icon: PlayCircle, color: '#EF4444', content: 'İnsülin, kalem veya enjektör ile cilt altına uygulanır. Uygulama bölgeleri karın, uyluk ve üst koldur.' },
    { id: 4, title: 'Egzersiz ve Hareket', type: 'Rehber', duration: '15 dk', icon: FileText, color: '#F97316', content: 'Düzenli yürüyüş, kan şekerini kontrol altında tutmaya yardımcı olur. Haftada en az 150 dakika orta şiddetli aktivite önerilir.' },
    { id: 5, title: 'Hipoglisemi Yönetimi', type: 'Video', duration: '4:45 dk', icon: PlayCircle, color: '#A855F7', content: 'Kan şekerinin 70 mg/dL altına düşmesine hipoglisemi denir. Belirtileri titreme, terleme ve açlık hissidir.' },
  ];

  if (selectedModule) {
    const Icon = selectedModule.icon;
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => setSelectedModule(null)}
          style={styles.backButton}
        >
          <ArrowLeft size={18} color="#1A5F7A" />
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>

        <View style={styles.detailCard}>
          <View style={[styles.detailImage, { backgroundColor: '#F1F5F9' }]}>
            <Icon size={64} color={selectedModule.color} strokeWidth={1.5} />
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailMeta}>
              <View style={styles.metaLeft}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{selectedModule.type}</Text>
                </View>
                <View style={styles.durationRow}>
                  <Clock size={10} color="#64748B" />
                  <Text style={styles.durationText}>{selectedModule.duration}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shareButton}>
                <Share2 size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.detailTitle}>{selectedModule.title}</Text>
            
            <View style={styles.detailBody}>
              <Text style={styles.detailDescription}>{selectedModule.content}</Text>
              <View style={styles.infoBanner}>
                <Text style={styles.infoBannerText}>
                  Bu içerik uzman doktorlarımız tarafından onaylanmıştır.
                </Text>
              </View>
              
              {selectedModule.type === 'Video' && (
                <View style={styles.videoPlaceholder}>
                  <PlayCircle size={48} color="rgba(255, 255, 255, 0.5)" />
                  <Text style={styles.videoPlaceholderText}>Video Oynatıcı Hazırlanıyor</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <View style={styles.bannerCircle} />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Eğitim Modülleri</Text>
          <Text style={styles.bannerSubtitle}>Sağlıklı bir gebelik süreci için hazırladığımız eğitim içeriklerini buradan takip edebilirsiniz.</Text>
        </View>
      </View>

      <View style={styles.moduleList}>
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <TouchableOpacity 
              key={module.id} 
              onPress={() => setSelectedModule(module)}
              style={styles.moduleCard}
            >
              <View style={styles.moduleInfo}>
                <View style={styles.moduleIconBox}>
                  <Icon size={24} color={module.color} />
                </View>
                <View style={styles.moduleTextContainer}>
                  <Text style={styles.moduleTitleText}>{module.title}</Text>
                  <View style={styles.moduleMetaRow}>
                    <Text style={styles.moduleTypeText}>{module.type}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.moduleDurationText}>{module.duration}</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A5F7A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  detailImage: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  detailContent: {
    padding: 24,
    gap: 16,
  },
  detailMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeBadge: {
    backgroundColor: 'rgba(26, 95, 122, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1A5F7A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  shareButton: {
    width: 36,
    height: 36,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  detailBody: {
    gap: 20,
  },
  detailDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 24,
    fontWeight: '500',
  },
  infoBanner: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  infoBannerText: {
    fontSize: 12,
    color: '#0369A1',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
  },
  videoPlaceholder: {
    aspectRatio: 16 / 9,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  videoPlaceholderText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerBanner: {
    backgroundColor: '#1A5F7A',
    borderRadius: 28,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 24,
  },
  bannerCircle: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 70,
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    fontWeight: '500',
  },
  moduleList: {
    gap: 12,
    paddingBottom: 32,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  moduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  moduleIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  moduleTextContainer: {
    gap: 4,
    flex: 1,
  },
  moduleTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
  },
  moduleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moduleTypeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 1.5,
  },
  moduleDurationText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
