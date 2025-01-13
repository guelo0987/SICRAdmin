import React, { useEffect, useState } from 'react';
import { 
    Paper, 
    Title, 
    Text, 
    Avatar, 
    Stack,
    Group,
    Badge,
    Table
} from '@mantine/core';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/MiPerfil.css';

const MiPerfil = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        console.log('Datos del usuario:', storedUserData);
        setUserData(storedUserData);
    }, []);

    const user = userData?.user || {};

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
                                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                                </Avatar>
                                <div>
                                    <Text size="xl" weight={500}>
                                        {user.nombre || 'Usuario'}
                                    </Text>
                                    <Badge 
                                        color="red" 
                                        variant="light"
                                        size="lg"
                                    >
                                        {userData?.role || 'Admin'}
                                    </Badge>
                                </div>
                            </Group>
                            <Badge 
                                color="green"
                                variant="dot"
                                size="lg"
                            >
                                ACTIVO
                            </Badge>
                        </Group>

                        <Table>
                            <tbody>
                                <tr>
                                    <td><Text weight={500}>ID:</Text></td>
                                    <td>{user.id || '-'}</td>
                                </tr>
                                <tr>
                                    <td><Text weight={500}>Correo Electrónico:</Text></td>
                                    <td>{user.email || '-'}</td>
                                </tr>
                                <tr>
                                    <td><Text weight={500}>Rol:</Text></td>
                                    <td>{userData?.role || '-'}</td>
                                </tr>
                                <tr>
                                    <td><Text weight={500}>Teléfono:</Text></td>
                                    <td>{user.telefono || '-'}</td>
                                </tr>
                                <tr>
                                    <td><Text weight={500}>Dirección:</Text></td>
                                    <td>{user.direccion || '-'}</td>
                                </tr>
                                <tr>
                                    <td><Text weight={500}>Fecha de Ingreso:</Text></td>
                                    <td>{user.fechaIngreso || '-'}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default MiPerfil; 