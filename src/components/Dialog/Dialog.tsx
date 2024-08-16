import React from 'react';

type DialogProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    isFullScreen?: boolean;
    isClickOutsideToClose?: boolean;
    showCloseButton?: boolean; // New prop to control the close button
}

const Dialog = ({ isOpen, onClose, children, isFullScreen, isClickOutsideToClose, showCloseButton = true }: DialogProps) => {
    const dialogStyle: React.CSSProperties = {
        width: isFullScreen ? '100%' : '80%',
        height: isFullScreen ? '100%' : '80%',
        border: '1px solid #ccc',
        boxShadow: '0 4px 6px rgba(0,0,0,.1)',
        zIndex: 1000,
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        position: 'relative' // Needed for positioning the close button
    };

    const closeButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: 'var(--text-color)'
    };

    if (!isOpen) return null;

    return (
        <div 
            style={{ 
                position: 'fixed', 
                top: 0, 
                right: 0, 
                bottom: 0, 
                left: 0, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }} 
            onClick={isClickOutsideToClose ? onClose : undefined}
        >
            <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
                {showCloseButton ? (
                    <button style={closeButtonStyle} onClick={onClose}>
                        &times;
                    </button>
                ) : (<></>)}
                {children}
            </div>
        </div>
    );
};

export default Dialog;
