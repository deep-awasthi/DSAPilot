import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import CodeMirrorEditor from '../components/CodeMirrorEditor';

const DEFAULT_CODE = `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your input: ");
        String input = sc.nextLine();

        // Your solution here
        System.out.println("Output: " + input);

        sc.close();
    }
}`;

const COMPILE_API = 'https://ce.judge0.com/submissions?wait=true';
const JAVA_LANG_ID = 62;

interface SavedSnippet {
  id: string;
  name: string;
  code: string;
  savedAt: string;
}

export default function CodeEditorScreen({ route, navigation }: any) {
  const { problemTitle, difficulty, problemId } = route.params;
  const { theme, colors } = useTheme();
  const problemKey = `code_${problemId || problemTitle}`;
  const notesKey = `notes_${problemId || problemTitle}`;

  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [snippets, setSnippets] = useState<SavedSnippet[]>([]);
  const [showSnippets, setShowSnippets] = useState(false);
  const [snippetName, setSnippetName] = useState('');
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [testCases, setTestCases] = useState<{ input: string; expected: string }[]>([{ input: '', expected: '' }]);
  const [activeTest, setActiveTest] = useState(0);
  const [outputHistory, setOutputHistory] = useState<{ time: string; input: string; output: string; passed?: boolean }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const timerRef = useRef<any>(null);
  const debounceRef = useRef<any>(null);
  const notesDebounceRef = useRef<any>(null);

  const TEMPLATES = [
    { name: 'Scanner Input', code: 'Scanner sc = new Scanner(System.in);\nString input = sc.nextLine();\nSystem.out.println(input);\nsc.close();' },
    { name: 'ArrayList', code: 'ArrayList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nSystem.out.println(list);' },
    { name: 'HashMap', code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("key", 1);\nSystem.out.println(map.get("key"));' },
    { name: 'BFS Template', code: 'Queue<Integer> queue = new LinkedList<>();\nboolean[] visited = new boolean[n];\nqueue.add(0);\nvisited[0] = true;\nwhile (!queue.isEmpty()) {\n    int node = queue.poll();\n    for (int neighbor : adj.get(node)) {\n        if (!visited[neighbor]) {\n            visited[neighbor] = true;\n            queue.add(neighbor);\n        }\n    }\n}' },
    { name: 'DFS Template', code: 'void dfs(int node, boolean[] visited, List<List<Integer>> adj) {\n    visited[node] = true;\n    for (int neighbor : adj.get(node)) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, visited, adj);\n        }\n    }\n}' },
    { name: 'Binary Search', code: 'int binarySearch(int[] arr, int target) {\n    int left = 0, right = arr.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}' },
    { name: 'Priority Queue', code: 'PriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(3);\npq.add(1);\npq.add(2);\nwhile (!pq.isEmpty()) System.out.println(pq.poll());' },
  ];

  useEffect(() => {
    loadSavedCode();
    loadSnippets();
    loadNotes();
    loadSolvedStatus();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const loadSavedCode = async () => {
    try {
      const saved = await AsyncStorage.getItem(problemKey);
      if (saved) { setCode(saved); setIsSaved(true); }
      const ts = await AsyncStorage.getItem(`${problemKey}_timestamp`);
      if (ts) setLastSaved(ts);
    } catch (e) {}
  };

  const loadSnippets = async () => {
    try {
      const data = await AsyncStorage.getItem('snippets');
      if (data) setSnippets(JSON.parse(data));
    } catch (e) {}
  };

  const loadNotes = async () => {
    try {
      const saved = await AsyncStorage.getItem(notesKey);
      if (saved) { setNotes(saved); setNotesSaved(true); }
    } catch (e) {}
  };

  const loadSolvedStatus = async () => {
    try {
      const categoryId = await AsyncStorage.getItem(`problem_category_${problemId}`);
      if (categoryId) {
        const data = await AsyncStorage.getItem(`completed_${categoryId}`);
        if (data) {
          const map = JSON.parse(data);
          setIsSolved(!!map[problemId]);
        }
      }
    } catch (e) {}
  };

  const toggleSolved = async () => {
    const newState = !isSolved;
    setIsSolved(newState);
    try {
      const categoryId = await AsyncStorage.getItem(`problem_category_${problemId}`);
      if (categoryId) {
        const data = await AsyncStorage.getItem(`completed_${categoryId}`);
        const map = data ? JSON.parse(data) : {};
        map[problemId] = newState;
        await AsyncStorage.setItem(`completed_${categoryId}`, JSON.stringify(map));
      }
    } catch (e) {}
  };

  const handleNotesChange = useCallback((text: string) => {
    setNotes(text);
    setNotesSaved(false);
    if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    notesDebounceRef.current = setTimeout(() => saveNotes(text), 1500);
  }, []);

  const saveNotes = async (text: string) => {
    try {
      await AsyncStorage.setItem(notesKey, text);
      setNotesSaved(true);
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

  const handleCodeChange = useCallback((text: string) => {
    setCode(text);
    setIsSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => autoSave(text), 1500);
  }, []);

  const autoSave = async (codeToSave: string) => {
    try {
      const now = new Date().toLocaleString();
      await AsyncStorage.setItem(problemKey, codeToSave);
      await AsyncStorage.setItem(`${problemKey}_timestamp`, now);
      setIsSaved(true);
      setLastSaved(now);
    } catch (e) {}
  };

  const saveAsSnippet = async () => {
    if (!snippetName.trim()) return;
    const newSnippet: SavedSnippet = {
      id: `${Date.now()}`,
      name: snippetName.trim(),
      code,
      savedAt: new Date().toLocaleString(),
    };
    const updated = [newSnippet, ...snippets];
    setSnippets(updated);
    await AsyncStorage.setItem('snippets', JSON.stringify(updated));
    setShowSavePrompt(false);
    setSnippetName('');
  };

  const loadSnippet = (snippet: SavedSnippet) => {
    Alert.alert('Load Snippet', `Replace current code with "${snippet.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Load', onPress: () => { setCode(snippet.code); setShowSnippets(false); autoSave(snippet.code); } },
    ]);
  };

  const deleteSnippet = (id: string) => {
    Alert.alert('Delete Snippet', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        const updated = snippets.filter(s => s.id !== id);
        setSnippets(updated);
        await AsyncStorage.setItem('snippets', JSON.stringify(updated));
      }},
    ]);
  };

  const resetCode = () => {
    Alert.alert('Reset Code', 'Reset to default template?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { setCode(DEFAULT_CODE); autoSave(DEFAULT_CODE); } },
    ]);
  };

  const runCode = async (testInput?: string) => {
    setIsRunning(true);
    setOutput('Running...');
    const stdinToUse = testInput !== undefined ? testInput : input;
    try {
      const response = await fetch(COMPILE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_code: code, language_id: JAVA_LANG_ID, stdin: stdinToUse }),
      });
      const data = await response.json();
      if (data.stdout || data.stderr || data.compile_output) {
        let out = '';
        if (data.stdout) out += data.stdout;
        if (data.stderr) out += '\n[ERROR]\n' + data.stderr;
        if (data.compile_output && !data.stdout && !data.stderr) out += '[COMPILE]\n' + data.compile_output;
        const result = out.trim() || '(no output)';
        setOutput(result);
        const passed = !data.stderr && data.status?.description !== 'Compilation Error';
        const entry = { time: new Date().toLocaleTimeString(), input: stdinToUse, output: result, passed };
        setOutputHistory(prev => [entry, ...prev].slice(0, 20));
      } else if (data.message) {
        setOutput('API Error: ' + data.message);
      } else {
        setOutput('Compilation failed. Check your code syntax.');
      }
    } catch (e) { setOutput('Network error: ' + String(e)); }
    finally { setIsRunning(false); }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    let results = 'Running all test cases...\n\n';
    let allPassed = true;
    const currentTests = testCases.filter(tc => tc.input || tc.expected);
    if (currentTests.length === 0) {
      setOutput('No test cases to run. Add input and expected output first.');
      setIsRunning(false);
      return;
    }
    for (let i = 0; i < currentTests.length; i++) {
      const tc = currentTests[i];
      try {
        const response = await fetch(COMPILE_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source_code: code, language_id: JAVA_LANG_ID, stdin: tc.input }),
        });
        const data = await response.json();
        const out = (data.stdout || '').trim();
        const err = data.stderr || '';
        const passed = tc.expected ? out === tc.expected : !err;
        if (!passed) allPassed = false;
        results += `Test ${i + 1}: ${passed ? 'PASS ✓' : 'FAIL ✗'}\n  Input: ${tc.input || '(none)'}\n  Expected: ${tc.expected || '(none)'}\n  Got: ${out || err || '(empty)'}\n\n`;
      } catch {
        results += `Test ${i + 1}: ERROR (network)\n\n`;
        allPassed = false;
      }
    }
    results += allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED';
    setOutput(results);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.backText, { color: colors.text }]}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={[styles.headerTitleText, { color: colors.text }]} numberOfLines={1}>{problemTitle}</Text>
          <Text style={[styles.diffBadge, { backgroundColor: difficulty === 'Easy' ? '#4CAF50' : difficulty === 'Medium' ? '#FF9800' : '#F44336' }]}>
            {difficulty}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleSolved} style={[styles.solvedBtn, { backgroundColor: isSolved ? colors.green : colors.border }]}>
          <Text style={[styles.solvedBtnText, { color: isSolved ? '#fff' : colors.green }]}>{isSolved ? '✓ Solved' : 'Mark Solved'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSnippets(true)} style={[styles.snippetsBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.snippetsBtnText, { color: colors.yellow }]}>Snippets</Text>
        </TouchableOpacity>
      </View>

      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
        <View style={styles.toolbarLeft}>
          <Text style={[styles.langBadge, { color: colors.green, backgroundColor: colors.green + '18' }]}>Java</Text>
          {lastSaved && <Text style={[styles.savedText, { color: colors.textSecondary }]}>{isSaved ? `Saved ${lastSaved}` : 'Editing...'}</Text>}
        </View>
        <View style={styles.toolbarRight}>
          <TouchableOpacity onPress={() => { setShowTemplates(!showTemplates); setShowNotes(false); setShowInput(false); }} style={[styles.toolBtn, { backgroundColor: showTemplates ? colors.yellow : colors.border }]}>
            <Text style={[styles.toolBtnText, { color: showTemplates ? '#000' : colors.yellow }]}>Templates</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowInput(!showInput); setShowNotes(false); setShowTemplates(false); }} style={[styles.toolBtn, { backgroundColor: showInput ? colors.accent : colors.border }]}>
            <Text style={[styles.toolBtnText, { color: showInput ? colors.accentText : colors.accent }]}>Input</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowNotes(!showNotes); setShowInput(false); setShowTemplates(false); }} style={[styles.toolBtn, { backgroundColor: showNotes ? colors.accent : colors.border }]}>
            <Text style={[styles.toolBtnText, { color: showNotes ? colors.accentText : colors.accent }]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimer(!showTimer)} style={[styles.toolBtn, { backgroundColor: showTimer ? colors.accent : colors.border }]}>
            <Text style={[styles.toolBtnText, { color: showTimer ? colors.accentText : colors.accent }]}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowHistory(!showHistory)} style={[styles.toolBtn, { backgroundColor: showHistory ? colors.green : colors.border }]}>
            <Text style={[styles.toolBtnText, { color: showHistory ? '#fff' : colors.green }]}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input panel */}
      {showInput && (
        <View style={[styles.inputContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: colors.accent }]}>Standard Input:</Text>
            <View style={styles.inputActions}>
              <TouchableOpacity onPress={() => setShowSavePrompt(true)} style={[styles.smallBtn, { backgroundColor: colors.border }]}>
                <Text style={[styles.smallBtnText, { color: colors.accent }]}>Save As</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetCode} style={[styles.smallBtn, { backgroundColor: colors.border }]}>
                <Text style={[styles.smallBtnText, { color: colors.orange }]}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={[styles.inputField, { backgroundColor: colors.inputBg, color: colors.code, borderColor: colors.border }]}
            value={input} onChangeText={setInput}
            placeholder="Enter test input..." placeholderTextColor={colors.muted} multiline
          />
        </View>
      )}

      {/* Templates panel */}
      {showTemplates && (
        <View style={[styles.templatesContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <Text style={[styles.inputLabel, { color: colors.yellow }]}>Code Templates:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesScroll}>
            {TEMPLATES.map((t, i) => (
              <TouchableOpacity key={i} style={[styles.templateBtn, { backgroundColor: colors.border }]} onPress={() => {
                const newCode = code.substring(0, code.lastIndexOf('}')) + '\n' + t.code + '\n}';
                setCode(newCode);
                setShowTemplates(false);
              }}>
                <Text style={[styles.templateBtnText, { color: colors.yellow }]}>{t.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Test Cases panel */}
      {showInput && (
        <View style={[styles.testCasesContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <View style={styles.testCasesHeader}>
            <Text style={[styles.inputLabel, { color: colors.green }]}>Test Cases:</Text>
            <TouchableOpacity onPress={runAllTests} style={[styles.runAllBtn, { backgroundColor: colors.green }]}>
              <Text style={styles.runAllBtnText}>Run All</Text>
            </TouchableOpacity>
          </View>
          {testCases.map((tc, i) => (
            <View key={i} style={[styles.testCaseRow, { borderColor: colors.border }]}>
              <TextInput
                style={[styles.testInput, { backgroundColor: colors.inputBg, color: colors.code, borderColor: colors.border }]}
                value={tc.input}
                placeholder={`Input ${i + 1}`}
                placeholderTextColor={colors.muted}
                onChangeText={(text) => {
                  const updated = testCases.map((item, idx) => idx === i ? { ...item, input: text } : item);
                  setTestCases(updated);
                }}
              />
              <TextInput
                style={[styles.testInput, { backgroundColor: colors.inputBg, color: colors.code, borderColor: colors.border }]}
                value={tc.expected}
                placeholder="Expected"
                placeholderTextColor={colors.muted}
                onChangeText={(text) => {
                  const updated = testCases.map((item, idx) => idx === i ? { ...item, expected: text } : item);
                  setTestCases(updated);
                }}
              />
              <TouchableOpacity onPress={() => runCode(tc.input)} style={[styles.runTestBtn, { backgroundColor: colors.accent }]}>
                <Text style={styles.runTestBtnText}>Run</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => setTestCases(prev => [...prev, { input: '', expected: '' }])} style={[styles.addTestBtn, { borderColor: colors.border }]}>
            <Text style={[styles.addTestBtnText, { color: colors.accent }]}>+ Add Test Case</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notes panel */}
      {showNotes && (
        <View style={[styles.notesContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <View style={styles.notesHeader}>
            <Text style={[styles.inputLabel, { color: colors.yellow }]}>Notes:</Text>
            {notesSaved && <Text style={[styles.notesSaved, { color: colors.green }]}>Saved</Text>}
          </View>
          <TextInput
            style={[styles.notesInput, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
            value={notes} onChangeText={handleNotesChange}
            placeholder="Jot down approaches, edge cases, time complexity..."
            placeholderTextColor={colors.muted} multiline textAlignVertical="top"
          />
        </View>
      )}

      {/* Timer panel */}
      {showTimer && (
        <View style={[styles.timerContainer, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
          <Text style={[styles.timerLabel, { color: colors.yellow }]}>Elapsed</Text>
          <Text style={[styles.timerDisplay, { color: timerRunning ? colors.green : colors.text }]}>{formatTime(elapsed)}</Text>
          <View style={styles.timerActions}>
            <TouchableOpacity
              style={[styles.timerBtn, { backgroundColor: timerRunning ? colors.orange : colors.green }]}
              onPress={timerRunning ? pauseTimer : startTimer}
            >
              <Text style={[styles.timerBtnText, { color: '#fff' }]}>{timerRunning ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timerBtn, { backgroundColor: colors.border }]} onPress={resetTimer}>
              <Text style={[styles.timerBtnText, { color: colors.text }]}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Code editor */}
      <View style={[styles.editorContainer, { backgroundColor: theme === 'dark' ? '#1e1e2e' : '#fafafa', maxHeight: 280 }]}>
        <CodeMirrorEditor code={code} onChange={handleCodeChange} theme={theme} />
      </View>

      {/* Run Button */}
      <TouchableOpacity
        style={[styles.runBtn, { backgroundColor: colors.accent }, isRunning && { opacity: 0.6 }]}
        onPress={() => runCode()} disabled={isRunning}
      >
        {isRunning ? <ActivityIndicator color="#fff" /> : <Text style={[styles.runBtnText, { color: colors.accentText }]}>Run Code</Text>}
      </TouchableOpacity>

      {/* History panel */}
      {showHistory && (
        <View style={[styles.historyContainer, { backgroundColor: colors.bgSecondary, borderTopColor: colors.border }]}>
          <Text style={[styles.inputLabel, { color: colors.green, paddingHorizontal: 10, paddingTop: 8 }]}>Output History:</Text>
          <ScrollView style={styles.historyScroll}>
            {outputHistory.length === 0 ? (
              <Text style={[styles.historyEmpty, { color: colors.muted }]}>No runs yet</Text>
            ) : outputHistory.map((h, i) => (
              <View key={i} style={[styles.historyItem, { borderBottomColor: colors.border }]}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyTime, { color: colors.textSecondary }]}>{h.time}</Text>
                  <Text style={[styles.historyStatus, { color: h.passed ? colors.green : colors.red }]}>{h.passed ? 'PASS' : 'FAIL'}</Text>
                </View>
                {h.input ? <Text style={[styles.historyInput, { color: colors.muted }]}>In: {h.input.substring(0, 50)}</Text> : null}
                <Text style={[styles.historyOutput, { color: colors.text }]} numberOfLines={2}>{h.output.substring(0, 80)}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Output */}
      <View style={[styles.outputContainer, { backgroundColor: '#111827', borderTopColor: colors.border }]}>
        <Text style={[styles.outputLabel, { color: colors.green }]}>Output:</Text>
        <ScrollView style={styles.outputScroll}>
          <Text style={[styles.outputText, { color: output.includes('ERROR') ? '#f87171' : colors.text }]}>{output || 'Run your code to see output...'}</Text>
        </ScrollView>
      </View>

      {/* Snippets Modal */}
      <Modal visible={showSnippets} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.bgSecondary }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Saved Snippets</Text>
              <TouchableOpacity onPress={() => setShowSnippets(false)}>
                <Text style={[styles.modalClose, { color: colors.textSecondary }]}>X</Text>
              </TouchableOpacity>
            </View>
            {snippets.length === 0 ? (
              <View style={styles.emptySnippets}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No snippets saved yet.</Text>
                <Text style={[styles.emptyHint, { color: colors.muted }]}>Use "Save As" to save code snippets for problems.</Text>
              </View>
            ) : (
              <FlatList
                data={snippets} keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={[styles.snippetCard, { backgroundColor: colors.bg, borderColor: colors.border }]} onPress={() => loadSnippet(item)}>
                    <View style={styles.snippetInfo}>
                      <Text style={[styles.snippetName, { color: colors.text }]}>{item.name}</Text>
                      <Text style={[styles.snippetDate, { color: colors.textSecondary }]}>{item.savedAt}</Text>
                      <Text style={[styles.snippetPreview, { color: colors.muted }]} numberOfLines={2}>{item.code.substring(0, 100)}...</Text>
                    </View>
                    <TouchableOpacity style={[styles.snippetDelete, { backgroundColor: colors.muted }]} onPress={() => deleteSnippet(item.id)}>
                      <Text style={[styles.snippetDeleteText, { color: colors.red }]}>X</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Save Prompt Modal */}
      <Modal visible={showSavePrompt} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.saveModal, { backgroundColor: colors.bgSecondary }]}>
            <Text style={[styles.saveModalTitle, { color: colors.text }]}>Save Snippet</Text>
            <TextInput
              style={[styles.saveInput, { backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }]}
              value={snippetName} onChangeText={setSnippetName}
              placeholder="Enter snippet name..." placeholderTextColor={colors.muted} autoFocus
            />
            <View style={styles.saveActions}>
              <TouchableOpacity style={[styles.saveCancelBtn, { backgroundColor: colors.border }]} onPress={() => { setShowSavePrompt(false); setSnippetName(''); }}>
                <Text style={[styles.saveCancelText, { color: colors.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveConfirmBtn, { backgroundColor: colors.accent }, !snippetName.trim() && { opacity: 0.4 }]}
                onPress={saveAsSnippet} disabled={!snippetName.trim()}
              >
                <Text style={[styles.saveConfirmText, { color: colors.accentText }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1 },
  backBtn: { marginRight: 12, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 18, fontWeight: 'bold' },
  headerTitle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerTitleText: { fontSize: 15, fontWeight: '600', flex: 1 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontWeight: '700', color: '#fff', marginLeft: 8 },
  snippetsBtn: { marginLeft: 8, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  snippetsBtnText: { fontSize: 12, fontWeight: '600' },
  solvedBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  solvedBtnText: { fontSize: 12, fontWeight: '700' },

  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderBottomWidth: 1 },
  toolbarLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toolbarRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langBadge: { fontSize: 12, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  savedText: { fontSize: 11 },
  toolBtn: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  toolBtnText: { fontSize: 11, fontWeight: '600' },

  inputContainer: { padding: 10, borderBottomWidth: 1 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  inputField: { fontSize: 13, fontFamily: 'Menlo', padding: 8, borderRadius: 6, minHeight: 50, maxHeight: 100, borderWidth: 1 },

  notesContainer: { padding: 10, borderBottomWidth: 1 },
  notesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notesSaved: { fontSize: 11, fontWeight: '600' },
  notesInput: { fontSize: 13, padding: 8, borderRadius: 6, minHeight: 80, maxHeight: 140, borderWidth: 1, lineHeight: 18 },

  inputHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  inputActions: { flexDirection: 'row', gap: 6 },
  smallBtn: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  smallBtnText: { fontSize: 10, fontWeight: '600' },

  templatesContainer: { padding: 10, borderBottomWidth: 1 },
  templatesScroll: { marginTop: 6 },
  templateBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 8 },
  templateBtnText: { fontSize: 11, fontWeight: '600' },

  testCasesContainer: { padding: 10, borderBottomWidth: 1 },
  testCasesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  runAllBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  runAllBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  testCaseRow: { flexDirection: 'row', gap: 6, marginBottom: 6, alignItems: 'center' },
  testInput: { flex: 1, fontSize: 11, padding: 6, borderRadius: 4, borderWidth: 1, fontFamily: 'Menlo' },
  runTestBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  runTestBtnText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  addTestBtn: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 6, padding: 8, alignItems: 'center', marginTop: 4 },
  addTestBtnText: { fontSize: 11, fontWeight: '600' },

  historyContainer: { maxHeight: 180 },
  historyScroll: { flex: 1 },
  historyEmpty: { textAlign: 'center', padding: 16, fontSize: 13 },
  historyItem: { paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyTime: { fontSize: 10 },
  historyStatus: { fontSize: 10, fontWeight: '700' },
  historyInput: { fontSize: 10, marginTop: 2 },
  historyOutput: { fontSize: 11, marginTop: 2, fontFamily: 'Menlo' },

  timerContainer: { padding: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  timerLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  timerDisplay: { fontSize: 22, fontWeight: '800', fontVariant: ['tabular-nums'], minWidth: 80 },
  timerActions: { flexDirection: 'row', gap: 8, marginLeft: 'auto' },
  timerBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  timerBtnText: { fontSize: 12, fontWeight: '700' },

  editorContainer: { flex: 1 },
  codeScroll: { flex: 1 },

  runBtn: { marginHorizontal: 10, marginVertical: 6, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  runBtnText: { fontSize: 16, fontWeight: '700' },

  outputContainer: { borderTopWidth: 1, height: 160, padding: 10 },
  outputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  outputScroll: { flex: 1 },
  outputText: { fontSize: 14, fontFamily: 'Menlo', lineHeight: 20 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70%', paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalClose: { fontSize: 18, fontWeight: 'bold' },

  emptySnippets: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 15, marginBottom: 6 },
  emptyHint: { fontSize: 12, textAlign: 'center' },

  snippetCard: { flexDirection: 'row', padding: 12, marginHorizontal: 12, marginTop: 10, borderRadius: 8, borderWidth: 1 },
  snippetInfo: { flex: 1 },
  snippetName: { fontSize: 14, fontWeight: '600' },
  snippetDate: { fontSize: 11, marginTop: 2 },
  snippetPreview: { fontSize: 11, marginTop: 6, fontFamily: 'Menlo' },
  snippetDelete: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 8, alignSelf: 'center' },
  snippetDeleteText: { fontSize: 12, fontWeight: 'bold' },

  saveModal: { margin: 20, marginTop: 'auto', marginBottom: 'auto', borderRadius: 12, padding: 20, maxHeight: 200 },
  saveModalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  saveInput: { fontSize: 14, padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  saveActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  saveCancelBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  saveCancelText: { fontSize: 14, fontWeight: '600' },
  saveConfirmBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  saveConfirmText: { fontSize: 14, fontWeight: '700' },
});
