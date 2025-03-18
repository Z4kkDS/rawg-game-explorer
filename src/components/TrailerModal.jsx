import React, { useEffect } from 'react';
import '../styles/components/TrailerModal.css';

// Componente modal para mostrar trailers de juegos
const TrailerModal = ({ trailer, onClose }) => {
  // Efecto para manejar el cierre del modal con la tecla ESC y controlar el scroll
  useEffect(() => {
    // Función para manejar el evento de tecla presionada
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Deshabilita el scroll del body
    
    // Limpieza del efecto
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Rehabilita el scroll del body
    };
  }, [onClose]);

  // Función para cerrar el modal al hacer clic fuera de él
  const handleOutsideClick = (e) => {
    if (e.target.className === 'trailer-modal-overlay') {
      onClose();
    }
  };

  return (
    // Contenedor principal del modal con overlay
    <div className="trailer-modal-overlay" onClick={handleOutsideClick}>
      <div className="trailer-modal">
        {/* Cabecera del modal con título y botón de cierre */}
        <div className="trailer-modal-header">
          <h3>{trailer.name}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {/* Contenedor del video */}
        <div className="trailer-video-container">
          {/* Renderiza el video si existe la URL */}
          {trailer.data && trailer.data.max && (
            <video 
              src={trailer.data.max} 
              controls 
              autoPlay
              className="trailer-video"
            />
          )}
          {/* Mensaje de error si no hay video disponible */}
          {!trailer.data?.max && (
            <div className="error-message">
              Video not available. Try watching it on the game's official website.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;