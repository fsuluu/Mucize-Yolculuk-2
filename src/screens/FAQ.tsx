import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: 'Kan şekerim düşük çıkarsa ne yapmalıyım?',
      answer: 'Kan şekeriniz 70 mg/dL altındaysa hipoglisemi belirtileri görülebilir. 15-15 kuralını uygulayın: 15 gram hızlı emilen karbonhidrat (4-5 kesme şeker veya 150ml meyve suyu) alın, 15 dakika bekleyip tekrar ölçün.'
    },
    {
      id: 2,
      question: 'Hangi sıklıkla ölçüm yapmalıyım?',
      answer: 'Doktorunuz aksini belirtmedikçe genellikle günde 4 kez (açlık ve ana öğünlerden 1 veya 2 saat sonra) ölçüm yapılması önerilir.'
    },
    {
      id: 3,
      question: 'Egzersiz yaparken nelere dikkat etmeliyim?',
      answer: 'Egzersize başlamadan önce kan şekerinizi ölçün. Yanınızda mutlaka kesme şeker veya meyve suyu bulundurun. Yorulduğunuzda dinlenin ve bol su tüketin.'
    },
    {
      id: 4,
      question: 'Beslenmemde nelere dikkat etmeliyim?',
      answer: 'Glisemik indeksi düşük gıdalar tercih edin. Porsiyon kontrolü yapın ve öğün atlamayın. Lifli gıdalar, sebze ve tam tahılları beslenmenize ekleyin.'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <HelpCircle size={24} color="#A855F7" />
        </View>
        <Text style={styles.title}>Sıkça Sorulan Sorular</Text>
      </View>

      <View style={styles.list}>
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqCard}>
            <TouchableOpacity 
              onPress={() => setOpenId(openId === faq.id ? null : faq.id)}
              style={styles.faqHeader}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              {openId === faq.id ? (
                <ChevronUp size={18} color="#1A5F7A" />
              ) : (
                <ChevronDown size={18} color="#CBD5E1" />
              )}
            </TouchableOpacity>
            {openId === faq.id && (
              <View style={styles.faqBody}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FAF5FF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  list: {
    gap: 16,
    paddingBottom: 32,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  faqHeader: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    paddingRight: 16,
    lineHeight: 20,
  },
  faqBody: {
    padding: 24,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
  },
  answerText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    fontWeight: '500',
  },
});
