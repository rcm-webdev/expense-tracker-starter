# Transaction Form Rename & Delete Feature

**Date:** 2026-04-04

## Overview

Two related changes: rename the `AddTransaction` component to `TransactionForm` for accuracy, and add a per-row delete action to the transaction list with a native confirmation dialog.

## Rename

`src/components/AddTransaction.jsx` → `src/components/TransactionForm.jsx`

- No behavior changes to the component itself
- Update the import in `App.jsx` from `AddTransaction` to `TransactionForm`
- Update CLAUDE.md component list to reflect the new name

## Delete Feature

### User flow

1. Each row in the transaction table has a **Delete** button
2. Clicking it triggers `window.confirm("Are you sure you want to delete this transaction?")`
3. If the user confirms, the transaction is removed from state
4. If the user cancels, nothing changes

### Data flow

- `App.jsx` defines `handleDelete(id)` — filters `transactions` by removing the entry with the given id
- `TransactionList` receives an `onDelete` prop and passes `() => onDelete(t.id)` to each row's delete button
- No new state is introduced anywhere

### Component interfaces

**App.jsx**
```jsx
const handleDelete = (id) => {
  setTransactions(transactions.filter(t => t.id !== id));
};

<TransactionList transactions={transactions} categories={categories} onDelete={handleDelete} />
```

**TransactionList.jsx**
- Adds `onDelete` prop
- Each `<tr>` gets a `<button>` that calls `window.confirm` then `onDelete(t.id)`

## Files Changed

| File | Change |
|------|--------|
| `src/components/AddTransaction.jsx` | Renamed to `TransactionForm.jsx` |
| `src/App.jsx` | Updated import name, added `handleDelete`, passes `onDelete` to `TransactionList` |
| `src/components/TransactionList.jsx` | Added `onDelete` prop, delete button per row |
| `CLAUDE.md` | Updated component name in architecture section |
