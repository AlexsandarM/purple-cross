function ToastMessage({ toast, onClose }) {
  if (!toast?.message) {
    return null;
  }

  const variant = toast.variant ?? "info";

  return (
    <div className={`toast toast-${variant}`} role="status" data-testid="toast-message">
      <p>{toast.message}</p>
      <button
        type="button"
        className="button button-secondary button-small"
        onClick={onClose}
        data-testid="toast-dismiss-button"
      >
        Dismiss
      </button>
    </div>
  );
}

export default ToastMessage;
