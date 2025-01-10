import React, { useState } from 'react';
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
                                    MR
                                </Avatar>
                                <div className="user-info">
                                    <Text size="sm" weight={500}>Moni Roy</Text>
                                    <Text size="xs" color="dimmed">Admin</Text>
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
                            onClick={() => navigate('/login')}
                            color="red"
                        >
                            Cerrar sesión
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </header>
    );
};

export default Header;

