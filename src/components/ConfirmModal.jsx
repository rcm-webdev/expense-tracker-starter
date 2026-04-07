function ConfirmModal({ transaction, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-warning-stripe">!</div>
        <h2 className="modal-title">You sure?</h2>
        <p className="modal-body">
          You're about to delete{' '}
          <strong>"{transaction.description}"</strong>
          {' '}— this can't be undone.
        </p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn modal-btn-delete" onClick={onConfirm}>
            Delete it
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
