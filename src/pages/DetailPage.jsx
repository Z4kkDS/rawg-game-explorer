import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameDetails, getGameTrailers, getGameScreenshots } from '../api/rawgApi';
import Loader from '../components/Loader';
import TrailerModal from '../components/TrailerModal';
import '../styles/components/DetailPage.css';

// Componente principal que muestra los detalles de un juego
const DetailPage = () => {
  // Obtiene el ID del juego de los parámetros de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados para manejar la información del juego, trailers y capturas de pantalla
  const [game, setGame] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  
  // Efecto para cargar los datos del juego cuando el componente se monta
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        
        // Realiza múltiples peticiones en paralelo
        const [gameData, trailersData, screenshotsData] = await Promise.all([
          getGameDetails(id),
          getGameTrailers(id),
          getGameScreenshots(id)
        ]);
        
        setGame(gameData);
        setTrailers(trailersData);
        setScreenshots(screenshotsData);
      } catch (err) {
        setError('Error al cargar los detalles del juego. Por favor, inténtalo de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameData();
  }, [id]);
  
  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!game) return <div className="error-message">Juego no encontrado</div>;
  
  // Funciones para manejar la visualización del trailer
  const openTrailer = (trailer) => {
    setSelectedTrailer(trailer);
  };
  
  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  const fallbackImage = "https://via.placeholder.com/1200x600?text=No+Image+Available";
  
  return (
    <div className="game-detail-page">
      <button 
        className="back-button" 
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>
      
      <div className="game-detail-header">
        <div className="game-cover">
          <img 
            src={game.background_image || fallbackImage} 
            alt={`Portada de ${game.name}`} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>
        
        <div className="game-info">
          <h1>{game.name}</h1>
          
          <div className="game-meta">
            <div className="metacritic">
              <span className="label">Metacritic:</span>
              <span className={`score ${game.metacritic > 75 ? 'high' : game.metacritic > 60 ? 'medium' : 'low'}`}>
                {game.metacritic || 'N/A'}
              </span>
            </div>
            
            <div className="release-date">
              <span className="label">Fecha de lanzamiento:</span>
              <span>{new Date(game.released).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="game-genres">
            <span className="label">Géneros:</span>
            <div className="tags-container">
              {game.genres.map(genre => (
                <span key={genre.id} className="tag">{genre.name}</span>
              ))}
            </div>
          </div>
          
          <div className="game-platforms">
            <span className="label">Plataformas:</span>
            <div className="tags-container">
              {game.platforms.map(platform => (
                <span key={platform.platform.id} className="tag">
                  {platform.platform.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="game-developers">
            <span className="label">Desarrolladores:</span>
            <div className="tags-container">
              {game.developers.map(dev => (
                <span key={dev.id} className="tag">{dev.name}</span>
              ))}
            </div>
          </div>
          
          <div className="game-publishers">
            <span className="label">Distribuidores:</span>
            <div className="tags-container">
              {game.publishers.map(pub => (
                <span key={pub.id} className="tag">{pub.name}</span>
              ))}
            </div>
          </div>
          
          {game.website && (
            <div className="game-website">
              <span className="label">Sitio web:</span>
              <a href={game.website} target="_blank" rel="noopener noreferrer">
                {game.website}
              </a>
            </div>
          )}
        </div>
      </div>
      
      <div className="game-description">
        <h2>Descripción</h2>
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>
      
      {trailers.length > 0 && (
        <div className="game-trailers">
          <h2>Trailers</h2>
          <div className="trailers-container">
            {trailers.map(trailer => (
              <div 
                key={trailer.id} 
                className="trailer-thumbnail"
                onClick={() => openTrailer(trailer)}
              >
                <img 
                  src={trailer.preview} 
                  alt={trailer.name} 
                />
                <div className="play-icon">▶</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {screenshots.length > 0 && (
        <div className="game-screenshots">
          <h2>Capturas de pantalla</h2>
          <div className="screenshots-container">
            {screenshots.map(screenshot => (
              <div key={screenshot.id} className="screenshot">
                <img 
                  src={screenshot.image} 
                  alt={`Captura de ${game.name}`} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedTrailer && (
        <TrailerModal 
          trailer={selectedTrailer} 
          onClose={closeTrailer} 
        />
      )}
    </div>
  );
};

export default DetailPage;