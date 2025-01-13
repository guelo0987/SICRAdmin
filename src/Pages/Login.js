import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Stack,
    Image,
    Alert,
    Title
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../Api/Endpoints';
import '../Estilos/Login.css';
import LogoSICR from '../Imagenes/LogoSICR.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Mail: '',
        Password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Datos a enviar:', formData);

            const response = await axios.post(AUTH_ENDPOINTS.LOGIN, formData);
            const data = response.data;
            console.log('Respuesta del servidor:', data);
            
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Error detallado:', error.response?.data);
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Paper className="login-card" radius="md" p="xl" withBorder>
                <div className="logo-container">
                    <Image
                        src={LogoSICR}
                        alt="SICR Logo"
                        width={200}
                    />
                </div>

                {error && (
                    <Alert 
                        icon={<IconAlertCircle size={16} />} 
                        title="Error" 
                        color="red" 
                        mb="md"
                    >
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack spacing="md">
                        <TextInput
                            label="Correo Electrónico"
                            placeholder="tu@email.com"
                            value={formData.Mail}
                            onChange={(e) => setFormData({...formData, Mail: e.target.value})}
                            required
                            disabled={loading}
                        />

                        <PasswordInput
                            label="Contraseña"
                            placeholder="Tu contraseña"
                            value={formData.Password}
                            onChange={(e) => setFormData({...formData, Password: e.target.value})}
                            required
                            disabled={loading}
                        />

                        <Button 
                            type="submit" 
                            color="red"
                            fullWidth
                            loading={loading}
                        >
                            Iniciar Sesión
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
};

export default Login; 