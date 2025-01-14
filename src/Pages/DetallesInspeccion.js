import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, Text, Badge, Stack, Title, Group } from '@mantine/core';
import { 
  IconBuilding, 
  IconMapPin, 
  IconClipboardList,
  IconCalendar,
  IconUser,
  IconAlertTriangle,
  IconChecks,
  IconCheck
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesInspeccion.css';
import axios from 'axios';
import { INSPECTION_ENDPOINTS, RESULTADO_ENDPOINTS, USER_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const DetallesInspeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inspeccion, setInspeccion] = useState(null);
  const [inspector, setInspector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      setLoading(true);
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
    } catch (error) {
      console.error('Error al obtener detalles de la inspección:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los detalles de la inspección',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspeccionDetails();
  }, [id]);

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

  const handleFinalizarInspeccion = async () => {
    try {
        setSaving(true);
        const token = localStorage.getItem('token');

        // Determinar si es una inspección aleatoria o de solicitud
        const endpoint = inspeccion.idSolicitud ? 
            RESULTADO_ENDPOINTS.FINALIZAR_INSPECCION(id) : 
            RESULTADO_ENDPOINTS.FINALIZAR_INSPECCION_ALEATORIA(id);

        const response = await axios.post(
            endpoint,
            { idInspeccion: parseInt(id) },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        notifications.show({
            title: 'Éxito',
            message: response.data.Mensaje,
            color: 'green'
        });

        // Recargar los datos de la inspección
        fetchInspeccionDetails();
    } catch (error) {
        console.error('Error al finalizar inspección:', error);
        notifications.show({
            title: 'Error',
            message: error.response?.data || 'No se pudo finalizar la inspección',
            color: 'red'
        });
    } finally {
        setSaving(false);
    }
  };

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
          <Group>
            {inspeccion && !inspeccion.fueEvaluada ? (
              <Button
                color="red"
                variant="filled"
                className="evaluar-button"
                onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
              >
                Evaluar
              </Button>
            ) : inspeccion?.resultado === "En Revision" ? (
              <Button
                color="yellow"
                leftIcon={<IconCheck size={16} />}
                loading={saving}
                onClick={handleFinalizarInspeccion}
              >
                Finalizar Inspección
              </Button>
            ) : (
              <Badge 
                color="gray"
                variant="light"
                size="lg"
              >
                Inspección ya finalizada
              </Badge>
            )}
          </Group>
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
              
              {inspeccion?.fueEvaluada ? (
                <div className="resultados-content" style={{ textAlign: 'center', padding: '20px' }}>
                  <Stack spacing="md" align="center">
                    <Title order={3}>Estado de la Inspección</Title>
                    <Badge 
                      size="xl" 
                      radius="md"
                      color={inspeccion.resultado === "Cumple" ? "green" : 
                             inspeccion.resultado === "No Cumple" ? "red" : "yellow"}
                      variant="filled"
                      style={{ padding: '15px 25px' }}
                    >
                      {inspeccion.resultado}
                    </Badge>
                    {inspeccion.resultado === "Cumple" && (
                      <Text color="dimmed" size="sm">
                        Se ha creado un nuevo establecimiento en el sistema
                      </Text>
                    )}
                  </Stack>
                </div>
              ) : (
                <div className="no-resultados" style={{ textAlign: 'center', padding: '30px' }}>
                  <Stack spacing="md" align="center">
                    <Text color="dimmed" size="lg">
                      Esta inspección aún no ha sido evaluada
                    </Text>
                    <Text color="dimmed" size="sm">
                      Realice la evaluación para ver los resultados
                    </Text>
                  </Stack>
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
