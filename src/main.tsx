import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import App from './App';
import './index.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

if (!navigator.geolocation) {
  // eslint-disable-next-line no-alert
  alert('Tu navegador no tiene opción de Geolocalización');
  throw new Error('Tu navegador no tiene opción de Geolocalización');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
