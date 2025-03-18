# RAWG Game Explorer

## Descripción
RAWG Game Explorer es una aplicación web que te permite explorar el extenso catálogo de videojuegos disponibles a través de la API de RAWG. Con esta aplicación, puedes buscar juegos, filtrarlos por plataforma y género, y ver información detallada de cada título.

## Características
- ✨ **Búsqueda de juegos:** Encuentra cualquier juego por su nombre.
- 🔍 **Filtrado avanzado:** Filtra juegos por plataformas y géneros.
- 📝 **Vista detallada:** Accede a información completa sobre cada juego.
- 🖥️ **Diseño responsive:** Experiencia óptima en dispositivos móviles y escritorio.

## Tecnologías utilizadas
- **React.js**
- **React Router**
- **Chakra UI**
- **Axios**
- **API de RAWG**

### Bibliotecas adicionales
- **React Query:** Gestiona el estado de las peticiones a la API, brindando caché automática y reduciendo la cantidad de llamadas al servidor.
- **React Icons:** Agrega iconos visualmente atractivos para mejorar la experiencia de usuario.
- **Framer Motion:** Implementa animaciones fluidas para mejorar la interacción.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Zaak-Dev/rawg-game-explorer.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd rawg-game-explorer
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env` en la raíz del proyecto y añade tu API key de RAWG:
   ```bash
   REACT_APP_API_KEY=tu_api_key_aqui
   ```
5. Inicia la aplicación:
   ```bash
   npm start
   ```

## Uso
- En la página principal, utiliza la barra de búsqueda para encontrar juegos por nombre.
- Usa los filtros de plataforma y género para refinar los resultados.
- Haz clic en cualquier juego para ver sus detalles completos.

## Estructura del proyecto
```
src/
│
├── components/       # Componentes reutilizables
├── hooks/           # Custom hooks
├── pages/           # Páginas principales de la aplicación
├── services/        # Servicios para comunicación con la API
├── utils/           # Funciones utilitarias
└── App.js           # Componente raíz
```

## Despliegue
La aplicación está desplegada en **Vercel** y puedes acceder a ella en:
[https://rawg-game-explorer.vercel.app](https://rawg-game-explorer.vercel.app)

## Autor
**Diego Sáez** / [ZakkDev](https://github.com/Zaak-Dev)

## Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Futuras mejoras
- ✨ Implementación de autenticación de usuarios.
- 🎮 Sistema de guardado de juegos favoritos.
- 📈 Vista de tendencias y novedades.
- 📚 Integración con otras APIs para información adicional.
- 📚 Mejoras en el front end y funcionalidad general de la app.

---
⭐ **Si te gusta este proyecto, no dudes en darle una estrella!**
