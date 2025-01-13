import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Group, 
    Avatar, 
    Menu, 
    UnstyledButton, 
    Text 
} from '@mantine/core';
import { IconChevronDown, IconUser, IconLogout } from '@tabler/icons-react';
import '../Estilos/Header.css';
import Logo from '../Imagenes/LogoSICR.png';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpened, setMenuOpened] = useState(false);
    
    useEffect(() => {
        const authData = localStorage.getItem('userData');
        console.log('Datos en localStorage:', authData);
        if (authData) {
            const parsedData = JSON.parse(authData);
            console.log('Datos parseados:', parsedData);
            console.log('Usuario:', parsedData.user);
            console.log('Role:', parsedData.role);
        }
    }, []);

    // Obtener datos del usuario del localStorage
    const authData = JSON.parse(localStorage.getItem('userData') || '{}');
    const user = authData.user || {};

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <img 
                    src={Logo} 
                    alt="SICR Logo" 
                    className="logo-image"
                />
            </div>

            <div className="header-actions">
                <Menu
                    width={200}
                    position="bottom-end"
                    transitionProps={{ transition: 'pop-top-right' }}
                    opened={menuOpened}
                    onChange={setMenuOpened}
                >
                    <Menu.Target>
                        <UnstyledButton className="user-button">
                            <Group spacing="xs">
                                <Avatar 
                                    size="md"
                                    color="red"
                                    radius="xl"
                                >
                                    {user.nombre?.charAt(0) || 'U'}
                                </Avatar>
                                <div className="user-info">
                                    <Text size="sm" weight={500}>{user.nombre || 'Usuario'}</Text>
                                    <Text size="xs" color="dimmed">{user.rol || 'Sin rol'}</Text>
                                </div>
                                <IconChevronDown size={16} />
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            icon={<IconUser size={14} />}
                            onClick={() => navigate('/mi-perfil')}
                        >
                            Mi Perfil
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconLogout size={14} />}
                            onClick={handleLogout}
                            color="red"
                        >
                            Cerrar sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </header>
    );
}

export default Header;

