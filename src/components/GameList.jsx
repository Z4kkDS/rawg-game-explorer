import React, { useEffect, useCallback } from 'react';
import GameCard from './GameCard';
import '../styles/components/GameList.css';

// Componente que muestra una lista de juegos con scroll infinito
const GameList = ({ games, onLoadMore, hasMore }) => {
  // Función que maneja el evento de scroll para cargar más juegos
  const handleScroll = useCallback(() => {
    // Verifica si estamos cerca del final de la página
    if (
      !hasMore ||
      window.innerHeight + document.documentElement.scrollTop < 
      document.documentElement.offsetHeight - 500
    ) {
      return;
    }
    
    // Ejecuta la función para cargar más juegos
    onLoadMore();
  }, [hasMore, onLoadMore]);
  
  // Efecto para agregar y limpiar el evento de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Limpieza del evento cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Si no hay juegos, muestra un mensaje
  if (games.length === 0) {
    return (
      <div className="no-games-message">
        No games found. Try adjusting your search or filters.
      </div>
    );
  }
  
  // Renderiza la lista de juegos
  return (
    <div className="game-list">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;