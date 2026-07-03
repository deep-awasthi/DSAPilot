import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';

export default function WebViewScreen({ route, navigation }: any) {
  const { url, title } = route.params;
  const { theme, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.backText, { color: colors.text }]}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>{title || 'Browser'}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.closeBtn, { backgroundColor: colors.muted }]}>
          <Text style={[styles.closeText, { color: colors.text }]}>X</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>Failed to load page.</Text>
          <TouchableOpacity style={[styles.retryBtn, { backgroundColor: colors.accent }]} onPress={() => setError(false)}>
            <Text style={[styles.retryText, { color: colors.accentText }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: url }}
          onLoadStart={() => { setLoading(true); setError(false); }}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
          style={styles.webview}
          allowsInlineMediaPlayback
        />
      )}
      {loading && (
        <View style={[styles.loadingOverlay, { backgroundColor: colors.bg }]}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 },
  backBtn: { marginRight: 10, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 16, fontWeight: 'bold' },
  closeBtn: { marginLeft: 10, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  closeText: { fontSize: 14, fontWeight: 'bold' },
  headerTitle: { fontSize: 14, fontWeight: '600', flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, marginBottom: 16 },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontWeight: '700' },
});
