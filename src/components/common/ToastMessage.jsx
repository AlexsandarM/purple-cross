function ToastMessage({ toast, onClose }) {
  if (!toast?.message) {
    return null;
  }

  const variant = toast.variant ?? "info";
  const iconByVariant = {
    success: "✓",
    error: "!",
    info: "i",
  };
  const icon = iconByVariant[variant] ?? iconByVariant.info;

  return (
    <div
      className={`toast toast-${variant}`}
      role="status"
      aria-live="polite"
      data-testid="toast-message"
    >
      <div className="toast-content">
        <span className="toast-icon" aria-hidden="true">
          {icon}
        </span>
        <p>{toast.message}</p>
      </div>
      <button
        type="button"
        className="button button-secondary button-small"
        onClick={onClose}
        aria-label="Dismiss notification"
        data-testid="toast-dismiss-button"
      >
        Dismiss
      </button>
    </div>
  );
}

export default ToastMessage;
