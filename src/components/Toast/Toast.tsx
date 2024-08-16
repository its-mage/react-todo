import React, { useState, useEffect, useRef } from 'react';
import "./Toast.css";

export type ToastVariant = 'success' | 'warning' | 'error' | undefined;

interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
}

const Toast: React.FC<ToastProps> = ({
  variant = 'blue',
  title = '',
  description = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2000);
  const intervalRef = useRef<NodeJS.Timeout>();

  const color =
    variant === 'success'
      ? 'white'
      : variant === 'warning'
      ? 'black'
      : variant === 'error'
      ? 'white'
      : 'white';

  const backgroundColor =
    variant === 'success'
      ? 'var(--background-color)'
      : variant === 'warning'
      ? 'var(--text-color)'
      : variant === 'error'
      ? 'var(--secondary-background-color)'
      : 'var(--background-color)';

  const borderColor =
    variant === 'success'
      ? 'var(--secondary-background-color)'
      : variant === 'warning'
      ? 'var(--link-color)'
      : variant === 'error'
      ? 'var(--text-color)'
      : 'var(--link-color)';

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startTimer();
  };

  const closeToast = () => {
    setIsClosed(true);
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
      } else {
        clearInterval(intervalRef.current);
        setIsClosed(true);
      }
    }, 100);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return (
    <div
      className={
        isClosed
          ? 'toast toast--closed'
          : isHovered
          ? 'toast toast--hovered'
          : 'toast'
      }
      style={{
        backgroundColor,
        border: `1px solid ${borderColor}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast__content">
        <p className="toast__title">{title}</p>
        <p className="toast__description" style={{ color }}>{description}</p>
      </div>
      <div
        className="toast__close-icon"
        onClick={closeToast}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div
        className="toast__time-left"
        style={{
          backgroundColor: borderColor,
          width: `${(timeLeft / 2000) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default Toast;

