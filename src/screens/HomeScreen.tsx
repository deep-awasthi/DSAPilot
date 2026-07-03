import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories, difficultyColors, getDifficultyCount, getTotalStats } from '../data/problems';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }: any) {
  const { theme, colors } = useTheme();
  const [completedMap, setCompletedMap] = useState<Record<number, Record<number, boolean>>>({});
  const stats = getTotalStats();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadAllProgress);
    return unsubscribe;
  }, []);

  const loadAllProgress = async () => {
    try {
      const map: Record<number, Record<number, boolean>> = {};
      for (const cat of categories) {
        const data = await AsyncStorage.getItem(`completed_${cat.id}`);
        if (data) map[cat.id] = JSON.parse(data);
      }
      setCompletedMap(map);
    } catch (e) {}
  };

  const getCompletedCount = (catId: number) => {
    const map = completedMap[catId];
    if (!map) return 0;
    return Object.values(map).filter(Boolean).length;
  };

  const totalCompleted = Object.values(completedMap).reduce(
    (sum, map) => sum + Object.values(map).filter(Boolean).length, 0
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>DSAPilot</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{stats.total} Problems</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.ideBtn, { backgroundColor: colors.green }]}
            onPress={() => navigation.navigate('CodeEditor', { problemTitle: 'Quick Test', difficulty: '', problemId: -1 })}
          >
            <Text style={styles.ideBtnText}>Java IDE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingsBtn, { backgroundColor: colors.border }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={[styles.settingsIcon, { color: colors.text }]}>⚙</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Overall Progress */}
      <BlurView intensity={40} tint={theme === 'dark' ? 'dark' : 'light'} style={[styles.progressCard, { borderColor: colors.border }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>Overall Progress</Text>
          <Text style={[styles.progressPct, { color: colors.accent }]}>
            {stats.total > 0 ? Math.round((totalCompleted / stats.total) * 100) : 0}%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { width: `${(totalCompleted / stats.total) * 100}%`, backgroundColor: colors.accent }]} />
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: difficultyColors.Easy }]}>{totalCompleted}/{stats.easy}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Easy</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: difficultyColors.Medium }]}>{totalCompleted}/{stats.medium}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Medium</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: difficultyColors.Hard }]}>{totalCompleted}/{stats.hard}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Hard</Text>
          </View>
        </View>
      </BlurView>

      {/* Categories */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const completed = getCompletedCount(item.id);
          const total = item.problems.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <TouchableOpacity
              style={[styles.categoryCard, { borderColor: colors.border }]}
              onPress={() => navigation.navigate('Problems', { categoryId: item.id, categoryName: item.name })}
            >
              <BlurView intensity={20} tint={theme === 'dark' ? 'dark' : 'light'} style={styles.categoryBlur}>
                <View style={styles.catLeft}>
                  <View style={[styles.catIndex, { backgroundColor: colors.border }]}>
                    <Text style={[styles.catIndexText, { color: colors.accent }]}>{index + 1}</Text>
                  </View>
                  <View style={styles.catInfo}>
                    <Text style={[styles.catName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.catCount, { color: colors.textSecondary }]}>
                    {completed}/{total} problems
                  </Text>
                </View>
              </View>
              <View style={styles.catRight}>
                <Text style={[styles.catPct, { color: pct === 100 ? colors.green : colors.accent }]}>
                  {pct}%
                </Text>
                <View style={[styles.miniBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.miniFill, { width: `${pct}%`, backgroundColor: colors.accent }]} />
                </View>
              </View>
              </BlurView>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {},
  headerTitle: { fontSize: 24, fontWeight: '800' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ideBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ideBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: { fontSize: 20 },
  progressCard: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: { fontSize: 16, fontWeight: '700' },
  progressPct: { fontSize: 20, fontWeight: '800' },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', borderRadius: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 14, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
  list: { padding: 12, paddingBottom: 30 },
  categoryCard: {
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  categoryBlur: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  catLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  catIndex: {
    width: 32, height: 32, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  catIndexText: { fontSize: 13, fontWeight: '700' },
  catInfo: { flex: 1 },
  catName: { fontSize: 14, fontWeight: '600' },
  catCount: { fontSize: 12, marginTop: 2 },
  catRight: { alignItems: 'flex-end', marginLeft: 12 },
  catPct: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  miniBar: { width: 60, height: 4, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: '100%', borderRadius: 2 },
});
