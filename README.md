# SRM BFHL - Graph Processing Full Stack Application

## Problem Summary
This project aims to implement a system that processes a series of directed relationships (edges) and builds out structural representations. Given a list of connections in the format `A->B`, the system validates the inputs, identifies duplicate connections, and constructs directed graphs. The goal is to separate connected components, detect cycles within them, and calculate the maximum depth of non-cyclic trees.

## Approach (Graph Algorithm Explanation)
1. **Validation & Duplicate Detection:**
   - Filters inputs using the regex `^[A-Z]->[A-Z]$`.
   - Prevents self-loops (e.g. `A->A`).
   - Stores duplicate edges separately.
   - Enforces the **Diamond Rule** (each node can have at most one parent; subsequent edges arriving at the same child are discarded).

2. **Graph Building & Connected Components:**
   - Adjacency maps for children and parent mappings are created.
   - Connected components are identified using a BFS approach over the undirected equivalent of the valid directed tree edges to group nodes.

3. **Root Detection:**
   - Within each connected component, a node with no parent is identified as the root.
   - If no root is found (pure cycle), the lexicographically smallest node in the component is chosen as the root.

4. **Cycle Detection:**
   - A Depth-First Search (DFS) algorithm with a recursion stack is executed from the component's root to find if a cycle exists.

5. **Tree Building & Depth Calculation:**
   - If no cycle is detected, a recursive function traverses the hierarchy starting from the root to build a nested tree object.
   - The depth is recursively calculated as the maximum number of nodes on the longest path from the root to a leaf.

6. **Summary Generation:**
   - Outputs the total number of valid trees, total cyclic components, and identifies the largest tree's root. Tie-breaking relies on the lexicographical order.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite
- **Styling:** Vanilla CSS
- **Deployment Configuration:** Render (Backend), Vercel (Frontend)

## How to Run Locally

### Prerequisites
- Node.js installed on your machine.

### Backend Setup
```bash
cd srm-bfhl/backend
npm install
npm start
# Runs on http://localhost:3000
```

### Frontend Setup
```bash
cd srm-bfhl/frontend
npm install
npm run dev
# Runs on local port indicated by Vite
```

## Deployed URLs
- **Backend API:** `https://your-app.onrender.com`
- **Frontend App:** `https://your-app.vercel.app`

## Sample Input / Output Test Cases

**Test Case 1 (Mixed structures)**
*Input:*
`["A->B", "A->C", "B->D", "C->E", "E->F", "X->Y", "Y->Z", "Z->X", "P->Q", "Q->R", "G->H", "G->H", "G->I", "hello", "1->2", "A->"]`

*Output:*
```json
{
  "hierarchies": [
    {"root":"A","tree":{"A":{"B":{"D":{}},"C":{"E":{"F":{}}}}},"depth":4},
    {"root":"X","tree":{},"has_cycle":true},
    {"root":"P","tree":{"P":{"Q":{"R":{}}}},"depth":3},
    {"root":"G","tree":{"G":{"H":{},"I":{}}},"depth":2}
  ],
  "invalid_entries": ["hello","1->2","A->"],
  "duplicate_edges": ["G->H"],
  "summary": {
    "total_trees": 3,
    "total_cycles": 1,
    "largest_tree_root": "A"
  }
}
```

**Test Case 2 (Single Tree)**
*Input:*
`["M->N", "N->O"]`

*Output:*
```json
{
  "hierarchies": [
    {"root":"M","tree":{"M":{"N":{"O":{}}}},"depth":3}
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "M"
  }
}
```

**Test Case 3 (Diamond Rule Verification)**
*Input:*
`["A->C", "B->C"]`

*Output:*
```json
{
  "hierarchies": [
    {"root":"A","tree":{"A":{"C":{}}},"depth":2},
    {"root":"B","tree":{"B":{}},"depth":1}
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 2,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## Edge Cases Handled
- **Diamond Rule:** The second encountered edge targeting an existing child is silently discarded.
- **Pure Cycles:** A component consisting strictly of a cycle triggers lexicographically smallest node fallback as the "root" for checking.
- **Self-Loops:** Direct self-loops like `A->A` are flagged as invalid entries.
- **Malformed Input:** Non-string entries or invalid formats are correctly caught and pushed to `invalid_entries`.
- **Tie-Breaking:** If two trees have the maximum depth, the lexicographically smaller root is chosen for the summary.
