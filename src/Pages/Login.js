import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Stack,
    Image
} from '@mantine/core';
import '../Estilos/Login.css';
import LogoSICR from '../Imagenes/LogoSICR.png'; 

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        navigate('/dashboard');
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

                <form onSubmit={handleSubmit}>
                    <Stack spacing="md">
                        <TextInput
                            label="Correo Eléctronico"
                            placeholder="Dirección de correo eléctronico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />

                        <PasswordInput
                            label="Contraseña"
                            placeholder="Tu contraseña"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />

                        <Button 
                            type="submit" 
                            color="red"
                            fullWidth
                            styles={{
                                root: {
                                    backgroundColor: '#D94A3D',
                                    '&:hover': {
                                        backgroundColor: '#bf4236'
                                    }
                                }
                            }}
                        >
                            Ingresar
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
};

export default Login; 