import axios from 'axios';

// Definición de las variables de entorno y URL base
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Creación de la instancia de axios con la configuración base
const rawgApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
});

/**
 * Obtiene los juegos mejor valorados según Metacritic
 * @param {number} page - Número de página
 * @param {object} filters - Filtros adicionales
 * @returns {object} - Datos de los juegos
 */
export const getTopGames = async (page = 1, filters = {}) => {
  try {
    // Validación del número de página
    const validPage = (!page || isNaN(parseInt(page))) ? 1 : parseInt(page);
    
    const response = await rawgApi.get('/games', {
      params: {
        ordering: '-metacritic', // Ordenar por puntuación de Metacritic (descendente)
        page: validPage,
        page_size: 20, // 20 juegos por página
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top games:', error);
    throw error;
  }
};

/**
 * Busca juegos por término de búsqueda
 * @param {string} query - Término de búsqueda
 * @param {number} page - Número de página
 * @param {object} filters - Filtros adicionales
 * @returns {object} - Resultados de la búsqueda
 */
export const searchGames = async (query, page = 1, filters = {}) => {
  try {
    // Validación del número de página
    const validPage = (!page || isNaN(parseInt(page))) ? 1 : parseInt(page);
    
    const response = await rawgApi.get('/games', {
      params: {
        search: query, // Término de búsqueda
        page: validPage,
        page_size: 20, // 20 juegos por página
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un juego específico
 * @param {number} id - ID del juego
 * @returns {object} - Detalles del juego
 */
export const getGameDetails = async (id) => {
  try {
    const response = await rawgApi.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

/**
 * Obtiene los trailers de un juego
 * @param {number} id - ID del juego
 * @returns {array} - Lista de trailers
 */
export const getGameTrailers = async (id) => {
  try {
    const response = await rawgApi.get(`/games/${id}/movies`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching game trailers:', error);
    return []; // Devuelve array vacío en caso de error
  }
};

/**
 * Obtiene capturas de pantalla de un juego
 * @param {number} id - ID del juego
 * @returns {array} - Lista de capturas de pantalla
 */
export const getGameScreenshots = async (id) => {
  try {
    const response = await rawgApi.get(`/games/${id}/screenshots`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    return []; // Devuelve array vacío en caso de error
  }
};

/**
 * Obtiene todas las opciones de filtrado disponibles
 * @returns {object} - Objeto con listas de géneros, plataformas, etiquetas y desarrolladores
 */
export const getFilters = async () => {
  try {
    // Peticiones paralelas para obtener todos los filtros
    const [genres, platforms, tags, developers] = await Promise.all([
      rawgApi.get('/genres'),
      rawgApi.get('/platforms'),
      rawgApi.get('/tags'),
      rawgApi.get('/developers')
    ]);
    
    return {
      genres: genres.data.results,
      platforms: platforms.data.results,
      tags: tags.data.results,
      developers: developers.data.results
    };
  } catch (error) {
    console.error('Error fetching filters:', error);
    return {
      genres: [],
      platforms: [],
      tags: [],
      developers: []
    };
  }
};