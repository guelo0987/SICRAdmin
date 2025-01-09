import React from 'react';
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

const DetallesInspeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inspeccionDetails = [
    {
      label: "Código de Inspección",
      value: id,
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: "Matadero La Esperanza",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Dirección",
      value: "Calle Ficticia 123, Ciudad",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Coordenadas del Establecimiento",
      value: "40° 24' 59\" N, 03° 42' 09\" O",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Tipo de Establecimiento",
      value: "Matadero",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Fecha de solicitud",
      value: "11/02/2024",
      icon: <IconCalendar size={16} />
    },
    {
      label: "Prioridad",
      value: "Alta",
      icon: <IconAlertTriangle size={16} />
    },
    {
      label: "Inspector Asignado",
      value: "Juan Polo",
      icon: <IconUser size={16} />
    },
    {
      label: "Fecha de Inspección",
      value: "15/12/2024",
      icon: <IconCalendar size={16} />
    }
  ];

  // Simulación de estado de resultados (esto vendría de tu backend)
  const tieneResultados = false;

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
              
              {tieneResultados ? (
                <div className="resultados-content">
                  {/* Aquí irían los resultados de la inspección */}
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
