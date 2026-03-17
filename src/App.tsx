/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { MobileLayout } from './components/Layout';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { ForgotPassword } from './screens/ForgotPassword';
import { Dashboard } from './screens/Dashboard';
import { FormsMenu } from './screens/FormsMenu';
import { BloodSugarTracking } from './screens/BloodSugarTracking';
import { PhysicalActivity } from './screens/PhysicalActivity';
import { NutritionAssessment } from './screens/NutritionAssessment';
import { DailyGoals } from './screens/DailyGoals';
import { Education } from './screens/Education';
import { FAQ } from './screens/FAQ';
import { Notifications } from './screens/Notifications';
import { Survey } from './screens/Survey';
import { Emergency } from './screens/Emergency';
import { BadgeCollection } from './screens/BadgeCollection';
import { Badge, Quest } from './types';
import { Zap, Sparkles, X } from 'lucide-react';

type Screen = 'login' | 'register' | 'forgot-password' | 'dashboard' | 'forms' | 'blood-sugar' | 'physical-activity' | 'nutrition' | 'goals' | 'education' | 'faq' | 'notifications' | 'survey' | 'emergency' | 'badges';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Gamification State
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(4);
  const [streak, setStreak] = useState(5); // 5 day streak
  const [nextMilestone, setNextMilestone] = useState(1500);
  const [canSpin, setCanSpin] = useState(true);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [lastSpinReward, setLastSpinReward] = useState(0);
  
  const [badges, setBadges] = useState<Badge[]>([
    { id: '1', name: 'İlk Adım', description: 'İlk kan şekeri kaydını yaptın!', icon: 'trophy', color: '#16A34A', isUnlocked: true, requirement: '1 Kayıt' },
    { id: '2', name: 'Yıldız Anne', description: '5 gün üst üste kayıt yaptın.', icon: 'star', color: '#2563EB', isUnlocked: true, requirement: '5 Gün Seri' },
    { id: '3', name: 'Aktif Yaşam', description: '10 egzersiz kaydı tamamlandı.', icon: 'award', color: '#EA580C', isUnlocked: true, requirement: '10 Egzersiz' },
    { id: '4', name: 'Şeker Ustası', description: 'Tüm değerlerin hedef aralıkta.', icon: 'medal', color: '#DC2626', isUnlocked: false, requirement: '30 Hedef Değer' },
    { id: '5', name: 'Su Perisi', description: 'Günlük su hedefine ulaştın.', icon: 'zap', color: '#0D9488', isUnlocked: false, requirement: '7 Gün Su Hedefi' },
    { id: '6', name: 'Hedef Avcısı', description: 'Tüm günlük görevleri tamamladın.', icon: 'target', color: '#9333EA', isUnlocked: false, requirement: '10 Tam Gün' },
  ]);

  const [quests, setQuests] = useState<Quest[]>([
    { id: 'q1', title: 'Sabah Ölçümü Yap', reward: 50, isCompleted: true, type: 'blood_sugar' },
    { id: 'q2', title: '30 Dakika Yürü', reward: 100, isCompleted: false, type: 'activity' },
    { id: 'q3', title: '2 Litre Su İç', reward: 30, isCompleted: false, type: 'water' },
  ]);

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    
    // Simple level up logic: every 500 points
    const newLevel = Math.floor(newPoints / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
    
    // Update next milestone
    if (newPoints >= nextMilestone) {
      setNextMilestone(nextMilestone + 500);
    }
  };

  const completeQuest = (type: Quest['type']) => {
    setQuests(prev => prev.map(q => {
      if (q.type === type && !q.isCompleted) {
        addPoints(q.reward);
        return { ...q, isCompleted: true };
      }
      return q;
    }));
  };

  const handleDailySpin = () => {
    if (!canSpin) return;
    
    // Random reward between 20 and 100
    const reward = Math.floor(Math.random() * 81) + 20;
    setLastSpinReward(reward);
    addPoints(reward);
    setCanSpin(false);
    setShowSpinModal(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (['register', 'forgot-password'].includes(currentScreen)) setCurrentScreen('login');
    else if (currentScreen === 'forms') setCurrentScreen('dashboard');
    else if (['blood-sugar', 'physical-activity', 'nutrition'].includes(currentScreen)) setCurrentScreen('forms');
    else if (['goals', 'education', 'faq', 'notifications', 'survey', 'emergency', 'badges'].includes(currentScreen)) setCurrentScreen('dashboard');
  };

  const getTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'Anasayfa';
      case 'forms': return 'Formlar';
      case 'blood-sugar': return 'Kan Şekeri İzlemlerim';
      case 'physical-activity': return 'Fiziksel Aktivitelerim';
      case 'nutrition': return 'Beslenme Değerlendirme';
      case 'goals': return 'Günlük Hedefler';
      case 'education': return 'Eğitimler';
      case 'faq': return 'Sıkça Sorulan Sorular';
      case 'notifications': return 'Bildirimler';
      case 'survey': return 'Anket';
      case 'emergency': return 'Acil Durum';
      case 'badges': return 'Rozet Koleksiyonu';
      default: return '';
    }
  };

  if (!isLoggedIn) {
    return (
      <MobileLayout>
        {currentScreen === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onNavigateRegister={() => navigateTo('register')}
            onNavigateForgot={() => navigateTo('forgot-password')}
          />
        )}
        {currentScreen === 'register' && (
          <Register 
            onBack={() => navigateTo('login')} 
            onRegister={handleLogin} 
          />
        )}
        {currentScreen === 'forgot-password' && (
          <ForgotPassword 
            onBack={() => navigateTo('login')} 
          />
        )}
      </MobileLayout>
    );
  }

  return (
    <MobileLayout 
      title={getTitle()} 
      showBack={currentScreen !== 'dashboard'} 
      onBack={goBack}
      showLogout={currentScreen === 'dashboard'}
      onLogout={handleLogout}
    >
      {currentScreen === 'dashboard' && (
        <Dashboard 
          onNavigate={(s) => navigateTo(s as Screen)} 
          points={points}
          level={level}
          badges={badges}
          streak={streak}
          nextMilestone={nextMilestone}
          quests={quests}
          onCompleteQuest={completeQuest}
          onDailySpin={handleDailySpin}
          canSpin={canSpin}
        />
      )}
      {currentScreen === 'forms' && <FormsMenu onNavigate={(s) => navigateTo(s as Screen)} />}
      {currentScreen === 'blood-sugar' && (
        <BloodSugarTracking 
          onAddPoints={(amt) => {
            addPoints(amt);
            completeQuest('blood_sugar');
          }} 
        />
      )}
      {currentScreen === 'physical-activity' && (
        <PhysicalActivity 
          onAddPoints={(amt) => {
            addPoints(amt);
            completeQuest('activity');
          }} 
        />
      )}
      {currentScreen === 'nutrition' && (
        <NutritionAssessment 
          onAddPoints={(amt) => {
            addPoints(amt);
            completeQuest('food');
          }} 
        />
      )}
      {currentScreen === 'goals' && <DailyGoals points={points} />}
      {currentScreen === 'badges' && (
        <BadgeCollection 
          badges={badges} 
        />
      )}
      {currentScreen === 'education' && <Education />}
      {currentScreen === 'faq' && <FAQ />}
      {currentScreen === 'notifications' && <Notifications />}
      {currentScreen === 'survey' && <Survey />}
      {currentScreen === 'emergency' && <Emergency />}
      {/* Daily Spin Reward Modal */}
      <Modal
        visible={showSpinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSpinModal(false)}
      >
        <View style={appStyles.modalOverlay}>
          <View style={appStyles.spinModalContent}>
            <TouchableOpacity 
              style={appStyles.closeButton} 
              onPress={() => setShowSpinModal(false)}
            >
              <X size={20} color="#64748B" />
            </TouchableOpacity>
            
            <View style={appStyles.rewardIconContainer}>
              <Sparkles size={48} color="#9333EA" />
              <View style={appStyles.rewardBadge}>
                <Zap size={24} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            </View>
            
            <Text style={appStyles.rewardTitle}>Tebrikler!</Text>
            <Text style={appStyles.rewardText}>Günlük şans çarkından</Text>
            <Text style={appStyles.rewardValue}>+{lastSpinReward} Puan</Text>
            <Text style={appStyles.rewardDesc}>kazandın. Yarın tekrar gelmeyi unutma!</Text>
            
            <TouchableOpacity 
              style={appStyles.claimButton}
              onPress={() => setShowSpinModal(false)}
            >
              <Text style={appStyles.claimButtonText}>Harika!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MobileLayout>
  );
}

const appStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  spinModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
  rewardIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FAF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  rewardBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#9333EA',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  rewardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  rewardValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#9333EA',
    marginVertical: 8,
  },
  rewardDesc: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  claimButton: {
    backgroundColor: '#9333EA',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
