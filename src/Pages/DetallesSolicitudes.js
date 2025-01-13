import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  IconClipboardList, 
  IconMapPin, 
  IconCalendar, 
  IconBuilding, 
  IconUser,
  IconPhone,
  IconMail,
  IconClock,
  IconChevronLeft
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesSolicitudes.css';
import axios from 'axios';
import { Loader, Button, Group, Text, Stack, Paper } from '@mantine/core';
import { SOLICITUD_ENDPOINTS, USER_ENDPOINTS, INSPECTION_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';
import { Select } from '@mantine/core';

const DetallesSolicitudes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitudData, setSolicitudData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [inspectores, setInspectores] = useState([]);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [fechaInspeccion, setFechaInspeccion] = useState(null);
  const [creandoInspeccion, setCreandoInspeccion] = useState(false);
  const [prioridad, setPrioridad] = useState('1');
  const [inspeccionExistente, setInspeccionExistente] = useState(null);
  const [tieneInspeccion, setTieneInspeccion] = useState(false);
  const [inspeccionData, setInspeccionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSolicitudDetails();
      await verificarInspeccion();
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (solicitudData?.estadoSolicitud === 'aprobada') {
      fetchInspectores();
    }
  }, [solicitudData?.estadoSolicitud]);

  useEffect(() => {
    if (solicitudData?.inspecciones && solicitudData.inspecciones.length > 0) {
      const inspeccion = solicitudData.inspecciones[0];
      setInspeccionExistente(inspeccion);
      setSelectedInspector(inspeccion.idAdminInspector.toString());
      setFechaInspeccion(new Date(inspeccion.fechaInspeccion));
      setPrioridad(inspeccion.prioridad.toString());
    }
  }, [solicitudData]);

  const fetchSolicitudDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(SOLICITUD_ENDPOINTS.GET_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSolicitudData(response.data);
    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoChange = async (nuevoEstado) => {
    try {
      setActualizando(true);
      const token = localStorage.getItem('token');
      await axios.put(
        SOLICITUD_ENDPOINTS.UPDATE(id),
        { 
          ...solicitudData,
          estadoSolicitud: nuevoEstado 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      await fetchSolicitudDetails();
      notifications.show({
        title: 'Estado actualizado',
        message: `La solicitud ha sido ${nuevoEstado.toLowerCase()} exitosamente`,
        color: 'green'
      });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo actualizar el estado de la solicitud',
        color: 'red'
      });
    } finally {
      setActualizando(false);
    }
  };

  const fetchInspectores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(USER_ENDPOINTS.GET_ALL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Filtrar solo usuarios con rol "Empleado"
      const inspectoresData = response.data
        .filter(user => user.rol === 'Empleado')
        .map(inspector => ({
          value: inspector.idAdmin.toString(),
          label: `${inspector.nombre} ${inspector.apellidos || ''}`
        }));
      
      setInspectores(inspectoresData);
    } catch (error) {
      console.error('Error al obtener inspectores:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los inspectores',
        color: 'red'
      });
    }
  };

  const handleCrearInspeccion = async () => {
    if (!selectedInspector || !fechaInspeccion || !prioridad) {
      notifications.show({
        title: 'Error',
        message: 'Por favor complete todos los campos requeridos',
        color: 'red'
      });
      return;
    }

    try {
      setCreandoInspeccion(true);
      const token = localStorage.getItem('token');
      const adminData = JSON.parse(localStorage.getItem('userData'));
      console.log(adminData);
      
      await axios.post(
        INSPECTION_ENDPOINTS.UPSERT,
        {
          idInspeccion: inspeccionExistente?.idInspeccion || 0,
          idSolicitud: parseInt(id),
          idAdmin: adminData.idAdmin,
          idAdminInspector: parseInt(selectedInspector),
          fechaInspeccion: fechaInspeccion,
          prioridad: parseInt(prioridad)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      notifications.show({
        title: 'Éxito',
        message: inspeccionExistente ? 
          'Inspección actualizada correctamente' : 
          'Inspección creada correctamente',
        color: 'green'
      });
      navigate('/inspecciones');
    } catch (error) {
      console.error('Error al procesar inspección:', error);
      notifications.show({
        title: 'Error',
        message: inspeccionExistente ?
          'No se pudo actualizar la inspección' :
          'No se pudo crear la inspección',
        color: 'red'
      });
    } finally {
      setCreandoInspeccion(false);
    }
  };

  const verificarInspeccion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        INSPECTION_ENDPOINTS.VERIFICAR_INSPECCION(id),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.tieneInspeccion) {
        setTieneInspeccion(true);
        setInspeccionData(response.data.inspeccion);
        setInspeccionExistente(response.data.inspeccion);
        setSelectedInspector(response.data.inspeccion.idAdminInspector.toString());
        setFechaInspeccion(new Date(response.data.inspeccion.fechaInspeccion));
        setPrioridad(response.data.inspeccion.prioridad.toString());
      } else {
        setTieneInspeccion(false);
        setInspeccionData(null);
        setInspeccionExistente(null);
      }
    } catch (error) {
      console.error('Error al verificar inspección:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo verificar el estado de la inspección',
        color: 'red'
      });
    }
  };

  const solicitudDetails = solicitudData ? [
    {
      label: "Código de Solicitud",
      value: `S${solicitudData.idSolicitud}`,
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Estado de Solicitud",
      value: solicitudData.estadoSolicitud || "Pendiente",
      icon: <IconClock size={16} />
    },
    {
      label: "Fecha de Admisión",
      value: solicitudData.fechaAdmitida ? 
        new Date(solicitudData.fechaAdmitida).toLocaleDateString('es-ES') : 
        "No disponible",
      icon: <IconCalendar size={16} />
    },
    {
      label: "Fecha de Aprobación",
      value: solicitudData.fechaAprobada ? 
        new Date(solicitudData.fechaAprobada).toLocaleDateString('es-ES') : 
        "No disponible",
      icon: <IconCalendar size={16} />
    },
    {
      label: "Tipo de Operación",
      value: solicitudData.tipoOperacion || "No especificado",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: solicitudData.nombreEst || "No especificado",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Dirección",
      value: solicitudData.direccion || "No especificada",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Coordenadas",
      value: solicitudData.coordenadas || "No especificadas",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Nombre del Solicitante",
      value: `${solicitudData.idUsuarioClienteNavigation?.nombre || ''} ${solicitudData.idUsuarioClienteNavigation?.apellidos || ''}`,
      icon: <IconUser size={16} />
    },
    {
      label: "Teléfono de Contacto",
      value: solicitudData.idUsuarioClienteNavigation?.telefono || "No especificado",
      icon: <IconPhone size={16} />
    },
    {
      label: "Correo Electrónico",
      value: solicitudData.idUsuarioClienteNavigation?.email || "No especificado",
      icon: <IconMail size={16} />
    }
  ] : [];

  const renderEstadoButtons = () => (
    <Group position="center" spacing="sm">
      <Button
        variant={solicitudData?.estadoSolicitud === 'en espera' ? 'filled' : 'light'}
        color="yellow"
        onClick={() => handleEstadoChange('en espera')}
        loading={actualizando}
        disabled={solicitudData?.estadoSolicitud === 'en espera'}
      >
        En Espera
      </Button>
      <Button
        variant={solicitudData?.estadoSolicitud === 'aprobada' ? 'filled' : 'light'}
        color="green"
        onClick={() => handleEstadoChange('aprobada')}
        loading={actualizando}
        disabled={solicitudData?.estadoSolicitud === 'aprobada'}
      >
        Aprobar
      </Button>
      <Button
        variant={solicitudData?.estadoSolicitud === 'rechazada' ? 'filled' : 'light'}
        color="red"
        onClick={() => handleEstadoChange('rechazada')}
        loading={actualizando}
        disabled={solicitudData?.estadoSolicitud === 'rechazada'}
      >
        Rechazar
      </Button>
    </Group>
  );

  const renderCrearInspeccion = () => {
    if (tieneInspeccion && inspeccionData) {
      return (
        <Paper shadow="sm" radius="md" p="md">
          <Text weight={500} size="lg" mb="md" align="center" color="blue">
            Editar Inspección
          </Text>
          <Stack spacing="md">
            <Select
              label="Inspector"
              placeholder="Seleccionar inspector"
              data={inspectores}
              value={selectedInspector}
              onChange={setSelectedInspector}
              required
            />
            <Select
              label="Prioridad"
              placeholder="Seleccionar prioridad"
              data={[
                { value: '1', label: 'Alta' },
                { value: '2', label: 'Media' },
                { value: '3', label: 'Baja' }
              ]}
              value={prioridad}
              onChange={setPrioridad}
              required
            />
            <DatePickerInput
              label="Fecha de Inspección"
              placeholder="Seleccionar fecha"
              value={fechaInspeccion}
              onChange={setFechaInspeccion}
              minDate={new Date()}
              required
              locale="es"
            />
            <Button
              color="blue"
              onClick={handleCrearInspeccion}
              loading={creandoInspeccion}
              disabled={!selectedInspector || !fechaInspeccion || !prioridad}
            >
              Actualizar Inspección
            </Button>
            <Button
              variant="light"
              color="blue"
              onClick={() => navigate(`/inspecciones/${inspeccionData.idInspeccion}`)}
            >
              Ver Detalles de Inspección
            </Button>
          </Stack>
        </Paper>
      );
    }

    return (
      <Paper shadow="sm" radius="md" p="md">
        <Text weight={500} size="lg" mb="md" align="center">
          Crear Nueva Inspección
        </Text>
        <Stack spacing="md">
          <Select
            label="Inspector"
            placeholder="Seleccionar inspector"
            data={inspectores}
            value={selectedInspector}
            onChange={setSelectedInspector}
            required
          />
          <Select
            label="Prioridad"
            placeholder="Seleccionar prioridad"
            data={[
              { value: '1', label: 'Alta' },
              { value: '2', label: 'Media' },
              { value: '3', label: 'Baja' }
            ]}
            value={prioridad}
            onChange={setPrioridad}
            required
          />
          <DatePickerInput
            label="Fecha de Inspección"
            placeholder="Seleccionar fecha"
            value={fechaInspeccion}
            onChange={setFechaInspeccion}
            minDate={new Date()}
            required
            locale="es"
          />
          <Button
            color="red"
            onClick={handleCrearInspeccion}
            loading={creandoInspeccion}
            disabled={!selectedInspector || !fechaInspeccion || !prioridad}
          >
            Crear Inspección
          </Button>
        </Stack>
      </Paper>
    );
  };

  if (loading) {
    return (
      <div className="detalles-solicitud">
        <Header />
        <Menu />
        <div className="detalles-content">
          <Loader size="lg" variant="dots" />
        </div>
      </div>
    );
  }

  return (
    <div className="detalles-solicitud">
      <Header />
      <Menu />
      <div className="detalles-content">
        <div className="content-wrapper">
          <Group position="apart" mb="xl">
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate('/solicitudes')}
            >
              Volver
            </Button>
            <Text size="xl" weight={600}>Detalles de Solicitud</Text>
          </Group>

          <Stack spacing="lg">
            <CardDetails 
              title="Detalles de Solicitud"
              details={solicitudDetails}
              icon={<IconClipboardList size={24} stroke={1.5} />}
            />
            
            <Paper shadow="sm" radius="md" p="md">
              <Text weight={500} size="lg" mb="md" align="center">
                Estado de la Solicitud
              </Text>
              {renderEstadoButtons()}
            </Paper>

            {solicitudData?.estadoSolicitud === 'aprobada' && renderCrearInspeccion()}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DetallesSolicitudes;
