# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

The app is split across `src/App.jsx` and three components in `src/components/`. There is no routing and no external state management.

**Components:**
- `App` — owns `transactions` state, computes totals, passes data down via props
- `Summary` — displays total income, expenses, and balance; purely presentational
- `TransactionForm` — owns form state (`description`, `amount`, `type`, `category`); calls `onAdd(newTransaction)` prop on submit
- `TransactionList` — owns filter state (`filterType`, `filterCategory`); receives `transactions` prop and filters inline during render

**Key state in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a number (`parseFloat`).

**Data flow:** `App` computes `totalIncome`, `totalExpenses`, and `balance` by reducing `transactions`. Filtering lives inside `TransactionList`. No memoization.

There is no persistence — state resets on page reload.
