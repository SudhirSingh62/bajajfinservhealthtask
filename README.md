# 🚀 BFHL Graph Processing System

A full-stack application that analyzes directed relationships (A->B format), builds hierarchical structures, detects cycles, and generates structural insights.

---

## 🔗 Live Demo

* **Frontend:** https://bajajfinservhealthtask.vercel.app/
* **Backend API:** https://bajajfinservhealthtask.onrender.com

Test endpoint:

```
POST /bfhl
```

---

## 📌 What This Does

Given a list of edges like:

```
A->B, B->C, C->D
```

The system:

* Validates inputs
* Removes duplicates
* Applies single-parent constraint (Diamond Rule)
* Builds hierarchical trees
* Detects cycles
* Computes depth
* Returns structured output

---

## ⚙️ API Contract

### Request

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

### Response

```json
{
  "hierarchies": [...],
  "invalid_entries": [...],
  "duplicate_edges": [...],
  "summary": {
    "total_trees": number,
    "total_cycles": number,
    "largest_tree_root": string
  }
}
```

---

## 🧠 Approach

### 1. Validation & Deduplication

* Regex-based validation (`^[A-Z]->[A-Z]$`)
* Rejects malformed and self-loop inputs
* Tracks duplicates (reported once)

### 2. Graph Construction

* Builds adjacency list and parent map
* Enforces **single-parent constraint**

  * First edge wins
  * Others ignored silently

### 3. Component Detection

* Uses BFS on undirected graph
* Ensures independent trees are processed separately

### 4. Root Identification

* Node with no parent = root
* If none (cycle), choose lexicographically smallest node

### 5. Cycle Detection

* DFS with recursion stack
* If cycle → return `{ tree: {}, has_cycle: true }`

### 6. Tree Construction

* Recursive traversal from root
* Builds nested JSON hierarchy

### 7. Depth Calculation

* Longest root-to-leaf path (node count)

### 8. Summary Generation

* Counts trees and cycles
* Selects largest tree (tie → lexicographically smaller root)

---

## ⚡ Performance

* Time Complexity: **O(N + E)**
* Handles up to 50 nodes within required time (<3s)
* Efficient DFS/BFS traversal

---

## 🧪 Sample Test Case

### Input

```json
[
  "A->B","A->C","B->D","C->E","E->F",
  "X->Y","Y->Z","Z->X",
  "G->H","G->H","G->I",
  "hello","1->2","A->"
]
```

### Output (trimmed)

```json
{
  "hierarchies": [
    {"root":"A","depth":4},
    {"root":"X","has_cycle":true},
    {"root":"G","depth":2}
  ],
  "invalid_entries": ["hello","1->2","A->"],
  "duplicate_edges": ["G->H"]
}
```

---

## 🧩 Edge Cases Covered

* Duplicate edges handled once
* Diamond rule (multi-parent conflict)
* Pure cycles (no root scenario)
* Self-loops rejected
* Mixed valid + invalid inputs
* Lexicographic tie-breaking

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express
* **Frontend:** React (Vite)
* **Deployment:** Render (API), Vercel (UI)

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 💡 Notes

* Backend is fully dynamic (no hardcoded outputs)
* CORS enabled for cross-origin requests
* Designed to handle evaluator test cases robustly

---
