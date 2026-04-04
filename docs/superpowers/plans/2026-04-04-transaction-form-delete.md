# Transaction Form Rename & Delete Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename `AddTransaction` to `TransactionForm` and add a per-row delete button to `TransactionList` with a `window.confirm` confirmation dialog.

**Architecture:** `App.jsx` owns `transactions` state and provides a `handleDelete(id)` callback that filters the deleted transaction out. `TransactionList` receives `onDelete` as a new prop and renders a delete button on each row. The rename is a file-level change with no behavior modifications.

**Tech Stack:** React 19, Vite 7, ESLint (no test runner configured — verification is via `npm run lint` and manual browser check)

---

### Task 1: Rename AddTransaction.jsx to TransactionForm.jsx

**Files:**
- Rename: `src/components/AddTransaction.jsx` → `src/components/TransactionForm.jsx`

- [ ] **Step 1: Create TransactionForm.jsx with the same content as AddTransaction.jsx, updating the function name**

  Create `src/components/TransactionForm.jsx`:

  ```jsx
  import { useState } from 'react'

  function TransactionForm({ onAdd, categories }) {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("expense")
    const [category, setCategory] = useState("food")

    function handleSubmit(e) {
      e.preventDefault()
      if (!description || !amount) return

      const newTransaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString().split('T')[0],
      }

      onAdd(newTransaction)

      setDescription("")
      setAmount("")
      setType("expense")
      setCategory("food")
    }

    return (
      <div className="add-transaction">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }

  export default TransactionForm
  ```

- [ ] **Step 2: Delete the old file**

  ```bash
  git rm src/components/AddTransaction.jsx
  ```

- [ ] **Step 3: Update import in App.jsx**

  In `src/App.jsx`, replace:
  ```jsx
  import AddTransaction from './components/AddTransaction'
  ```
  with:
  ```jsx
  import TransactionForm from './components/TransactionForm'
  ```

  Also replace the JSX usage:
  ```jsx
  <AddTransaction onAdd={handleAdd} categories={categories} />
  ```
  with:
  ```jsx
  <TransactionForm onAdd={handleAdd} categories={categories} />
  ```

- [ ] **Step 4: Run lint to verify no errors**

  ```bash
  npm run lint
  ```
  Expected: no output (zero errors)

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/TransactionForm.jsx src/App.jsx
  git commit -m "Rename AddTransaction to TransactionForm"
  ```

---

### Task 2: Add delete handler in App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add handleDelete function in App.jsx**

  In `src/App.jsx`, after the `handleAdd` function, add:

  ```jsx
  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  ```

- [ ] **Step 2: Pass onDelete prop to TransactionList**

  Replace:
  ```jsx
  <TransactionList transactions={transactions} categories={categories} />
  ```
  with:
  ```jsx
  <TransactionList transactions={transactions} categories={categories} onDelete={handleDelete} />
  ```

- [ ] **Step 3: Run lint to verify no errors**

  ```bash
  npm run lint
  ```
  Expected: no output (zero errors)

- [ ] **Step 4: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "Add handleDelete and wire onDelete prop to TransactionList"
  ```

---

### Task 3: Add delete button to TransactionList rows

**Files:**
- Modify: `src/components/TransactionList.jsx`

- [ ] **Step 1: Update TransactionList to accept onDelete and render delete buttons**

  Replace the full content of `src/components/TransactionList.jsx` with:

  ```jsx
  import { useState } from "react";

  export default function TransactionList({ transactions, categories, onDelete }) {
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");

    const filteredTransactions = transactions.filter(t => {
      const matchesType = filterType === "all" || t.type === filterType;
      const matchesCategory = filterCategory === "all" || t.category === filterCategory;
      return matchesType && matchesCategory;
    });

    function handleDelete(id) {
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        onDelete(id);
      }
    }

    return (
      <div className="transactions">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </td>
                <td>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  ```

- [ ] **Step 2: Run lint to verify no errors**

  ```bash
  npm run lint
  ```
  Expected: no output (zero errors)

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/TransactionList.jsx
  git commit -m "Add delete button with confirmation to TransactionList rows"
  ```

---

### Task 4: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update component name in CLAUDE.md**

  In `CLAUDE.md`, replace:
  ```
  - `AddTransaction` — owns form state (`description`, `amount`, `type`, `category`); calls `onAdd(newTransaction)` prop on submit
  ```
  with:
  ```
  - `TransactionForm` — owns form state (`description`, `amount`, `type`, `category`); calls `onAdd(newTransaction)` prop on submit
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add CLAUDE.md
  git commit -m "Update CLAUDE.md: rename AddTransaction to TransactionForm"
  ```
