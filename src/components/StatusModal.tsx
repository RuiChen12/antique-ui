'use client';

export type StatusModalVariant = 'success' | 'error' | 'info';

type StatusModalProps = {
  isOpen: boolean;
  variant: StatusModalVariant;
  title: string;
  message: string;
  closeLabel: string;
  onClose: () => void;
};

export default function StatusModal({
  isOpen,
  variant,
  title,
  message,
  closeLabel,
  onClose,
}: StatusModalProps) {
  if (!isOpen) {
    return null;
  }

  const statusText = {
    success: 'Success',
    error: 'Error',
    info: 'Notice',
  }[variant];

  return (
    <div className="status-modal-backdrop" role="presentation">
      <div
        className="status-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
        aria-describedby="status-modal-message"
      >
        <p className={`status-modal-label status-modal-label-${variant}`}>
          {statusText}
        </p>

        <h2 id="status-modal-title" className="status-modal-title">
          {title}
        </h2>

        <p id="status-modal-message" className="status-modal-message">
          {message}
        </p>

        <button type="button" className="status-modal-button" onClick={onClose}>
          {closeLabel}
        </button>
      </div>
    </div>
  );
}
