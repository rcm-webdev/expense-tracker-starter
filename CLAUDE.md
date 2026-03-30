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

This is a single-file React app — all state and UI logic lives in `src/App.jsx`. There are no separate components, no routing, and no external state management.

**Key state in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a string (not a number), which causes incorrect totals — a known bug in this starter.
- `filterType` / `filterCategory` — control which transactions are shown in the table.

**Data flow:** transactions are filtered inline during render (no memoization), totals are computed by reducing `transactions` directly.

There is no persistence — state resets on page reload.
