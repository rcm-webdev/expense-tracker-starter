import { useState } from 'react'
import toast from 'react-hot-toast'

function TransactionForm({ onAdd, categories }) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("food")
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    if (!description.trim()) newErrors.description = "Description is required"
    if (!amount) newErrors.amount = "Amount is required"
    else if (parseFloat(amount) <= 0) newErrors.amount = "Amount must be greater than 0"
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    }

    onAdd(newTransaction)
    toast.success(`${type === 'income' ? '+' : '-'}$${parseFloat(amount).toFixed(2)} added!`)

    setDescription("")
    setAmount("")
    setType("expense")
    setCategory("food")
    setErrors({})
  }

  function clearError(field) {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); clearError('description') }}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>
        <div className="field-group">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            min="0"
            step="0.01"
            onChange={(e) => { setAmount(e.target.value); clearError('amount') }}
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && <span className="error-msg">{errors.amount}</span>}
        </div>
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
