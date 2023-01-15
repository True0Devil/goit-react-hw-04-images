import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyClose);

    return () => window.removeEventListener('keydown', handleKeyClose);
  }, [onClose]);

  const handleCloseOnBacdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleCloseOnBacdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
