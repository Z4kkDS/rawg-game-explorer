import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/GameCard.css';

// Componente GameCard que muestra la información básica de un juego
const GameCard = ({ game }) => {
  return (
    // Link que envuelve la card y navega al detalle del juego
    <Link to={`/game/${game.id}`} className="game-card">
      {/* Contenedor de la imagen del juego */}
      <div className="game-card-image">
        <img 
          src={game.background_image || '/placeholder.png'} 
          alt={game.name} 
          loading="lazy"
        />
        {/* Badge con puntuación Metacritic (si existe) */}
        {game.metacritic && (
          <div className={`metacritic-badge ${game.metacritic > 75 ? 'high' : game.metacritic > 60 ? 'medium' : 'low'}`}>
            {game.metacritic}
          </div>
        )}
      </div>
      
      {/* Contenedor de la información del juego */}
      <div className="game-card-content">
        {/* Título del juego */}
        <h3 className="game-title">{game.name}</h3>
        
        {/* Año de lanzamiento (si existe) */}
        {game.released && (
          <div className="game-release-date">
            {new Date(game.released).getFullYear()}
          </div>
        )}
        
        {/* Lista de géneros (máximo 3) */}
        {game.genres && game.genres.length > 0 && (
          <div className="game-genres">
            {game.genres.slice(0, 3).map((genre, index) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}{index < Math.min(game.genres.length, 3) - 1 ? ', ' : ''}
              </span>
            ))}
            {game.genres.length > 3 && <span>...</span>}
          </div>
        )}
        
        {/* Lista de plataformas con iconos (máximo 3) */}
        {game.platforms && (
          <div className="game-platforms">
            {game.platforms.slice(0, 3).map(platform => (
              <span key={platform.platform.id} className="platform-icon">
                {getPlatformIcon(platform.platform.slug)}
              </span>
            ))}
            {game.platforms.length > 3 && <span>+{game.platforms.length - 3}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

// Función auxiliar que devuelve el emoji correspondiente a cada plataforma
const getPlatformIcon = (slug) => {
  if (slug.includes('playstation')) return '🎮';
  if (slug.includes('xbox')) return '🎮';
  if (slug.includes('pc')) return '💻';
  if (slug.includes('nintendo') || slug.includes('switch')) return '🎮';
  if (slug.includes('ios')) return '📱';
  if (slug.includes('android')) return '📱';
  return '🎮';
};

export default GameCard;