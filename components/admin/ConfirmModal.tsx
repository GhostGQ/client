'use client'

interface ConfirmModalProps {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmModal({ title, onConfirm, onCancel }: ConfirmModalProps) {
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h3 className="modal-title">{title}</h3>
          <div className="modal-actions">
            <button className="btn cancel" onClick={onCancel}>Отмена</button>
            <button className="btn delete" onClick={onConfirm}>Удалить</button>
          </div>
        </div>
      </div>
    );
  }
  