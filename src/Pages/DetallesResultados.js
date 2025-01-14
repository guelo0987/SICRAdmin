import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Badge,
  Divider
} from '@mantine/core';
import { 
  IconChevronLeft,
  IconCheck,
  IconX,
  IconFileDownload,
  IconAlertTriangle,
  IconPlus
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesResultados.css';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { RESULTADO_ENDPOINTS } from '../Api/Endpoints';
import { IRREGULARIDAD_ENDPOINTS } from '../Api/Endpoints';

const DetallesResultados = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [tieneIrregularidades, setTieneIrregularidades] = useState(false);
  const [verificandoIrregularidades, setVerificandoIrregularidades] = useState(true);

  const verificarIrregularidades = async (idInspeccion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        IRREGULARIDAD_ENDPOINTS.VERIFICAR_IRREGULARIDADES_INSPECCION(idInspeccion),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setTieneIrregularidades(response.data.tieneIrregularidades);
    } catch (error) {
      console.error('Error al verificar irregularidades:', error);
    } finally {
      setVerificandoIrregularidades(false);
    }
  };

  useEffect(() => {
    const fetchResultadoDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          RESULTADO_ENDPOINTS.GET_BY_ID(id),
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (response.data) {
          setResultado(response.data);
          await verificarIrregularidades(response.data.idInspeccion);
        }
      } catch (error) {
        console.error('Error al obtener detalles del resultado:', error);
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar los detalles del resultado',
          color: 'red'
        });
        navigate('/resultados');
      } finally {
        setLoading(false);
      }
    };

    fetchResultadoDetails();
  }, [id, navigate]);

  const getResultadoBadge = (cumple) => {
    const config = {
      true: { color: 'green', icon: <IconCheck size={16} />, label: 'Cumple' },
      false: { color: 'red', icon: <IconX size={16} />, label: 'No Cumple' }
    };

    return (
      <Badge 
        color={config[cumple].color}
        variant="light"
        size="lg"
        leftSection={config[cumple].icon}
      >
        {config[cumple].label}
      </Badge>
    );
  };

  const handleGenerarIrregularidades = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        RESULTADO_ENDPOINTS.GENERAR_IRREGULARIDADES(resultado.idInspeccion),
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      notifications.show({
        title: 'Éxito',
        message: 'Irregularidades generadas correctamente',
        color: 'green'
      });

      // Actualizar el estado de irregularidades
      await verificarIrregularidades(resultado.idInspeccion);
      
      // Navegar a la página de irregularidades
      navigate(`/resultados/${resultado.idInspeccion}/irregularidades`);

    } catch (error) {
      console.error('Error al generar irregularidades:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron generar las irregularidades',
        color: 'red'
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!resultado) return <div>No se encontró el resultado</div>;

  const normativa = resultado.idListaNavigation.idNormativaNavigation;
  const lista = resultado.idListaNavigation;
  const items = lista.itemsVerificacions;

  return (
    <div className="detalles-resultados">
      <Header />
      <Menu />
      <div className="resultados-content">
        <Stack spacing="xl">
          <div className="content-header">
            <Group position="center">
              <Text size="xl" weight={600}>Resultado de Inspección</Text>
            </Group>
          </div>

          <Stack spacing="lg" className="content-section">
            <Paper shadow="sm" radius="md" className="info-section">
              <Stack spacing="xs">
                <Group position="apart">
                  <Text>Código de Inspección: IN{resultado.idInspeccion}</Text>
                  {getResultadoBadge(resultado.cumple)}
                </Group>
                <Text>Fecha de Inspección: {new Date(resultado.idInspeccionNavigation.fechaInspeccion).toLocaleDateString('es-ES')}</Text>
                <Text>Establecimiento: {resultado.idInspeccionNavigation.idEstablecimientoNavigation?.nombre || 'Sin nombre'}</Text>
              </Stack>
            </Paper>

            <Paper shadow="sm" radius="md" className="normativa-section">
              <Stack spacing="md">
                <div>
                  <Text weight={600} size="lg">Normativa: {normativa.nombreNormativa}</Text>
                  <Text color="dimmed">Versión: {normativa.version}</Text>
                  <Text color="dimmed">Descripción: {normativa.descripcion}</Text>
                  <Text color="dimmed">Vigencia: {new Date(normativa.fechaVigencia).toLocaleDateString('es-ES')}</Text>
                </div>
                
                <Divider />
                
                <div>
                  <Text weight={600} size="lg">Lista de Verificación: {lista.nombreLista}</Text>
                  <Text color="dimmed">Descripción: {lista.descripcion}</Text>
                </div>

                <Divider />

                <Text weight={600} size="lg">Ítems Evaluados</Text>
                {items.map((item, index) => (
                  <div key={item.idItem} className="pregunta-item">
                    <Stack spacing="md">
                      <Group position="apart" align="flex-start">
                        <Text weight={500}>Ítem #{item.numeroItem}</Text>
                        <Badge 
                          color={resultado.idItem === item.idItem ? 
                            (resultado.cumple ? 'green' : 'red') : 'gray'}
                          variant="light"
                        >
                          {resultado.idItem === item.idItem ? 
                            (resultado.cumple ? 'Cumple' : 'No Cumple') : 'No Evaluado'}
                        </Badge>
                      </Group>
                      <Text>{item.descripcion}</Text>
                      <Text size="sm" color="dimmed">
                        Criterio de Cumplimiento: {item.criterioCumplimiento}
                      </Text>
                      {resultado.idItem === item.idItem && resultado.observacion && (
                        <Text color="dimmed" size="sm">
                          Observación: {resultado.observacion}
                        </Text>
                      )}
                    </Stack>
                  </div>
                ))}
              </Stack>
            </Paper>
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate('/resultados')}
            >
              Volver
            </Button>
            <Group>
              <Button
                variant="light"
                color="blue"
                leftIcon={<IconFileDownload size={16} />}
                onClick={() => setPdfModalOpen(true)}
              >
                Generar Informe
              </Button>
              <Button
                variant="light"
                color={tieneIrregularidades ? "red" : "blue"}
                leftIcon={tieneIrregularidades ? <IconAlertTriangle size={16} /> : <IconPlus size={16} />}
                onClick={tieneIrregularidades ? 
                  () => navigate(`/resultados/${resultado.idInspeccion}/irregularidades`) : 
                  handleGenerarIrregularidades
                }
                loading={verificandoIrregularidades}
              >
                {tieneIrregularidades ? 'Ver Irregularidades' : 'Crear Irregularidades'}
              </Button>
            </Group>
          </Group>
        </Stack>
      </div>
    </div>
  );
};

export default DetallesResultados;
