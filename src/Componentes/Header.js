import React from 'react';
import { 
  Menu, 
  Avatar, 
  UnstyledButton,
  Group,
  Text
} from '@mantine/core';
import { 
  IconUser, 
  IconSettings, 
  IconLogout,
  IconUserCircle,
  IconChevronDown
} from '@tabler/icons-react';
import '../Estilos/Header.css';
import Logo from '../Imagenes/LogoSICR.png';

const Header = () => {
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
          position="bottom-end"
          shadow="md"
          width={200}
        >
          <Menu.Target>
            <UnstyledButton className="user-button">
              <Group spacing="xs">
                <Avatar 
                  size="md"
                  color="red"
                  className="user-avatar"
                  radius="xl"
                >
                  <IconUserCircle size={24} />
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
            <Menu.Item icon={<IconUser size={14} />}>
              Mi Perfil
            </Menu.Item>
            <Menu.Item icon={<IconSettings size={14} />}>
              Configuración
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
              icon={<IconLogout size={14} />}
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

