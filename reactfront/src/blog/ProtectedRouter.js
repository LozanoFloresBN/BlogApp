import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Acceso denegado',
            text: 'Necesita ingresar primero sus credenciales para acceder a la página',
        });
        return <Navigate to="/acceso" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
