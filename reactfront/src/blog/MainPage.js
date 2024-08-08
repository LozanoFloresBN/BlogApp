// src/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/loggin');
  };

  const handleAccesoClick = () => {
    navigate('/acceso');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <button onClick={handleLoginClick} style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
      <button onClick={handleAccesoClick} style={{ margin: '10px', padding: '10px 20px' }}>Acceso</button>
    </div>
  );
}

export default MainPage;
