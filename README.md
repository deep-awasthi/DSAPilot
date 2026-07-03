# DSAPilot

A React Native (Expo) iOS app for **Strivers SDE Sheet** — 191 curated DSA problems across 28 categories with a built-in Java IDE.

## Features

- **191 Problems** across 28 topics (Arrays, Linked Lists, Trees, Graphs, DP, Trie, etc.)
- **Built-in Java IDE** — write, compile, and run Java code using the Judge0 CE API
- **Syntax Highlighting** — keywords, types, strings, comments, and numbers colorized
- **Auto-save** — code and notes auto-save per problem (1.5s debounce)
- **Named Snippets** — save code snippets with custom names, load them into any problem
- **Per-problem Notes** — jot down approaches, edge cases, time complexity
- **Stopwatch Timer** — optional timer to track how long you spend on each problem
- **Test Cases** — add multiple input/expected output pairs, run all at once
- **Output History** — last 20 runs with pass/fail status and timestamps
- **Progress Tracking** — checkbox per problem, category-level and overall progress stats
- **Dark/Light Mode** — Catppuccin Mocha (dark) and Catppuccin Latte (light) themes
- **In-app Browser** — open problem links without leaving the app
- **Social Links** — GitHub, LinkedIn, Medium profiles in Settings

## Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Expo Go app on your phone

### Local Development

```bash
# Clone the repo
cd /path/to/DSAPilot

# Install dependencies
npm install

# Start on iOS simulator
npx expo start --ios

# Or start on web browser
npx expo start --web

# Or scan QR code with Expo Go on your phone
npx expo start
```

### Run on Physical Device

1. Install **Expo Go** from the App Store
2. Run `npx expo start`
3. Scan the QR code with your camera

## Docker

### Build and Run

```bash
# Using docker compose (recommended)
docker compose up -d

# Or using Docker directly
docker build -t dsapilot .
docker run -p 3000:3000 dsapilot
```

The web version will be available at **http://localhost:3000**

### Stop

```bash
docker compose down
```

### npm Scripts

```bash
npm run docker:build   # Build Docker image
npm run docker:up      # Start container
npm run docker:down    # Stop container
npm run build:web      # Build for web without Docker
npm run serve          # Serve the built web app locally
```

## Project Structure

```
DSAPilot/
├── App.tsx                          # Root navigator + splash screen
├── src/
│   ├── components/
│   │   └── CodeMirrorEditor.tsx     # Syntax-highlighted code editor
│   ├── context/
│   │   └── ThemeContext.tsx          # Dark/light theme provider
│   ├── data/
│   │   └── problems.ts              # All 191 problems with metadata
│   └── screens/
│       ├── HomeScreen.tsx            # Category list + overall progress
│       ├── ProblemsScreen.tsx        # Problems per category
│       ├── CodeEditorScreen.tsx      # Java IDE + notes + timer + snippets
│       ├── WebViewScreen.tsx         # In-app browser
│       └── SettingsScreen.tsx        # Theme toggle + social links + clear data
├── assets/                          # App icons and splash
├── Dockerfile                       # Multi-stage Docker build
├── docker-compose.yml               # Docker Compose config
├── .dockerignore                    # Docker ignore rules
├── src/types/
│   └── modules.d.ts                 # TypeScript declarations
├── app.json                         # Expo configuration
└── package.json                     # Dependencies and scripts
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo 57 |
| Navigation | React Navigation 7 (Native Stack) |
| Storage | AsyncStorage (per-device persistence) |
| Java Runtime | Judge0 CE API (`ce.judge0.com`) |
| Syntax Highlighting | Custom tokenizer (keywords, types, strings, comments) |
| Theme | Catppuccin Mocha (dark) / Catppuccin Latte (light) |
| Language | TypeScript |

## API

The Java IDE uses **Judge0 CE** (`https://ce.judge0.com/submissions?wait=true`) — a free, open-source code execution API.

**Language ID:** 62 (Java JDK 15.0.2)

### Example Request

```json
POST https://ce.judge0.com/submissions?wait=true
{
  "source_code": "class Main { public static void main(String[] args) { System.out.println(\"Hello\"); } }",
  "language_id": 62,
  "stdin": ""
}
```

### Example Response

```json
{
  "stdout": "Hello\n",
  "time": 0.045,
  "memory": 15880,
  "status": { "id": 3, "description": "Accepted" }
}
```

## Problem Categories

| # | Category | Problems |
|---|----------|----------|
| 1 | Arrays | 6 |
| 2 | Arrays Part-II | 6 |
| 3 | Arrays Part-III | 6 |
| 4 | Arrays Part-IV | 6 |
| 5 | Linked List | 6 |
| 6 | Linked List Part-II | 6 |
| 7 | Linked List and Arrays | 6 |
| 8 | Greedy Algorithm | 6 |
| 9 | Recursion | 6 |
| 10 | Recursion and Backtracking | 6 |
| 11 | Binary Search | 8 |
| 12 | Heaps | 6 |
| 13 | Stack and Queue | 7 |
| 14 | Stack and Queue Part-II | 10 |
| 15 | String | 6 |
| 16 | String Part-II | 6 |
| 17 | Binary Tree | 12 |
| 18 | Binary Tree Part-II | 8 |
| 19 | Binary Tree Part-III | 7 |
| 20 | Binary Search Tree | 7 |
| 21 | BST Part-II | 8 |
| 22 | Binary Trees (Misc) | 6 |
| 23 | Graph | 12 |
| 24 | Graph Part-II | 6 |
| 25 | Dynamic Programming | 7 |
| 26 | DP Part-II | 8 |
| 27 | Trie | 7 |
| **Total** | | **191** |

## License

MIT
