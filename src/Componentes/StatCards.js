import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Estilos/StatCards.css';
import { 
  IconClockExclamation,
  IconClipboardCheck,
  IconClipboardList,
  IconAlertTriangle
} from '@tabler/icons-react';
import { INSPECTION_ENDPOINTS, SOLICITUD_ENDPOINTS, ESTABLISHMENT_ENDPOINTS } from '../Api/Endpoints';
import axios from 'axios';

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
  const [totalInspecciones, setTotalInspecciones] = useState(0);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0);
  const [establecimientosRiesgoAlto, setEstablecimientosRiesgoAlto] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        // Obtener inspecciones
        const inspResponse = await axios.get(INSPECTION_ENDPOINTS.GET_ALL, { headers });
        setTotalInspecciones(inspResponse.data.length);

        // Obtener solicitudes
        const solResponse = await axios.get(SOLICITUD_ENDPOINTS.GET_ALL, { headers });
        const pendientes = solResponse.data.filter(sol => 
          !sol.fechaAprobada && sol.estadoSolicitud === 'En espera'
        ).length;
        setSolicitudesPendientes(pendientes);

        // Obtener establecimientos
        const estResponse = await axios.get(ESTABLISHMENT_ENDPOINTS.GET_ALL, { headers });
        const riesgoAlto = estResponse.data.filter(est => 
          est.riesgo === 'Alto'
        ).length;
        setEstablecimientosRiesgoAlto(riesgoAlto);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Solicitudes Pendientes',
      value: solicitudesPendientes.toString(),
      color: '#FF6B6B',
      icon: <IconClockExclamation />,
      percentage: '+8%'
    },
    {
      title: 'Inspecciones Completadas',
      value: totalInspecciones.toString(),
      color: '#4CAF50',
      icon: <IconClipboardCheck />,
      percentage: '+12%'
    },
    {
      title: 'Alertas',
      value: totalInspecciones.toString(),
      color: '#2196F3',
      icon: <IconClipboardList />,
      percentage: '+5%'
    },
    {
      title: 'Establecimientos con Riesgo Alto',
      value: establecimientosRiesgoAlto.toString(),
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
