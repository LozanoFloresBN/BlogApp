import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const URI = 'http://localhost:8080/users/'
const CompRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI, { username, email, password });
            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido registrada con éxito.',
                icon: 'success',
                confirmButtonText: 'OK',
                Timer: 5000
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    title: 'Error',
                    text: 'La cuenta ya existe.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al registrar la cuenta.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-5">
                            <h1 className="text-center mb-4">Create your account</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                    <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/')}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CompRegister;