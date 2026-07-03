import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories, difficultyColors, getDifficultyCount } from '../data/problems';
import { useTheme } from '../context/ThemeContext';

export default function ProblemsScreen({ route, navigation }: any) {
  const { categoryId, categoryName } = route.params;
  const { theme, colors } = useTheme();
  const category = categories.find(c => c.id === categoryId)!;
  const counts = getDifficultyCount(category);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [hasNotes, setHasNotes] = useState<Record<number, boolean>>({});

  // Notes modal state
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [activeNotesProblem, setActiveNotesProblem] = useState<{ id: number; title: string } | null>(null);
  const [notesText, setNotesText] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const notesDebounceRef = React.useRef<any>(null);

  // Timer state
  const [showTimer, setShowTimer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = React.useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProgress();
      loadNotesStatus();
      storeCategoryMapping();
    });
    return () => {
      unsubscribe();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const storeCategoryMapping = async () => {
    try {
      for (const p of category.problems) {
        await AsyncStorage.setItem(`problem_category_${p.id}`, String(categoryId));
      }
    } catch (e) {}
  };

  const loadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem(`completed_${categoryId}`);
      if (data) setCompleted(JSON.parse(data));
    } catch (e) {}
  };

  const loadNotesStatus = async () => {
    try {
      const map: Record<number, boolean> = {};
      for (const p of category.problems) {
        const notes = await AsyncStorage.getItem(`notes_${p.id}`);
        if (notes && notes.length > 0) map[p.id] = true;
      }
      setHasNotes(map);
    } catch (e) {}
  };

  const toggleComplete = async (problemId: number) => {
    const updated = { ...completed, [problemId]: !completed[problemId] };
    setCompleted(updated);
    try {
      await AsyncStorage.setItem(`completed_${categoryId}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const openNotes = async (problemId: number, title: string) => {
    setActiveNotesProblem({ id: problemId, title });
    setNotesSaved(false);
    try {
      const saved = await AsyncStorage.getItem(`notes_${problemId}`);
      setNotesText(saved || '');
    } catch (e) {
      setNotesText('');
    }
    setNotesModalVisible(true);
  };

  const handleNotesChange = useCallback((text: string) => {
    setNotesText(text);
    setNotesSaved(false);
    if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    notesDebounceRef.current = setTimeout(() => saveNotes(text), 1500);
  }, [activeNotesProblem]);

  const saveNotes = async (text: string) => {
    if (!activeNotesProblem) return;
    try {
      await AsyncStorage.setItem(`notes_${activeNotesProblem.id}`, text);
      setNotesSaved(true);
      setHasNotes(prev => ({ ...prev, [activeNotesProblem.id]: text.length > 0 }));
    } catch (e) {}
  };

  const startTimer = () => {
    setTimerRunning(true);
    timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    pauseTimer();
    setElapsed(0);
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.backText, { color: colors.text }]}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{categoryName}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {completedCount}/{category.problems.length} completed
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.timerToggle, { backgroundColor: showTimer ? colors.accent : colors.border }]}
          onPress={() => setShowTimer(!showTimer)}
        >
          <Text style={[styles.timerToggleText, { color: showTimer ? colors.accentText : colors.accent }]}>Timer</Text>
        </TouchableOpacity>
      </View>

      {/* Timer bar */}
      {showTimer && (
        <View style={[styles.timerBar, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <Text style={[styles.timerDisplay, { color: timerRunning ? colors.green : colors.text }]}>{formatTime(elapsed)}</Text>
          <View style={styles.timerActions}>
            <TouchableOpacity
              style={[styles.timerBtn, { backgroundColor: timerRunning ? colors.orange : colors.green }]}
              onPress={timerRunning ? pauseTimer : startTimer}
            >
              <Text style={styles.timerBtnText}>{timerRunning ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timerBtn, { backgroundColor: colors.border }]} onPress={resetTimer}>
              <Text style={[styles.timerBtnText, { color: colors.text }]}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Progress bar */}
      <View style={[styles.progressContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { width: `${(completedCount / category.problems.length) * 100}%`, backgroundColor: colors.accent }]} />
        </View>
        <View style={styles.difficultyRow}>
          <View style={[styles.diffTag, { backgroundColor: '#4CAF5020' }]}>
            <Text style={[styles.diffText, { color: difficultyColors.Easy }]}>E {counts.Easy}</Text>
          </View>
          <View style={[styles.diffTag, { backgroundColor: '#FF980020' }]}>
            <Text style={[styles.diffText, { color: difficultyColors.Medium }]}>M {counts.Medium}</Text>
          </View>
          <View style={[styles.diffTag, { backgroundColor: '#F4433620' }]}>
            <Text style={[styles.diffText, { color: difficultyColors.Hard }]}>H {counts.Hard}</Text>
          </View>
        </View>
      </View>

      {/* Problems */}
      <FlatList
        data={category.problems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={[styles.problemCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.checkBtn} onPress={() => toggleComplete(item.id)}>
              <View style={[styles.checkbox, { borderColor: colors.muted }, completed[item.id] && { backgroundColor: colors.green, borderColor: colors.green }]}>
                {completed[item.id] && <Text style={[styles.checkmark, { color: colors.bg }]}>✓</Text>}
              </View>
            </TouchableOpacity>

            <View style={styles.problemInfo}>
              <TouchableOpacity style={styles.problemTitleRow} onPress={() => navigation.navigate('WebView', { url: item.url, title: item.title })}>
                <Text style={[styles.problemNumber, { color: colors.muted }]}>{index + 1}.</Text>
                <Text
                  style={[styles.problemTitle, { color: colors.text }, completed[item.id] && { textDecorationLine: 'line-through', color: colors.textSecondary }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                {hasNotes[item.id] && <Text style={[styles.notesIcon, { color: colors.yellow }]}>📝</Text>}
              </TouchableOpacity>
              <View style={styles.problemActions}>
                <View style={[styles.diffBadge, { backgroundColor: difficultyColors[item.difficulty] }]}>
                  <Text style={styles.diffBadgeText}>{item.difficulty}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: colors.border }]}
                  onPress={() => navigation.navigate('CodeEditor', { problemTitle: item.title, difficulty: item.difficulty, problemId: item.id })}
                >
                  <Text style={[styles.actionText, { color: colors.green }]}>Code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: colors.border }]}
                  onPress={() => navigation.navigate('WebView', { url: item.url, title: 'Problem Link' })}
                >
                  <Text style={[styles.actionText, { color: colors.accent }]}>Solve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: hasNotes[item.id] ? colors.yellow + '30' : colors.border }]}
                  onPress={() => openNotes(item.id, item.title)}
                >
                  <Text style={[styles.actionText, { color: colors.yellow }]}>Notes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Notes Modal */}
      <Modal visible={notesModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.bgSecondary }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]} numberOfLines={1}>
                Notes — {activeNotesProblem?.title}
              </Text>
              <View style={styles.modalHeaderRight}>
                {notesSaved && <Text style={[styles.savedBadge, { color: colors.green }]}>Saved</Text>}
                <TouchableOpacity onPress={() => setNotesModalVisible(false)}>
                  <Text style={[styles.modalClose, { color: colors.textSecondary }]}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={[styles.notesInput, { backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }]}
              value={notesText}
              onChangeText={handleNotesChange}
              placeholder="Approach, edge cases, time complexity..."
              placeholderTextColor={colors.muted}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    marginRight: 12, width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  backText: { fontSize: 18, fontWeight: 'bold' },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  progressContainer: { padding: 12, borderBottomWidth: 1 },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 3 },
  difficultyRow: { flexDirection: 'row', gap: 8 },
  diffTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4 },
  diffText: { fontSize: 12, fontWeight: '700' },
  list: { padding: 10, paddingBottom: 30 },
  problemCard: {
    flexDirection: 'row', borderRadius: 10, padding: 12,
    marginBottom: 8, borderWidth: 1,
  },
  checkBtn: { marginRight: 10, justifyContent: 'center' },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 2,
    justifyContent: 'center', alignItems: 'center',
  },
  checkmark: { fontSize: 14, fontWeight: 'bold' },
  problemInfo: { flex: 1 },
  problemTitleRow: { flexDirection: 'row', marginBottom: 8 },
  problemNumber: { fontSize: 13, fontWeight: '600', marginRight: 6 },
  problemTitle: { fontSize: 14, fontWeight: '500', flex: 1 },
  notesIcon: { fontSize: 14, marginLeft: 4 },
  problemActions: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  diffBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  actionBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  actionText: { fontSize: 11, fontWeight: '600' },

  timerToggle: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginLeft: 8 },
  timerToggleText: { fontSize: 12, fontWeight: '700' },
  timerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1,
  },
  timerDisplay: { fontSize: 24, fontWeight: '800', fontVariant: ['tabular-nums'] },
  timerActions: { flexDirection: 'row', gap: 8 },
  timerBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  timerBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Notes modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: {
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    maxHeight: '80%', paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 12 },
  modalHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  savedBadge: { fontSize: 12, fontWeight: '600' },
  modalClose: { fontSize: 16, fontWeight: '700' },
  notesInput: {
    margin: 12, padding: 12, borderRadius: 8, borderWidth: 1,
    fontSize: 14, lineHeight: 20, minHeight: 200, maxHeight: 400,
  },
});
