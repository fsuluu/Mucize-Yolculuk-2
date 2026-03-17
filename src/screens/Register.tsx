import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Phone } from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
  onRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onBack, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

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
        <Text style={styles.title}>Yeni Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Mucize Yolculuk ailesine katılın</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ad Soyad</Text>
            <View style={styles.inputWrapper}>
              <User style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput style={styles.input} placeholder="Adınız Soyadınız" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-Posta</Text>
            <View style={styles.inputWrapper}>
              <Mail style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput style={styles.input} placeholder="ornek@mail.com" keyboardType="email-address" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon</Text>
            <View style={styles.inputWrapper}>
              <Phone style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput style={styles.input} placeholder="05xx xxx xx xx" keyboardType="phone-pad" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput 
                style={styles.input} 
                secureTextEntry={!showPassword}
                placeholder="••••••••"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={onRegister}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>KAYIT OL</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Kayıt olarak <Text style={styles.footerLink}>Kullanım Koşulları</Text>'nı kabul etmiş sayılırsınız.
        </Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A5F7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
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
  form: {
    gap: 16,
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
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  actions: {
    marginTop: 8,
  },
  registerButton: {
    backgroundColor: '#1A5F7A',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 18,
  },
  footerLink: {
    color: '#1A5F7A',
    textDecorationLine: 'underline',
  },
});
