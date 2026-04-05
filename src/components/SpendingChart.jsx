import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#8b5cf6'];

function SpendingChart({ categoryTotals = [] }) {
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
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
