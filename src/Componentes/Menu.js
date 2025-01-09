import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  IconDashboard, 
  IconFileDescription, 
  IconBuilding, 
  IconClipboardList,
  IconChartBar,
  IconGavel,
  IconUsers,
  IconLogout 
} from '@tabler/icons-react';
import '../Estilos/Menu.css';

const MenuItem = ({ icon, text, to }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <NavLink to={to} className="menu-item">
        {icon}
        <span>{text}</span>
      </NavLink>
    </motion.div>
  );
};

const Menu = () => {
  const menuItems = [
    { icon: <IconDashboard />, text: 'Dashboard', to: '/dashboard' },
    { icon: <IconFileDescription />, text: 'Solicitudes', to: '/solicitudes' },
    { icon: <IconBuilding />, text: 'Establecimientos', to: '/establecimientos' },
    { icon: <IconClipboardList />, text: 'Inspecciones', to: '/inspecciones' },
    { icon: <IconChartBar />, text: 'Resultados', to: '/resultados' },
    { icon: <IconGavel />, text: 'Sanciones', to: '/sanciones' },
  ];

  return (
    <motion.div 
      className="menu-container"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="menu-header">
        <h2>Dashboard</h2>
      </div>

      <div className="menu-items">
        {menuItems.map((item, index) => (
          <MenuItem 
            key={index} 
            icon={item.icon} 
            text={item.text} 
            to={item.to}
          />
        ))}
      </div>

      <div className="menu-footer">
        <MenuItem 
          icon={<IconUsers />} 
          text="Usuarios" 
          to="/usuarios"
        />
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button className="logout-button">
            <IconLogout />
            <span>Cerrar sesión</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Menu;
