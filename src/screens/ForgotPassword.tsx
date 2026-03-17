import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Mail, ArrowLeft, Send } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onBack}
        style={styles.backButton}
      >
        <ArrowLeft size={18} color="#1A5F7A" />
        <Text style={styles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Şifremi Unuttum</Text>
        <Text style={styles.subtitle}>E-posta adresinize bir sıfırlama bağlantısı göndereceğiz</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-Posta Adresi</Text>
          <View style={styles.inputWrapper}>
            <Mail style={styles.inputIcon} size={18} color="#64748B" />
            <TextInput 
              style={styles.input} 
              placeholder="ornek@mail.com" 
              keyboardType="email-address"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.sendButton}>
          <Send size={18} color="#FFFFFF" />
          <Text style={styles.sendButtonText}>SIFIRLAMA BAĞLANTISI GÖNDER</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Not: Eğer e-posta kutunuzda mesajı göremezseniz lütfen "Gereksiz/Spam" klasörünü kontrol ediniz.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  backButtonText: {
    color: '#1A5F7A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A5F7A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    gap: 20,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 14,
    color: '#1E293B',
  },
  sendButton: {
    backgroundColor: '#1A5F7A',
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  infoBox: {
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoText: {
    fontSize: 12,
    color: '#1D4ED8',
    lineHeight: 18,
    fontWeight: '500',
  },
});
