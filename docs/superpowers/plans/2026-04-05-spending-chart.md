# Spending by Category Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a recharts donut chart between the TransactionForm and TransactionList that shows expense spending broken down by category.

**Architecture:** `App` computes `categoryTotals` (expenses only) and passes it as a prop to a new presentational `SpendingChart` component, matching the existing `Summary` pattern. No new state, no side effects.

**Tech Stack:** React 19, recharts (new dependency), Vite

---

> **Note:** This project has no test infrastructure. Steps skip TDD and verify via the dev server instead.

---

### Task 1: Install recharts

**Files:**
- Modify: `package.json` (updated by npm)

- [ ] **Step 1: Install recharts**

```bash
npm install recharts
```

Expected output: recharts added to `dependencies` in `package.json`.

- [ ] **Step 2: Verify install**

```bash
npm ls recharts
```

Expected: a line showing `recharts@x.x.x`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install recharts"
```

---

### Task 2: Create SpendingChart component

**Files:**
- Create: `src/components/SpendingChart.jsx`

- [ ] **Step 1: Create the component**

Create `src/components/SpendingChart.jsx` with this content:

```jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#8b5cf6'];

function SpendingChart({ categoryTotals }) {
  if (categoryTotals.length === 0) {
    return (
      <div className="chart-section">
        <h2>Spending by Category</h2>
        <p className="subtitle">No expense data yet.</p>
      </div>
    );
  }

  return (
    <div className="chart-section">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryTotals}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
          >
            {categoryTotals.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SpendingChart.jsx
git commit -m "feat: add SpendingChart donut chart component"
```

---

### Task 3: Wire SpendingChart into App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add categoryTotals computation to App**

In `src/App.jsx`, add the following after the existing `balance` computation (after line ~29):

```js
const categoryTotals = categories
  .map(cat => ({
    name: cat,
    value: transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0),
  }))
  .filter(entry => entry.value > 0);
```

- [ ] **Step 2: Import SpendingChart**

Add this import at the top of `src/App.jsx` alongside the other component imports:

```js
import SpendingChart from './components/SpendingChart'
```

- [ ] **Step 3: Render SpendingChart between TransactionForm and TransactionList**

In the JSX return block, replace:

```jsx
      <TransactionForm onAdd={handleAdd} categories={categories} />

      <TransactionList transactions={transactions} categories={categories} onDelete={handleDelete} />
```

with:

```jsx
      <TransactionForm onAdd={handleAdd} categories={categories} />

      <SpendingChart categoryTotals={categoryTotals} />

      <TransactionList transactions={transactions} categories={categories} onDelete={handleDelete} />
```

- [ ] **Step 4: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173. Expected:
- Donut chart appears between the form and the transaction list
- Chart shows slices for: housing ($1200), food ($215), utilities ($95), transport ($45), entertainment ($15)
- Hovering a slice shows `$<amount>` in the tooltip
- Legend labels each category
- Adding or deleting a transaction updates the chart

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire SpendingChart into App with categoryTotals"
```
