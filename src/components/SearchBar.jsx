import React, { useState } from 'react';
import '../styles/components/SearchBar.css';

// Componente SearchBar que implementa una barra de búsqueda
// Props:
// - onSearch: función que se ejecuta cuando se realiza una búsqueda
const SearchBar = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Manejador del evento submit del formulario
  // Previene el comportamiento por defecto y ejecuta la búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };
  
  return (
    // Formulario de búsqueda con manejo de evento submit
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Campo de entrada para el término de búsqueda */}
      <input
        type="text"
        className="search-input"
        placeholder="Buscar juegos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Botón de búsqueda con icono */}
      <button type="submit" className="search-button">
        <span className="search-icon">🔍</span>
        <span>Buscar</span>
      </button>
    </form>
  );
};

export default SearchBar;