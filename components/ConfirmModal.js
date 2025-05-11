export default function ConfirmModal({ open, onClose, onConfirm, title = "Вы уверены?", description = "" }) {
    if (!open) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-box" style={{ maxWidth: '400px', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '20px' }}>{title}</h3>
          {description && <p style={{ color: '#ccc' }}>{description}</p>}
  
          <div className="modal-actions">
            <button onClick={onConfirm}>Удалить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    );
  }
  