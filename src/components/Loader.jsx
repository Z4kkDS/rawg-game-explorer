import React from 'react';
import '../styles/components/Loader.css';

// Componente Loader: Muestra un indicador de carga con una animación y texto
const Loader = () => {
  return (
    // Contenedor principal del loader
    <div className="loader-container">
      {/* Elemento que contiene la animación de carga */}
      <div className="loader"></div>
      {/* Texto que indica que está cargando */}
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;