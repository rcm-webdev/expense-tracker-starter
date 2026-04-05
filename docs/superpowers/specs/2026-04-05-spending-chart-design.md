# Spending by Category Chart — Design Spec

**Date:** 2026-04-05

## Overview

Add a donut chart (via recharts) to the Finance Tracker that visualizes expense spending broken down by category. The chart sits between the `TransactionForm` and `TransactionList` components.

## Architecture

Follows the existing `Summary` pattern: `App` owns all computation and passes derived data down as props to a purely presentational component.

- `App` computes `categoryTotals` from expense transactions
- `App` renders `<SpendingChart categoryTotals={categoryTotals} />` between `<TransactionForm>` and `<TransactionList>`
- `SpendingChart` is a new presentational component — no internal state, no side effects

## New Component: `src/components/SpendingChart.jsx`

**Props:**
- `categoryTotals` — array of `{ name: string, value: number }`, one entry per category that has at least one expense

**Rendering:**
- Uses recharts `PieChart` > `Pie` with `innerRadius` set to produce a donut shape
- Uses `Cell` for per-slice colors (one color per category)
- Shows `Tooltip` with dollar amount on hover
- Shows `Legend` to label each category slice
- If `categoryTotals` is empty (no expense transactions), renders a short "No expense data" message instead of the chart

## Changes to `App.jsx`

**Compute `categoryTotals`:**
```js
const categoryTotals = categories
  .map(cat => ({
    name: cat,
    value: transactions
      .filter(t => t.type === "expense" && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0),
  }))
  .filter(entry => entry.value > 0);
```

**Render order:**
1. `<Summary>`
2. `<TransactionForm>`
3. `<SpendingChart categoryTotals={categoryTotals} />` ← new
4. `<TransactionList>`

## Dependency

Install `recharts` via npm. No other new dependencies.

## Scope

- Expenses only — income transactions are excluded from the chart
- Categories with $0 total expense are excluded from chart data
- No new state — chart is derived entirely from existing `transactions` array
- No persistence changes
