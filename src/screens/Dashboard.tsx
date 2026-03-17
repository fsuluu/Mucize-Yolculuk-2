import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ClipboardList, GraduationCap, Target, HelpCircle, Bell, BarChart3, MessageSquare, User, Trophy, Star, Award, Zap, Medal, Flame, ChevronRight, CheckCircle2, Heart, Gift, Sparkles } from 'lucide-react';
import { Badge, Quest } from '../types';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  points: number;
  level: number;
  badges: Badge[];
  streak: number;
  nextMilestone: number;
  quests: Quest[];
  onCompleteQuest: (type: Quest['type']) => void;
  onDailySpin: () => void;
  canSpin: boolean;
}

const { width } = Dimensions.get('window');

export const Dashboard: React.FC<DashboardProps> = ({ 
  onNavigate, 
  points, 
  level, 
  badges, 
  streak, 
  nextMilestone, 
  quests, 
  onCompleteQuest,
  onDailySpin,
  canSpin
}) => {
  const menuItems = [
    { id: 'forms', label: 'Formlar', icon: ClipboardList, color: '#EFF6FF', iconColor: '#2563EB' },
    { id: 'education', label: 'Eğitimler', icon: GraduationCap, color: '#F0FDFA', iconColor: '#0D9488' },
    { id: 'goals', label: 'Günlük Hedefler', icon: Target, color: '#FFF7ED', iconColor: '#EA580C' },
    { id: 'faq', label: 'SSS', icon: HelpCircle, color: '#FAF5FF', iconColor: '#9333EA' },
    { id: 'notifications', label: 'Bildirimler', icon: Bell, color: '#FEF2F2', iconColor: '#DC2626' },
    { id: 'survey', label: 'Anket', icon: BarChart3, color: '#EEF2FF', iconColor: '#4F46E5' },
    { id: 'emergency', label: 'Whatsapp Acil', icon: MessageSquare, color: '#F0FDF4', iconColor: '#16A34A' },
  ];

  const milestoneProgress = (points % 500) / 500;

  const getBuddyMood = () => {
    const completedCount = quests.filter(q => q.isCompleted).length;
    if (completedCount === quests.length) return { text: 'Harika!', emoji: '🤩', color: '#16A34A' };
    if (completedCount > 0) return { text: 'İyi Gidiyoruz', emoji: '😊', color: '#2563EB' };
    return { text: 'Hadi Başlayalım!', emoji: '😴', color: '#64748B' };
  };

  const buddyMood = getBuddyMood();

  const getBadgeIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy size={14} color={color} />;
      case 'star': return <Star size={14} color={color} />;
      case 'award': return <Award size={14} color={color} />;
      case 'medal': return <Medal size={14} color={color} />;
      default: return <Trophy size={14} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Premium Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.gradientHeader}>
          {/* Decorative Circle */}
          <View style={styles.decorativeCircle} />
          
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={32} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            
            <View style={styles.welcomeTextContainer}>
              <View style={styles.badgeRow}>
                <Text style={styles.badgeText}>Anne Paneli</Text>
                <View style={styles.badgeLine} />
              </View>
              <Text style={styles.userName}>
                Sayın <Text style={styles.userNameBold}>Sibel KARAKOÇ</Text>
              </Text>
              <Text style={styles.greeting}>Bugün kendinizi nasıl hissediyorsunuz?</Text>
            </View>
          </View>
        </View>
        
        {/* Quick Stats / Status Bar */}
        <View style={styles.statusBar}>
          <View style={styles.statusLeft}>
            <Flame size={14} color="#F97316" fill="#F97316" />
            <Text style={styles.streakText}>{streak} Günlük Seri!</Text>
          </View>
          <View style={styles.lastMeasureBox}>
            <Text style={styles.lastMeasureText}>Son Ölçüm: 92 mg/dL</Text>
          </View>
        </View>
      </View>

      {/* Health Buddy & Daily Spin Row */}
      <View style={styles.buddyRow}>
        <View style={styles.buddyCard}>
          <View style={styles.buddyIconContainer}>
            <Text style={styles.buddyEmoji}>{buddyMood.emoji}</Text>
            <View style={[styles.moodIndicator, { backgroundColor: buddyMood.color }]} />
          </View>
          <View style={styles.buddyTextContainer}>
            <Text style={styles.buddyTitle}>Sağlık Arkadaşın</Text>
            <Text style={[styles.buddyStatus, { color: buddyMood.color }]}>{buddyMood.text}</Text>
          </View>
          <Heart size={16} color="#F43F5E" fill="#F43F5E" style={styles.heartIcon} />
        </View>

        <TouchableOpacity 
          style={[styles.spinCard, !canSpin && styles.disabledSpinCard]} 
          onPress={onDailySpin}
          disabled={!canSpin}
        >
          <View style={styles.spinIconContainer}>
            <Gift size={20} color={canSpin ? '#9333EA' : '#94A3B8'} />
            {canSpin && <View style={styles.spinBadge} />}
          </View>
          <Text style={styles.spinTitle}>Günlük Şans</Text>
          <Text style={styles.spinSubtitle}>{canSpin ? 'Hemen Çevir!' : 'Yarın Tekrar Gel'}</Text>
          {canSpin && <Sparkles size={12} color="#9333EA" style={styles.sparkleIcon} />}
        </TouchableOpacity>
      </View>

      {/* Gamification Stats */}
      <View style={styles.gamificationRow}>
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Zap size={16} color="#EAB308" fill="#EAB308" />
            <Text style={styles.pointsLabel}>Puan</Text>
          </View>
          <Text style={styles.pointsValue}>{points.toLocaleString()}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Seviye {level}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.badgesCard}
          onPress={() => onNavigate('badges')}
        >
          <View style={styles.badgesHeader}>
            <Text style={styles.badgesTitle}>Rozetlerin</Text>
            <ChevronRight size={12} color="#94A3B8" />
          </View>
          <View style={styles.badgeIcons}>
            {badges.filter(b => b.isUnlocked).slice(0, 4).map((badge) => (
              <View key={badge.id} style={[styles.miniBadge, { backgroundColor: `${badge.color}15` }]}>
                {getBadgeIcon(badge.icon, badge.color)}
              </View>
            ))}
            {badges.filter(b => b.isUnlocked).length > 4 && (
              <View style={styles.moreBadge}>
                <Text style={styles.moreBadgeText}>+{badges.filter(b => b.isUnlocked).length - 4}</Text>
              </View>
            )}
            {badges.filter(b => b.isUnlocked).length === 0 && (
              <Text style={styles.noBadgesText}>Henüz rozet yok</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Daily Quests */}
      <View style={styles.questsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Günün Görevleri</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>Hepsini Gör</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.questsScroll}>
          {quests.map((quest) => (
            <View key={quest.id} style={[styles.questCard, quest.isCompleted && styles.completedQuestCard]}>
              <View style={[styles.questIconBox, { backgroundColor: quest.isCompleted ? '#F0FDF4' : '#F8FAFC' }]}>
                {quest.isCompleted ? (
                  <CheckCircle2 size={20} color="#16A34A" />
                ) : (
                  <Zap size={20} color="#EAB308" />
                )}
              </View>
              <View style={styles.questContent}>
                <Text style={[styles.questTitle, quest.isCompleted && styles.completedQuestText]}>{quest.title}</Text>
                <View style={styles.rewardRow}>
                  <Zap size={10} color="#EAB308" fill="#EAB308" />
                  <Text style={styles.rewardText}>+{quest.reward} Puan</Text>
                </View>
              </View>
              {quest.isCompleted && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>Tamamlandı</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Milestone Progress */}
      <View style={styles.milestoneCard}>
        <View style={styles.milestoneHeader}>
          <Text style={styles.milestoneTitle}>Sonraki Hedef: {nextMilestone} Puan</Text>
          <Text style={styles.milestonePercent}>%{Math.round(milestoneProgress * 100)}</Text>
        </View>
        <View style={styles.milestoneBarBg}>
          <View style={[styles.milestoneBarFill, { width: `${milestoneProgress * 100}%` }]} />
        </View>
        <Text style={styles.milestoneDesc}>Yeni bir rozet açmak için {nextMilestone - points} puan daha kazan!</Text>
      </View>

      {/* Grid Menu */}
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNavigate(item.id)}
            style={styles.menuItem}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <item.icon size={28} color={item.iconColor} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
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
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gradientHeader: {
    backgroundColor: '#1A5F7A',
    padding: 24,
    position: 'relative',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 80,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: '#22C55E',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#1A5F7A',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  badgeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  badgeLine: {
    height: 1,
    width: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '400',
  },
  userNameBold: {
    fontWeight: '800',
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  statusBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F97316',
  },
  lastMeasureBox: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  lastMeasureText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1A5F7A',
  },
  gamificationRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  buddyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  buddyCard: {
    flex: 1.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  buddyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buddyEmoji: {
    fontSize: 24,
  },
  moodIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buddyTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  buddyTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  buddyStatus: {
    fontSize: 13,
    fontWeight: '700',
  },
  heartIcon: {
    marginLeft: 4,
  },
  spinCard: {
    flex: 1,
    backgroundColor: '#FAF5FF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3E8FF',
    position: 'relative',
    overflow: 'hidden',
  },
  disabledSpinCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
  },
  spinIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  spinBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  spinTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
  },
  spinSubtitle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9333EA',
  },
  sparkleIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  pointsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
  },
  levelBadge: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  levelText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0D9488',
  },
  badgesCard: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    justifyContent: 'center',
    gap: 10,
  },
  badgesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  noBadgesText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  questsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  seeAllButton: {
    padding: 4,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A5F7A',
  },
  questsScroll: {
    paddingRight: 16,
    gap: 12,
  },
  questCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  completedQuestCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
  },
  questIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questContent: {
    flex: 1,
  },
  questTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  completedQuestText: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EAB308',
  },
  completedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  completedBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#16A34A',
    textTransform: 'uppercase',
  },
  badgeIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  miniBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  moreBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  moreBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  milestoneCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
  },
  milestonePercent: {
    fontSize: 12,
    fontWeight: '900',
    color: '#14B8A6',
  },
  milestoneBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  milestoneBarFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 4,
  },
  milestoneDesc: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    paddingBottom: 32,
  },
  menuItem: {
    width: '47.5%', // Slightly less than 50% to account for gap/spacing
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
});
