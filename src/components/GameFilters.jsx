import React, { useState } from 'react';
import '../styles/components/GameFilters.css';

/**
 * Componente GameFilters: Maneja los filtros de búsqueda para los juegos
 * @param {Object} options - Objeto que contiene las listas de géneros, plataformas, etiquetas y desarrolladores
 * @param {Function} onFilterChange - Función callback que se ejecuta cuando cambian los filtros
 */
const GameFilters = ({ options, onFilterChange }) => {
  // Estados para manejar los valores seleccionados de cada filtro
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Genera array de años desde 1980 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => currentYear - i
  );
  
  /**
   * Aplica los filtros seleccionados y envía los cambios al componente padre
   */
  const applyFilters = () => {
    const filters = {};
    
    if (selectedYear) filters.dates = `${selectedYear}-01-01,${selectedYear}-12-31`;
    if (selectedGenre) filters.genres = selectedGenre;
    if (selectedPlatform) filters.platforms = selectedPlatform;
    if (selectedTag) filters.tags = selectedTag;
    if (selectedDeveloper) filters.developers = selectedDeveloper;
    
    onFilterChange(filters);
  };
  
  /**
   * Limpia todos los filtros seleccionados
   */
  const clearFilters = () => {
    setSelectedYear('');
    setSelectedGenre('');
    setSelectedPlatform('');
    setSelectedTag('');
    setSelectedDeveloper('');
    onFilterChange({});
  };
  
  /**
   * Alterna la visibilidad del panel de filtros
   */
  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="game-filters">
      <button 
        className="toggle-filters-btn"
        onClick={toggleFilters}
      >
        {isExpanded ? 'Ocultar Filtros' : 'Mostrar Filtros'} ▼
      </button>
      
      {isExpanded && (
        <div className="filters-container">
          <div className="filter-group">
            <label>Año:</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Todos los años</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Género:</label>
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Todos los géneros</option>
              {options.genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Plataforma:</label>
            <select 
              value={selectedPlatform} 
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">Todas las plataformas</option>
              {options.platforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Etiqueta:</label>
            <select 
              value={selectedTag} 
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Todas las etiquetas</option>
              {options.tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Desarrollador:</label>
            <select 
              value={selectedDeveloper} 
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            >
              <option value="">Todos los desarrolladores</option>
              {options.developers.map(dev => (
                <option key={dev.id} value={dev.id}>{dev.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-actions">
            <button 
              className="apply-filters-btn"
              onClick={applyFilters}
            >
              Aplicar Filtros
            </button>
            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFilters;