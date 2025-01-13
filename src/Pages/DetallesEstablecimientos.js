import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Loader } from '@mantine/core';
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
import axios from 'axios';
import { ESTABLISHMENT_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const DetallesEstablecimientos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [establecimiento, setEstablecimiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEstablecimientoDetails();
  }, [id]);

  const fetchEstablecimientoDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(ESTABLISHMENT_ENDPOINTS.GET_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setEstablecimiento(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener detalles del establecimiento:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los detalles del establecimiento',
        color: 'red'
      });
      setLoading(false);
    }
  };

  const establecimientoDetails = establecimiento ? [
    {
      label: "Código de Establecimiento",
      value: `E${establecimiento.idEstablecimiento}`,
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: establecimiento.nombre,
      icon: <IconBuilding size={16} />
    },
    {
      label: "Dirección",
      value: establecimiento.direccion,
      icon: <IconMapPin size={16} />
    },
    {
      label: "Tipo de Operación",
      value: establecimiento.tipoOperacion || 'No especificado',
      icon: <IconBox size={16} />
    },
    {
      label: "Tipo de Producto",
      value: establecimiento.tipoProducto || 'No especificado',
      icon: <IconBox size={16} />
    },
    {
      label: "Volumen Procesado",
      value: establecimiento.volumenProcesado || 'No especificado',
      icon: <IconChartBar size={16} />
    },
    {
      label: "Unidad de Volumen",
      value: establecimiento.unidadVolumen || 'No especificado',
      icon: <IconChartBar size={16} />
    },
    {
      label: "Periodo de Volumen",
      value: establecimiento.periodoVolumen || 'No especificado',
      icon: <IconCalendar size={16} />
    },
    {
      label: "Estado",
      value: establecimiento.estadoEstablecimiento,
      icon: <IconBuilding size={16} />
    },
    {
      label: "Riesgo",
      value: establecimiento.riesgo || 'Pendiente',
      icon: <IconBox size={16} />
    }
  ] : [];

  if (loading) {
    return (
      <div className="detalles-establecimiento">
        <Header />
        <Menu />
        <div className="content-wrapper">
          <Loader size="lg" variant="dots" />
        </div>
      </div>
    );
  }

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
                  value: establecimiento?.licenciasCertificaciones || "No hay documentos cargados",
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
