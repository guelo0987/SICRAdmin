import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Badge,
  Loader,
  Select
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { IRREGULARIDAD_ENDPOINTS, ESTABLISHMENT_ENDPOINTS, LOTE_PRODUCTO_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/Irregularidades.css';

const Irregularidades = () => {
  const { id: idInspeccion } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [datosInspeccion, setDatosInspeccion] = useState(null);
  const [lotes, setLotes] = useState([]);
  const [selectedLotes, setSelectedLotes] = useState({});
  const [editMode, setEditMode] = useState({});

  // Función para obtener los lotes del establecimiento
  const fetchLotes = async (idEstablecimiento) => {
    try {
      console.log('=== Inicio fetchLotes ===');
      console.log('ID Establecimiento recibido:', idEstablecimiento);
      
      const token = localStorage.getItem('token');
      const response = await axios.get(
        LOTE_PRODUCTO_ENDPOINTS.GET_BY_ESTABLISHMENT(idEstablecimiento),
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      console.log('URL de la petición:', LOTE_PRODUCTO_ENDPOINTS.GET_BY_ESTABLISHMENT(idEstablecimiento));
      console.log('Respuesta completa:', response);
      console.log('Datos de lotes:', response.data);
      
      if (response.data && response.data.lotes) {
        console.log('Lotes encontrados:', response.data.lotes);
        setLotes(response.data.lotes);
      } else {
        console.log('Estructura de la respuesta:', response.data);
        console.log('No se encontraron lotes en la respuesta o formato inesperado');
        setLotes([]);
      }
      console.log('=== Fin fetchLotes ===');
    } catch (error) {
      console.error('Error al obtener lotes:', error);
      console.error('Detalles del error:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status
      });
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los lotes',
        color: 'red'
      });
    }
  };

  // Función para actualizar la irregularidad
  const handleUpdateIrregularidad = async (irregularidad) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${IRREGULARIDAD_ENDPOINTS.EDITAR}?idIrregularidad=${irregularidad.idIrregularidad}&idLote=${selectedLotes[irregularidad.idIrregularidad]}&NivelGravedad=${irregularidad.nivelGravedad}`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      notifications.show({
        title: 'Éxito',
        message: 'Irregularidad actualizada correctamente',
        color: 'green'
      });
      
      setEditMode(prev => ({
        ...prev,
        [irregularidad.idIrregularidad]: false
      }));
      
    } catch (error) {
      console.error('Error al actualizar irregularidad:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo actualizar la irregularidad',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          IRREGULARIDAD_ENDPOINTS.GET_POR_INSPECCION(idInspeccion),
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        
        setDatosInspeccion(response.data);

        // Inicializar selectedLotes con los lotes ya asignados
        const lotesIniciales = {};
        response.data.listaDeIrregularidades.forEach(irregularidad => {
          if (irregularidad.lote) {
            lotesIniciales[irregularidad.idIrregularidad] = irregularidad.lote.idLote.toString();
          }
        });
        setSelectedLotes(lotesIniciales);

        if (response.data.listaDeIrregularidades?.length > 0 && 
            response.data.listaDeIrregularidades[0].establecimiento?.idEstablecimiento) {
          const idEstablecimiento = response.data.listaDeIrregularidades[0].establecimiento.idEstablecimiento;
          await fetchLotes(idEstablecimiento);
        }
      } catch (error) {
        console.error('Error completo:', error);
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar las irregularidades',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idInspeccion]);

  if (loading) {
    return (
      <div className="irregularidades">
        <Header />
        <Menu />
        <div className="loading-container">
          <Loader size="xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="irregularidades">
      <Header />
      <Menu />
      <div className="irregularidades-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate('/resultados')}
            >
              Volver
            </Button>
            <Text size="xl" weight={600}>Irregularidades Detectadas</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="xs">
            <Text>Código de Inspección: {datosInspeccion?.codigoInspeccion}</Text>
            <Text>Fecha de Inspección: {datosInspeccion?.fechaInspeccion}</Text>
            <Text>Establecimiento: {datosInspeccion?.establecimiento}</Text>
            <Text>Inspector: {datosInspeccion?.inspector}</Text>
          </Stack>
        </Paper>

        <Text size="lg" weight={600} mt="xl" mb="md">Lista de Irregularidades</Text>

        {!datosInspeccion?.listaDeIrregularidades?.length ? (
          <Text color="dimmed">No se encontraron irregularidades para esta inspección.</Text>
        ) : (
          datosInspeccion.listaDeIrregularidades.map((irregularidad) => (
            <Paper key={irregularidad.idIrregularidad} shadow="sm" radius="md" className="irregularidad-item">
              <Stack spacing="md">
                <Group position="apart">
                  <Text weight={500}>Irregularidad #{irregularidad.idIrregularidad}</Text>
                  <Badge color="red" variant="light">
                    {irregularidad.nivelGravedad}
                  </Badge>
                </Group>
                
                <Stack spacing="xs">
                  <Group>
                    <Text weight={500}>Descripción:</Text>
                    <Text>{irregularidad.descripcion}</Text>
                  </Group>
                  
                  <Group>
                    <Text weight={500}>Tipo de Irregularidad:</Text>
                    <Text>{irregularidad.tipo}</Text>
                  </Group>

                  <Group>
                    <Text weight={500}>Fecha Detectada:</Text>
                    <Text>{new Date(irregularidad.fechaDetectada).toLocaleDateString('es-ES')}</Text>
                  </Group>

                  <Group>
                    <Text weight={500}>Lote:</Text>
                    <Select
                      data={lotes.map(lote => ({
                        value: lote.idLote.toString(),
                        label: `${lote.codigoLote} - ${new Date(lote.fechaProduccion).toLocaleDateString('es-ES')}`
                      }))}
                      value={selectedLotes[irregularidad.idIrregularidad]}
                      onChange={(value) => setSelectedLotes(prev => ({
                        ...prev,
                        [irregularidad.idIrregularidad]: value
                      }))}
                      placeholder="Seleccionar lote"
                      style={{ width: 200 }}
                    />
                  </Group>

                  <Group position="right" mt="md">
                    {selectedLotes[irregularidad.idIrregularidad] && (
                      <Button
                        variant="light"
                        color="blue"
                        onClick={() => handleUpdateIrregularidad(irregularidad)}
                      >
                        Actualizar Irregularidad
                      </Button>
                    )}
                  </Group>
                </Stack>
              </Stack>
            </Paper>
          ))
        )}
      </div>
    </div>
  );
};

export default Irregularidades; 