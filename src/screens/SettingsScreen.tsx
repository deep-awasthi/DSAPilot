import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/deep-awasthi', icon: '</>' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/deep-awasthi', icon: 'in' },
  { name: 'Medium', url: 'https://deepawasthi.medium.com', icon: 'M' },
];

export default function SettingsScreen({ navigation }: any) {
  const { theme, colors, toggleTheme } = useTheme();

  const clearAllData = () => {
    Alert.alert('Clear All Data', 'This will reset all progress and saved snippets. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          try {
            const keys = await AsyncStorage.getAllKeys();
            for (const key of keys) await AsyncStorage.removeItem(key);
            Alert.alert('Done', 'All data cleared. Restart the app.');
          } catch (e) {
            Alert.alert('Error', 'Failed to clear data.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.backText, { color: colors.text }]}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      {/* Settings */}
      <View style={styles.content}>
        {/* Appearance */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>APPEARANCE</Text>
        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
              {theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
            </Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor={theme === 'dark' ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* About */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>ABOUT</Text>
        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>DSAPilot</Text>
            <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Connect */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>CONNECT</Text>
        {SOCIAL_LINKS.map((link, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => Linking.openURL(link.url)}
          >
            <View style={styles.socialIcon}>
              <Text style={[styles.socialIconText, { color: colors.accent }]}>{link.icon}</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>{link.name}</Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>{link.url.replace('https://', '')}</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textSecondary }]}>{'>'}</Text>
          </TouchableOpacity>
        ))}

        {/* Data */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>DATA</Text>
        <TouchableOpacity
          style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={clearAllData}
        >
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.red }]}>Clear All Data</Text>
            <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>Reset progress and saved snippets</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingTop: Platform.OS === 'ios' ? 4 : 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: { fontSize: 18, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { flex: 1, padding: 12 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600' },
  settingDesc: { fontSize: 12, marginTop: 2 },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#313244',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialIconText: { fontSize: 14, fontWeight: '800' },
  arrow: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
});
