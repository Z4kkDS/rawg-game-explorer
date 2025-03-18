import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para manejar el click en el logo o en el botón de inicio
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // Si ya estamos en la página principal, refrescamos la página
      window.location.reload();
    } else {
      // Si no, navegamos a la página principal
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo con funcionalidad de regreso al inicio */}
        <div 
          className="logo" 
          onClick={handleHomeClick} 
          style={{ cursor: 'pointer' }}
        >
          RAWG Game Explorer
        </div>
        
        <nav className="nav">
          {/* Botón de inicio con la misma funcionalidad */}
          <button 
            className="nav-link" 
            onClick={handleHomeClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Inicio
          </button>
          {/* Otros enlaces de navegación pueden ir aquí */}
        </nav>
      </div>
    </header>
  );
};

export default Header;