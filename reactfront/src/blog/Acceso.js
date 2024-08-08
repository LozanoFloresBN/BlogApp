import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerificationModal from './VerificationModal';
import Swal from 'sweetalert2';

const URI_LOGIN = 'http://localhost:8080/users/login';
const URI_VERIFY = 'http://localhost:8080/users/verify-code';

const CompLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URI_LOGIN, { email, password });
  
      if (response.data.requiresVerification) {
        setRequiresVerification(true);
        setIsOpenModal(true);
      } else {
        handleSuccessfulLogin(response.data);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleVerify = async (code) => {
    try {
      const response = await axios.post(URI_VERIFY, { email, code });
      if (response.status === 200) {
        handleSuccessfulLogin(response.data);
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
    }
  };

  const handleSuccessfulLogin = async (data) => {
    const { token, username } = data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // eslint-disable-next-line no-undef
    await Swal.fire({
      icon: 'success',
      title: `Bienvenido ${username}`,
      text: 'Inicio de sesión exitoso',
    });
    navigate('/blogs');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {isOpenModal && requiresVerification && (
  <VerificationModal
    show={isOpenModal}
    handleClose={() => setIsOpenModal(false)}
    handleVerify={handleVerify}
    email={email}
  />
)}
    </div>
  );
};

export default CompLogin;






