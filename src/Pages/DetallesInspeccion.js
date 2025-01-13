import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, Text } from '@mantine/core';
import { 
  IconBuilding, 
  IconMapPin, 
  IconClipboardList,
  IconCalendar,
  IconUser,
  IconAlertTriangle,
  IconChecks
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesInspeccion.css';
import axios from 'axios';
import { INSPECTION_ENDPOINTS, USER_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const DetallesInspeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inspeccion, setInspeccion] = useState(null);
  const [inspector, setInspector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInspeccionDetails();
  }, [id]);

  const fetchInspectorDetails = async (inspectorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        USER_ENDPOINTS.GET_BY_ID(inspectorId),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setInspector(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del inspector:', error);
    }
  };

  const fetchInspeccionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        INSPECTION_ENDPOINTS.GET_BY_ID(id),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setInspeccion(response.data);
      if (response.data.idAdminInspector) {
        await fetchInspectorDetails(response.data.idAdminInspector);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener detalles de la inspección:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los detalles de la inspección',
        color: 'red'
      });
      setLoading(false);
    }
  };

  const getPrioridadText = (prioridad) => {
    switch(prioridad) {
      case 1: return 'Alta';
      case 2: return 'Media';
      case 3: return 'Baja';
      default: return 'No definida';
    }
  };

  const inspeccionDetails = inspeccion ? [
    {
      label: "Código de Inspección",
      value: `IN${inspeccion.idInspeccion}`,
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: inspeccion.idEstablecimientoNavigation?.nombre || 'Sin nombre',
      icon: <IconBuilding size={16} />
    },
    {
      label: "Dirección",
      value: inspeccion.idEstablecimientoNavigation?.direccion || 'Sin dirección',
      icon: <IconMapPin size={16} />
    },
    {
      label: "Coordenadas del Establecimiento",
      value: inspeccion.idEstablecimientoNavigation?.coordenadas || 'Sin coordenadas',
      icon: <IconMapPin size={16} />
    },
    {
      label: "Tipo de Establecimiento",
      value: inspeccion.idEstablecimientoNavigation?.tipoOperacion || 'No especificado',
      icon: <IconBuilding size={16} />
    },
    {
      label: "Fecha de solicitud",
      value: inspeccion.fechaCreacion ? new Date(inspeccion.fechaCreacion).toLocaleDateString('es-ES') : 'No disponible',
      icon: <IconCalendar size={16} />
    },
    {
      label: "Prioridad",
      value: getPrioridadText(inspeccion.prioridad),
      icon: <IconAlertTriangle size={16} />
    },
    {
      label: "Inspector Asignado",
      value: inspector ? inspector.nombre : 'Sin asignar',
      icon: <IconUser size={16} />
    },
    {
      label: "Fecha de Inspección",
      value: new Date(inspeccion.fechaInspeccion).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: <IconCalendar size={16} />
    }
  ] : [];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalles-inspeccion">
      <Header />
      <Menu />
      <div className="detalles-content">
        <div className="content-header">
          <h1>Inspecciones</h1>
          <Button
            color="red"
            variant="filled"
            className="evaluar-button"
            onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
          >
            Evaluar
          </Button>
        </div>

        <div className="content-wrapper">
          <div className="main-details">
            <CardDetails 
              title="Detalles de Inspección"
              details={inspeccionDetails}
              icon={<IconClipboardList size={24} stroke={1.5} />}
            />
          </div>

          <div className="resultados-section">
            <Paper shadow="sm" radius="md" className="resultados-card">
              <div className="resultados-header">
                <IconChecks size={24} stroke={1.5} />
                <h2>Resultados de Inspección</h2>
              </div>
              
              {inspeccion?.resultado ? (
                <div className="resultados-content">
                  {/* Aquí mostrarías los resultados de la inspección */}
                  <Text>Resultado: {inspeccion.resultado}</Text>
                </div>
              ) : (
                <div className="no-resultados">
                  <Text color="dimmed" align="center">
                    No hay resultados disponibles aún.
                    <br />
                    Realice la evaluación para ver los resultados.
                  </Text>
                </div>
              )}
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesInspeccion;
