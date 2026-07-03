import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'dark' | 'light';

interface ThemeColors {
  bg: string;
  bgSecondary: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentText: string;
  green: string;
  orange: string;
  red: string;
  yellow: string;
  muted: string;
  inputBg: string;
  code: string;
}

const darkColors: ThemeColors = {
  bg: '#0f0f1a',
  bgSecondary: '#181825',
  card: '#181825',
  border: '#313244',
  text: '#cdd6f4',
  textSecondary: '#6c7086',
  accent: '#89b4fa',
  accentText: '#1e1e2e',
  green: '#4CAF50',
  orange: '#FF9800',
  red: '#F44336',
  yellow: '#f9e2af',
  muted: '#585b70',
  inputBg: '#11111b',
  code: '#a6e3a1',
};

const lightColors: ThemeColors = {
  bg: '#eff1f5',
  bgSecondary: '#e6e9ef',
  card: '#e6e9ef',
  border: '#ccd0da',
  text: '#4c4f69',
  textSecondary: '#7c7f93',
  accent: '#1e66f5',
  accentText: '#ffffff',
  green: '#40a02b',
  orange: '#df8e1d',
  red: '#d20f39',
  yellow: '#df8e1d',
  muted: '#9ca0b0',
  inputBg: '#ccd0da',
  code: '#40a02b',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: darkColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    AsyncStorage.getItem('theme').then(stored => {
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    });
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    AsyncStorage.setItem('theme', next);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
