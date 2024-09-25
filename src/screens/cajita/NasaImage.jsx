import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cajita.css';

const NasaImage = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // Estado para la fecha seleccionada
  const [loading, setLoading] = useState(false); // Estado para mostrar el loading

  const fetchImage = async (date) => {
    setLoading(true); // Mostrar el loading al iniciar la carga
    setImageData(null); // Limpiar la imagen actual
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=SqbQDAZeJOgP5NKhdoKSpbFF5YPiHIcO6dW5dyea&date=${date}`
      );
      setImageData(response.data);
      setLoading(false); // Ocultar el loading al terminar la carga
    } catch (err) {
      setError('Error al obtener la imagen de la NASA');
      setLoading(false); // Ocultar el loading en caso de error
    }
  };

  useEffect(() => {
    // Cargar la imagen del día actual al cargar la página
    fetchImage('');
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFetchImage = () => {
    if (selectedDate) {
      fetchImage(selectedDate);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* Header con el título */}
      <header className="header">
        <h1>NASA's Astronomy Picture of the Day</h1>
      </header>


      {/* Título para seleccionar la fecha */}
      <div className="date-picker-title">Select a date</div>

      {/* Selección de fecha y botón */}
      <div className="date-picker">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]} // No permitir seleccionar fechas futuras
        />
        <div className="galaxy-button">
          <button className="space-button" onClick={handleFetchImage}>
            <span className="backdrop"></span>
            <span className="galaxy"></span>
            <label className="text">Launch Image</label>
          </button>
          <div className="bodydrop"></div>
        </div>
      </div>

      {/* Mostrar loading si está cargando */}
      {loading && <div className="loading">Loading...</div>}

      {/* Contenido principal con columnas */}
      {!loading && imageData && (
        <div className="content">
          <div className="card">
            <div className="text-content">
              <h2>{imageData.title}</h2>
              <p>{imageData.explanation}</p>
              <p className="date">Fecha: {imageData.date}</p>
            </div>
          </div>
          <div className="image-content">
            <img src={imageData.url} alt={imageData.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NasaImage;
