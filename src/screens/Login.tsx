import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { User, Lock, Eye, EyeOff, Activity } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onNavigateRegister: () => void;
  onNavigateForgot: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigateRegister, onNavigateForgot }) => {
  const [username, setUsername] = useState('mobil');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Activity size={48} color="#FFFFFF" strokeWidth={2.5} />
        </View>
        <Text style={styles.logoText}>
          Mucize<Text style={styles.logoTextHighlight}>Yolculuk</Text>
        </Text>
        <Text style={styles.tagline}>Gebelik Takibi & Sağlık</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.subtitle}>Devam etmek için bilgilerinizi girin</Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <View style={styles.inputWrapper}>
              <User style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput 
                style={styles.input} 
                value={username}
                onChangeText={setUsername}
                placeholder="Kullanıcı adınız"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Şifre</Text>
              <TouchableOpacity onPress={onNavigateForgot}>
                <Text style={styles.forgotText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} size={18} color="#64748B" />
              <TextInput 
                style={styles.input} 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholder="Şifreniz"
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
            onPress={onLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
          </TouchableOpacity>
          
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Hesabınız yok mu? </Text>
            <TouchableOpacity onPress={onNavigateRegister}>
              <Text style={styles.registerLink}>Hemen Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 96,
    height: 96,
    backgroundColor: '#1A5F7A', // medical-primary
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    transform: [{ rotate: '3deg' }],
  },
  logoText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1A5F7A',
    letterSpacing: -0.5,
  },
  logoTextHighlight: {
    color: '#159895', // medical-secondary
  },
  tagline: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 4,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  forgotText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A5F7A',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    height: 56,
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
    marginTop: 24,
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#1A5F7A',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5F7A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  registerLink: {
    fontSize: 12,
    color: '#1A5F7A',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
