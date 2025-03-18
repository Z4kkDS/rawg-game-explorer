import React, { useState, useEffect } from 'react';
import GameList from '../components/GameList';
import SearchBar from '../components/SearchBar';
import GameFilters from '../components/GameFilters';
import Loader from '../components/Loader';
import { getTopGames, searchGames, getFilters } from '../api/rawgApi';

// Componente principal de la página de inicio
const HomePage = () => {
  // Estados para manejar los juegos y la interfaz
  const [games, setGames] = useState([]); // Lista de juegos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores
  const [page, setPage] = useState(1); // Paginación
  const [hasMore, setHasMore] = useState(true); // Indica si hay más páginas
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda
  const [filters, setFilters] = useState({}); // Filtros aplicados
  // Opciones disponibles para filtrar
  const [filterOptions, setFilterOptions] = useState({
    genres: [], // Géneros
    platforms: [], // Plataformas
    tags: [], // Etiquetas
    developers: [] // Desarrolladores
  });
  
  // Cargar opciones de filtros al montar el componente
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const options = await getFilters();
        setFilterOptions(options);
      } catch (err) {
        console.error('Error al cargar los filtros:', err);
      }
    };
    
    loadFilters();
  }, []);
  
  // Cargar juegos basados en la búsqueda y filtros
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = searchQuery
          ? await searchGames(searchQuery, page, filters)
          : await getTopGames(page, filters);
        
        setGames(prevGames => 
          page === 1 ? data.results : [...prevGames, ...data.results]
        );
        setHasMore(!!data.next);
      } catch (err) {
        setError('Error al cargar los juegos. Por favor, inténtalo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadGames();
  }, [page, filters, searchQuery]);
  
  // Manejador de búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reiniciar a primera página para nueva búsqueda
  };
  
  // Manejador de cambios en filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reiniciar a primera página para nuevos filtros
  };
  
  // Función para cargar más juegos
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };
  
  return (
    <div className="home-page">
      <div className="search-filter-container">
        <SearchBar onSearch={handleSearch} />
        <GameFilters 
          options={filterOptions} 
          onFilterChange={handleFilterChange} 
        />
      </div>
      
      <h1 className="page-title">
        {searchQuery 
          ? `Resultados de búsqueda para: "${searchQuery}"` 
          : 'Juegos Mejor Valorados'}
      </h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <GameList 
        games={games} 
        onLoadMore={loadMore} 
        hasMore={hasMore}
      />
      
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;