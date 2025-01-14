import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Button, 
  Stack,
  Group,
  Title,
  Text,
  Radio,
  Loader
} from '@mantine/core';
import { 
  IconChevronLeft,
  IconClipboardCheck,
  IconClipboardX
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/ListaVerificacion.css';
import axios from 'axios';
import { ITEMS_VERIFICACION_ENDPOINTS, RESULTADO_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const ListaVerificacion = () => {
  const { id, normativaId, listaId } = useParams();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState({});
  const [observaciones, setObservaciones] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [listaId]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        ITEMS_VERIFICACION_ENDPOINTS.GET_BY_LISTA(listaId),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Items de la lista:', response.data);

      const itemsFormateados = response.data.map(item => ({
        id: item.idItem.toString(),
        pregunta: item.descripcion,
        numeroItem: item.numeroItem,
        criterioCumplimiento: item.criterioCumplimiento,
        observaciones: true
      }));

      // Ordenar por número de item
      itemsFormateados.sort((a, b) => a.numeroItem - b.numeroItem);

      setItems(itemsFormateados);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener items:', error);
      if (error.response && error.response.status === 404) {
        notifications.show({
          title: 'Lista vacía',
          message: 'Esta lista de verificación no tiene preguntas registradas',
          color: 'yellow'
        });
        setItems([]); // Establecer array vacío para mostrar mensaje en UI
      } else {
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar los items de la lista',
          color: 'red'
        });
      }
      setLoading(false);
    }
  };

  const handleRespuesta = (preguntaId, value) => {
    setRespuestas({
      ...respuestas,
      [preguntaId]: value
    });
  };

  const handleObservacion = (itemId, value) => {
    setObservaciones({
      ...observaciones,
      [itemId]: value
    });
  };

  const handleGuardarEvaluacion = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      // Guardar cada resultado
      for (const itemId in respuestas) {
        const resultado = {
          idInspeccion: parseInt(id),
          idLista: parseInt(listaId),
          idItem: parseInt(itemId),
          cumple: respuestas[itemId] === 'cumple',
          observacion: observaciones[itemId] || ''
        };

        await axios.post(
          RESULTADO_ENDPOINTS.UPSERT,
          resultado,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      notifications.show({
        title: 'Éxito',
        message: 'Evaluación guardada correctamente',
        color: 'green'
      });
    } catch (error) {
      console.error('Error al guardar evaluación:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data || 'No se pudo guardar la evaluación',
        color: 'red'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="lista-verificacion">
        <Header />
        <Menu />
        <div className="lista-content">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="lista-verificacion">
      <Header />
      <Menu />
      <div className="lista-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
            >
              Volver
            </Button>
            <Title order={2}>Lista de Verificación</Title>
          </Group>
        </div>

        {!loading && items.length === 0 ? (
          <Paper p="xl" className="empty-state">
            <Stack align="center" spacing="md">
              <IconClipboardX size={48} color="gray" />
              <Text size="lg" color="dimmed" align="center">
                Esta lista de verificación no tiene preguntas registradas
              </Text>
            </Stack>
          </Paper>
        ) : (
          <div className="preguntas-section">
            <Stack spacing="lg">
              {items.map((item) => (
                <Paper key={item.id} p="xl" className="pregunta-item">
                  <Stack spacing="lg">
                    <Group position="apart" align="flex-start">
                      <Text size="lg" weight={500} style={{ flex: 1 }}>
                        {item.pregunta}
                      </Text>
                      <div className="radio-group-container">
                        <Radio.Group
                          value={respuestas[item.id]}
                          onChange={(value) => handleRespuesta(item.id, value)}
                        >
                          <Group spacing="sm">
                            <Radio 
                              value="cumple" 
                              label="Cumple"
                              classNames={{
                                label: 'radio-label',
                              }}
                            />
                            <Radio 
                              value="no_cumple" 
                              label="No Cumple"
                              classNames={{
                                label: 'radio-label',
                              }}
                            />
                            <Radio 
                              value="no_aplica" 
                              label="No Aplica"
                              classNames={{
                                label: 'radio-label',
                              }}
                            />
                          </Group>
                        </Radio.Group>
                      </div>
                    </Group>
                    {item.observaciones && (
                      <textarea
                        className="observaciones-input"
                        placeholder="Ingrese sus observaciones aquí..."
                        rows={3}
                        value={observaciones[item.id] || ''}
                        onChange={(e) => handleObservacion(item.id, e.target.value)}
                      />
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>

            <div className="action-buttons">
              <Group position="right" spacing="md">
                <Button
                  variant="outline"
                  color="gray"
                  onClick={() => navigate(`/inspecciones/${id}/evaluar`)}
                  size="md"
                >
                  Cancelar
                </Button>
                <Button
                  color="blue"
                  leftIcon={<IconClipboardCheck size={16} />}
                  size="md"
                  onClick={handleGuardarEvaluacion}
                  loading={saving}
                  disabled={saving || Object.keys(respuestas).length === 0}
                >
                  {saving ? 'Guardando...' : 'Guardar Evaluación'}
                </Button>
              </Group>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaVerificacion; 