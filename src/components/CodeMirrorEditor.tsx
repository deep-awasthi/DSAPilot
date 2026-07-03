import React, { useState, useCallback } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface Props {
  code: string;
  onChange: (code: string) => void;
  theme: 'dark' | 'light';
}

const KW = new Set(['import','public','private','protected','static','void','class','interface','extends','implements','new','return','if','else','for','while','do','switch','case','break','continue','try','catch','finally','throw','throws','package','abstract','final','synchronized','volatile','transient','native','assert','enum','instanceof','super','this','null','true','false']);
const TP = new Set(['int','long','short','byte','char','float','double','boolean','String','Integer','Long','ArrayList','HashMap','LinkedList','HashSet','Scanner','System','Collections','Arrays','Math','List','Map','Set','Queue','Stack','PriorityQueue','Object','Deque','ArrayDeque','TreeSet','TreeMap']);
const FN = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

function getColors(theme: 'dark' | 'light') {
  if (theme === 'dark') return { t:'#ABB2BF', kw:'#C678DD', tp:'#E5C07B', st:'#98C379', cm:'#5C6370', nm:'#D19A66', an:'#61AFEF', bg:'#282C34', gutter:'#21252B', gutterText:'#636D83', border:'#3E4451', accent:'#61AFEF' };
  return { t:'#383a42', kw:'#a626a4', tp:'#c18401', st:'#50a14f', cm:'#a0a1a7', nm:'#986801', an:'#4078f2', bg:'#fafafa', gutter:'#f0f0f0', gutterText:'#999', border:'#ddd', accent:'#4078f2' };
}

function tokenize(line: string, c: ReturnType<typeof getColors>): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|\b([a-zA-Z_]\w*)\b|(\b\d+\.?\d*[fFdDlL]?\b)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push(<Text key={k++} style={{ color: c.t }}>{line.slice(last, m.index)}</Text>);
    if (m[1]) parts.push(<Text key={k++} style={{ color: c.cm, fontStyle: 'italic' }}>{m[0]}</Text>);
    else if (m[2]) parts.push(<Text key={k++} style={{ color: c.st }}>{m[0]}</Text>);
    else if (m[3]) parts.push(<Text key={k++} style={{ color: c.an }}>{m[0]}</Text>);
    else if (m[4]) {
      if (KW.has(m[4])) parts.push(<Text key={k++} style={{ color: c.kw, fontWeight: '700' }}>{m[4]}</Text>);
      else if (TP.has(m[4])) parts.push(<Text key={k++} style={{ color: c.tp }}>{m[4]}</Text>);
      else parts.push(<Text key={k++} style={{ color: c.t }}>{m[4]}</Text>);
    }
    else if (m[5]) parts.push(<Text key={k++} style={{ color: c.nm }}>{m[0]}</Text>);
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(<Text key={k++} style={{ color: c.t }}>{line.slice(last)}</Text>);
  if (!parts.length) parts.push(<Text key={k++} style={{ color: c.t }}>{line}</Text>);
  return parts;
}

export default function CodeMirrorEditor({ code, onChange, theme }: Props) {
  const c = getColors(theme);
  const [editing, setEditing] = useState(false);
  const lines = code.split('\n');

  const handleEdit = useCallback((text: string) => {
    onChange(text);
  }, [onChange]);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: c.gutter, borderBottomColor: c.border }]}>
        <Text style={[styles.toolbarLabel, { color: editing ? c.accent : c.an }]}>
          {editing ? 'Editing' : 'Syntax Highlighted'}
        </Text>
        <TouchableOpacity
          onPress={() => setEditing(!editing)}
          style={[styles.toolbarBtn, { backgroundColor: editing ? c.accent : c.border }]}
        >
          <Text style={[styles.toolbarBtnText, { color: editing ? '#fff' : c.t }]}>
            {editing ? 'Done' : 'Edit Code'}
          </Text>
        </TouchableOpacity>
      </View>

      {editing ? (
        /* Editing mode: plain TextInput */
        <TextInput
          style={[styles.codeInput, { color: c.t, backgroundColor: c.bg }]}
          value={code}
          onChangeText={handleEdit}
          multiline
          autoCorrect={false}
          autoCapitalize="none"
          spellCheck={false}
          selectionColor={c.accent}
          autoFocus
        />
      ) : (
        /* View mode: highlighted read-only */
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.gutter, { backgroundColor: c.gutter, borderRightColor: c.border }]}>
              {lines.map((_, i) => (
                <Text key={i} style={[styles.lineNum, { color: c.gutterText }]}>{String(i + 1).padStart(3, ' ')}</Text>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              {lines.map((line, i) => (
                <View key={i} style={styles.codeLine}>
                  <Text>{tokenize(line, c)}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ height: 300 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6, borderBottomWidth: 1,
  },
  toolbarLabel: { fontSize: 11, fontWeight: '700' },
  toolbarBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4 },
  toolbarBtnText: { fontSize: 12, fontWeight: '600' },
  gutter: { width: 44, borderRightWidth: 1 },
  lineNum: { height: 22, fontSize: 13, fontFamily: 'Menlo', lineHeight: 22, textAlign: 'right', paddingRight: 8 },
  codeLine: { height: 22, paddingLeft: 8, justifyContent: 'center' },
  codeInput: {
    flex: 1, fontSize: 14, fontFamily: 'Menlo', lineHeight: 22,
    padding: 12, paddingLeft: 52,
  },
});
