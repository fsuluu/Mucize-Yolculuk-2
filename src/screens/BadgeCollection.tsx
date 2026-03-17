import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy, Star, Award, Medal, Zap, Target, Flame, Lock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Badge } from '../types';

interface BadgeCollectionProps {
  badges: Badge[];
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges }) => {
  const getIcon = (iconName: string, color: string, isUnlocked: boolean) => {
    const size = 32;
    const iconColor = isUnlocked ? color : '#94A3B8';
    
    switch (iconName) {
      case 'trophy': return <Trophy size={size} color={iconColor} />;
      case 'star': return <Star size={size} color={iconColor} />;
      case 'award': return <Award size={size} color={iconColor} />;
      case 'medal': return <Medal size={size} color={iconColor} />;
      case 'zap': return <Zap size={size} color={iconColor} />;
      case 'target': return <Target size={size} color={iconColor} />;
      case 'flame': return <Flame size={size} color={iconColor} />;
      default: return <Trophy size={size} color={iconColor} />;
    }
  };

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const progress = unlockedCount / badges.length;

  const levelBenefits = [
    { level: 1, benefit: 'Temel özelliklere erişim' },
    { level: 5, benefit: 'Özel "Şeker Ustası" rozeti kilidi' },
    { level: 10, benefit: 'Yeni uygulama temaları (Yakında)' },
    { level: 20, benefit: 'Sertifikalı Anne ünvanı' },
  ];

  const getBadgeDescription = (badge: Badge) => {
    if (badge.isUnlocked) return badge.description;
    
    // Transform past tense to necessity for locked badges
    return badge.description
      .replace('yaptın!', 'yapmalısın!')
      .replace('yaptın.', 'yapmalısın.')
      .replace('tamamlandı.', 'tamamlanmalı.')
      .replace('ulaştın.', 'ulaşmalısın.')
      .replace('tamamladın.', 'tamamlamalısın.')
      .replace('aralıkta.', 'aralıkta olmalı.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Section */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Koleksiyon İlerlemesi</Text>
              <Text style={styles.progressSubtitle}>{unlockedCount} / {badges.length} Rozet Açıldı</Text>
            </View>
            <View style={styles.percentageCircle}>
              <Text style={styles.percentageText}>%{Math.round(progress * 100)}</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.motivationText}>
            {progress === 1 ? 'Tebrikler! Tüm koleksiyonu tamamladın!' : 'Yeni rozetler kazanmak için günlük görevlerini tamamla!'}
          </Text>
        </View>

        {/* Level Benefits Section */}
        <View style={styles.levelCard}>
          <Text style={styles.levelTitle}>Seviye Avantajları</Text>
          <Text style={styles.levelDesc}>Puan kazandıkça seviyen artar ve yeni özelliklerin kilidini açarsın.</Text>
          <View style={styles.benefitsList}>
            {levelBenefits.map((item, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.levelNumberBox}>
                  <Text style={styles.levelNumber}>Lvl {item.level}</Text>
                </View>
                <Text style={styles.benefitText}>{item.benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.gridTitle}>Rozetlerin</Text>
        <View style={styles.badgeGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, !badge.isUnlocked && styles.lockedCard]}>
              <View style={[styles.iconContainer, { backgroundColor: badge.isUnlocked ? `${badge.color}15` : '#F1F5F9' }]}>
                {getIcon(badge.icon, badge.color, badge.isUnlocked)}
                {!badge.isUnlocked && (
                  <View style={styles.lockOverlay}>
                    <Lock size={12} color="#64748B" />
                  </View>
                )}
              </View>
              <Text style={[styles.badgeName, !badge.isUnlocked && styles.lockedText]}>{badge.name}</Text>
              <Text style={styles.badgeDesc}>{getBadgeDescription(badge)}</Text>
              
              {!badge.isUnlocked ? (
                <View style={styles.requirementBox}>
                  <Text style={styles.requirementText}>{badge.requirement}</Text>
                </View>
              ) : (
                <View style={styles.unlockedBadge}>
                  <CheckCircle2 size={12} color="#22C55E" />
                  <Text style={styles.unlockedText}>Kazanıldı</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  percentageCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#14B8A6',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#14B8A6',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 5,
  },
  motivationText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  levelDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelNumberBox: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
  },
  benefitText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48.5%', // Adjusted for 2 columns with space-between
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 12,
  },
  lockedCard: {
    opacity: 0.9,
    backgroundColor: '#FDFDFD',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 6,
  },
  lockedText: {
    color: '#64748B',
  },
  badgeDesc: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 16,
    height: 30, // Fixed height for alignment
  },
  requirementBox: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    width: '100%',
  },
  requirementText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  unlockedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
});
