import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Table,
  Badge,
  Loader
} from '@mantine/core';
import { IconChevronLeft, IconCash, IconCalendar, IconAlertTriangle } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { SANCION_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesSanciones.css';

const DetallesSanciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sancion, setSancion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actualizandoEstado, setActualizandoEstado] = useState(false);

  useEffect(() => {
    const fetchSancionDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${SANCION_ENDPOINTS.GET_ALL}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSancion(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la sanción:', error);
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar los detalles de la sanción',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSancionDetails();
  }, [id]);

  const handleCambiarEstado = async (idIrregularidad, nuevoEstado) => {
    setActualizandoEstado(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        SANCION_ENDPOINTS.CAMBIAR_ESTADO(idIrregularidad, sancion.idSancion),
        JSON.stringify(nuevoEstado),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      notifications.show({
        title: 'Éxito',
        message: 'Estado de la sanción actualizado correctamente',
        color: 'green'
      });

      // Actualizar los datos localmente
      const sancionActualizada = {
        ...sancion,
        irregularidadesRelacionadas: sancion.irregularidadesRelacionadas.map(irreg =>
          irreg.idIrregularidad === idIrregularidad
            ? {
                ...irreg,
                estadoSancion: nuevoEstado,
                fechaResolution: nuevoEstado === 'Resuelto' ? new Date().toISOString() : null
              }
            : irreg
        )
      };
      setSancion(sancionActualizada);

    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo actualizar el estado de la sanción',
        color: 'red'
      });
    } finally {
      setActualizandoEstado(false);
    }
  };

  if (loading) {
    return (
      <div className="detalles-sanciones loading">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="detalles-sanciones">
      <Header />
      <Menu />
      <div className="sanciones-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate('/sanciones')}
            >
              Volver
            </Button>
            <Text size="xl" weight={600}>Detalles de la Sanción</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="lg">
            <div>
              <Text size="lg" weight={600} mb="md">Información de la Sanción</Text>
              <Table>
                <tbody>
                  <tr>
                    <td><Text weight={500}>Código:</Text></td>
                    <td>S{sancion?.idSancion}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Descripción:</Text></td>
                    <td>{sancion?.descripcion}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Monto:</Text></td>
                    <td>
                      <Badge color="blue" size="lg">
                        S/. {sancion?.monto.toFixed(2)}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Irregularidades Relacionadas</Text>
              {sancion?.irregularidadesRelacionadas?.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>ID Irregularidad</th>
                      <th>Fecha Aplicada</th>
                      <th>Fecha Resolución</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sancion.irregularidadesRelacionadas.map((irreg) => (
                      <tr key={irreg.idIrregularidad}>
                        <td>#{irreg.idIrregularidad}</td>
                        <td>{new Date(irreg.fechaAplicada).toLocaleDateString('es-ES')}</td>
                        <td>
                          {irreg.fechaResolution ? 
                            new Date(irreg.fechaResolution).toLocaleDateString('es-ES') : 
                            'Pendiente'}
                        </td>
                        <td>
                          <Badge 
                            color={irreg.estadoSancion === 'Pendiente' ? 'yellow' : 'green'}
                            variant="light"
                          >
                            {irreg.estadoSancion}
                          </Badge>
                        </td>
                        <td>
                          <Group spacing="xs">
                            <Button
                              size="xs"
                              variant="light"
                              color={irreg.estadoSancion === 'Pendiente' ? 'green' : 'yellow'}
                              onClick={() => handleCambiarEstado(
                                irreg.idIrregularidad, 
                                irreg.estadoSancion === 'Pendiente' ? 'Resuelto' : 'Pendiente'
                              )}
                              loading={actualizandoEstado}
                            >
                              {irreg.estadoSancion === 'Pendiente' ? 'Marcar Resuelto' : 'Marcar Pendiente'}
                            </Button>
                          </Group>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Text color="dimmed">No hay irregularidades relacionadas</Text>
              )}
            </div>
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default DetallesSanciones; 