import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_RESEND_CODE = 'http://localhost:8080/users/resend';

// eslint-disable-next-line react/prop-types
const VerificationModal = ({ show, handleClose, handleVerify, email }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(URI_RESEND_CODE, { email });
            Swal.fire({
                icon: 'success',
                title: 'Código reenviado',
                text: response.data.message || 'El código de verificación ha sido reenviado a tu correo electrónico',
            });
        } catch (error) {
            console.error('Error al reenviar el código:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'No se pudo reenviar el código',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Código inválido',
                text: 'El código debe tener 6 caracteres',
            });
            return;
        }
        handleVerify(code);
    };

    return (
        <Modal show={show} onHide={handleClose} centered aria-labelledby="verification-modal-title">
            <Modal.Header closeButton className="border-0">
                <Modal.Title id="verification-modal-title" className="w-100 text-center">Verificación de Código</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <p className="text-muted text-center mb-4">
                    Por favor, ingresa el código de verificación que hemos enviado a tu correo electrónico.
                </p>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Ingresa el código"
                            required
                            maxLength={6}
                            className="text-center"
                            aria-label="Código de verificación"
                        />
                    </InputGroup>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Verificar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0 justify-content-center">
                <Button 
                    variant="link" 
                    onClick={handleResendCode} 
                    className="text-muted"
                    disabled={isLoading}
                >
                    <FaEnvelope className="me-2" />
                    {isLoading ? 'Reenviando...' : 'Reenviar Código'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VerificationModal;





