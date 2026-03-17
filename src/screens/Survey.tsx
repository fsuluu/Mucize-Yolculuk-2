import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Star, Send, MessageSquare } from 'lucide-react';

export const Survey: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconBox}>
          <Send size={40} color="#22C55E" />
        </View>
        <View style={styles.successTextContainer}>
          <Text style={styles.successTitle}>Teşekkürler!</Text>
          <Text style={styles.successSubtitle}>Geri bildiriminiz başarıyla iletildi. Uygulamamızı geliştirmemize yardımcı olduğunuz için teşekkür ederiz.</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setSubmitted(false)}
          style={styles.newSurveyButton}
        >
          <Text style={styles.newSurveyButtonText}>Yeni Anket Doldur</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.bannerTitle}>Memnuniyet Anketi</Text>
        <Text style={styles.bannerSubtitle}>Uygulamamız hakkındaki düşünceleriniz bizim için çok değerli.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.ratingSection}>
          <Text style={styles.questionText}>Uygulamayı ne kadar faydalı buluyorsunuz?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Star 
                  size={32} 
                  color={rating >= star ? '#FACC15' : '#E2E8F0'} 
                  fill={rating >= star ? '#FACC15' : 'transparent'} 
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>
            {rating === 0 ? 'Puan Veriniz' : rating === 5 ? 'Mükemmel' : rating >= 3 ? 'İyi' : 'Geliştirilmeli'}
          </Text>
        </View>

        <View style={styles.commentSection}>
          <View style={styles.commentHeader}>
            <MessageSquare size={18} color="#1A5F7A" />
            <Text style={styles.commentTitle}>Önerileriniz ve Görüşleriniz</Text>
          </View>
          <TextInput 
            style={styles.textArea}
            placeholder="Düşüncelerinizi buraya yazabilirsiniz..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={comment}
            onChangeText={setComment}
          />
        </View>

        <TouchableOpacity 
          onPress={() => setSubmitted(true)}
          disabled={rating === 0}
          style={[styles.submitButton, rating === 0 && styles.disabledButton]}
        >
          <Send size={18} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>GÖNDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  successIconBox: {
    width: 80,
    height: 80,
    backgroundColor: '#F0FDF4',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTextContainer: {
    alignItems: 'center',
    gap: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  newSurveyButton: {
    backgroundColor: '#1A5F7A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  newSurveyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerBanner: {
    backgroundColor: '#6366F1', // indigo-500
    borderRadius: 24,
    padding: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    gap: 32,
  },
  ratingSection: {
    alignItems: 'center',
    gap: 16,
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  commentSection: {
    gap: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  textArea: {
    height: 120,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: '#1E293B',
  },
  submitButton: {
    height: 52,
    backgroundColor: '#1A5F7A',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
