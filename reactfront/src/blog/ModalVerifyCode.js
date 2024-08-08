import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ModalVerifyCode = ({ isOpen, onClose, onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    try {
      await onVerify(code);
    } catch (error) {
      setError(error.response?.data?.message || 'Código de verificación incorrecto');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <h2>Verificación de Código</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de verificación"
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleVerify}>Verificar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalVerifyCode;