import React from 'react';
import { motion } from 'framer-motion';
import '../Estilos/StatCards.css';
import { 
  IconClockExclamation,
  IconClipboardCheck,
  IconClipboardList,
  IconAlertTriangle
} from '@tabler/icons-react';

const StatCard = ({ icon, title, value, color }) => {
  return (
    <motion.div 
      className="stat-card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-icon" style={{ background: `${color}15` }}>
        {icon}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </motion.div>
  );
};

const StatCards = () => {
  const stats = [
    {
      title: 'Solicitudes Pendientes',
      value: '12',
      color: '#FF6B6B',
      icon: <IconClockExclamation />,
      percentage: '+8%'
    },
    {
      title: 'Inspecciones Completadas',
      value: '45',
      color: '#4CAF50',
      icon: <IconClipboardCheck />,
      percentage: '+12%'
    },
    {
      title: 'Inspecciones en Proceso',
      value: '8',
      color: '#2196F3',
      icon: <IconClipboardList />,
      percentage: '+5%'
    },
    {
      title: 'Establecimientos con Observaciones',
      value: '3',
      color: '#FFA726',
      icon: <IconAlertTriangle />,
      percentage: '-2%'
    }
  ];

  return (
    <div className="stat-cards-container">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatCards;
