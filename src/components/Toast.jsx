import { useState, useEffect } from 'react';
import '../styles/toast.css';

export default function Toast({ message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-notification">
      {/* <div className="toast-icon">✅</div> */}
      <div className="toast-message">{message}</div>
      <button 
        className="toast-close"
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
      >
        ✕
      </button>
    </div>
  );
}
