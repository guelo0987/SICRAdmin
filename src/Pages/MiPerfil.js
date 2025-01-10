import React from 'react';
import { 
    Paper, 
    Title, 
    Text, 
    Avatar, 
    Stack,
    Group,
    Badge
} from '@mantine/core';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/MiPerfil.css';

const MiPerfil = () => {
    // Estos datos vendrían de tu sistema de autenticación
    const userData = {
        nombre: 'Moni Roy',
        rol: 'Admin',
        email: 'moni.roy@ejemplo.com',
        telefono: '+506 8888-8888',
        direccion: 'San José, Costa Rica',
        fechaIngreso: '01/01/2024',
        estado: 'Activo'
    };

    return (
        <div className="mi-perfil">
            <Header />
            <Menu />
            <div className="perfil-content">
                <Title order={2} mb="xl">Mi Perfil</Title>

                <Paper shadow="sm" radius="md" p="xl">
                    <Stack spacing="xl">
                        <Group position="apart">
                            <Group>
                                <Avatar 
                                    size={80} 
                                    radius={40} 
                                    color="red"
                                >
                                    {userData.nombre.charAt(0)}
                                </Avatar>
                                <div>
                                    <Text size="xl" weight={500}>{userData.nombre}</Text>
                                    <Badge 
                                        color="red" 
                                        variant="light"
                                        size="lg"
                                    >
                                        {userData.rol}
                                    </Badge>
                                </div>
                            </Group>
                            <Badge 
                                color={userData.estado === 'Activo' ? 'green' : 'gray'}
                                variant="dot"
                                size="lg"
                            >
                                {userData.estado}
                            </Badge>
                        </Group>

                        <Stack spacing="md">
                            <Group spacing="xl">
                                <Stack spacing="xs" style={{ flex: 1 }}>
                                    <Text size="sm" color="dimmed">Correo Electrónico</Text>
                                    <Text>{userData.email}</Text>
                                </Stack>
                                <Stack spacing="xs" style={{ flex: 1 }}>
                                    <Text size="sm" color="dimmed">Teléfono</Text>
                                    <Text>{userData.telefono}</Text>
                                </Stack>
                            </Group>

                            <Stack spacing="xs">
                                <Text size="sm" color="dimmed">Dirección</Text>
                                <Text>{userData.direccion}</Text>
                            </Stack>

                            <Stack spacing="xs">
                                <Text size="sm" color="dimmed">Fecha de Ingreso</Text>
                                <Text>{userData.fechaIngreso}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default MiPerfil; 