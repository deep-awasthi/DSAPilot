import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import ProblemsScreen from './src/screens/ProblemsScreen';
import CodeEditorScreen from './src/screens/CodeEditorScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={splashStyles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={splashStyles.title}>DSAPilot</Text>
      <Text style={splashStyles.subtitle}>191 Problems. One Journey.</Text>
      <ActivityIndicator size="large" color="#89b4fa" style={spinner} />
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#cdd6f4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6c7086',
    marginBottom: 40,
  },
});
const spinner = { marginTop: 20 };

function AppNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Problems" component={ProblemsScreen} />
        <Stack.Screen name="CodeEditor" component={CodeEditorScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <SplashScreen />;
  return <AppNavigator />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
