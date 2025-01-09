import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { 
  IconBuilding, 
  IconMapPin, 
  IconClipboardList,
  IconBox,
  IconChartBar,
  IconCalendar,
  IconEdit
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetalleEstablecimientos.css';

const DetallesEstablecimientos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const establecimientoDetails = [
    {
      label: "Código de Establecimiento",
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
      label: "Tipo de Operación",
      value: "Sacrificio",
      icon: <IconBox size={16} />
    },
    {
      label: "Tipo de Producto",
      value: "Producto A",
      icon: <IconBox size={16} />
    },
    {
      label: "Volumen Procesado",
      value: "Volumen A",
      icon: <IconChartBar size={16} />
    },
    {
      label: "Volumen de Unidad",
      value: "Volumen A",
      icon: <IconChartBar size={16} />
    },
    {
      label: "Periodo de Volumen",
      value: "Periodo 3",
      icon: <IconCalendar size={16} />
    }
  ];

  return (
    <div className="detalles-establecimiento">
      <Header />
      <Menu />
      <div className="detalles-content">
        <div className="content-header">
          <h1>Establecimientos</h1>
          <Button
            leftIcon={<IconEdit size={16} />}
            color="red"
            variant="filled"
            className="edit-button"
            onClick={() => navigate(`/establecimientos/editar/${id}`)}
          >
            Editar
          </Button>
        </div>
        <div className="content-wrapper">
          <div className="main-details">
            <CardDetails 
              title="Detalles de Establecimiento"
              details={establecimientoDetails}
              icon={<IconBuilding size={24} stroke={1.5} />}
            />
          </div>
          <div className="side-details">
            <CardDetails 
              title="Licencias y Certificaciones"
              details={[
                {
                  label: "Documento",
                  value: "No hay documentos cargados",
                  icon: <IconClipboardList size={16} />
                }
              ]}
              icon={<IconClipboardList size={24} stroke={1.5} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesEstablecimientos;
