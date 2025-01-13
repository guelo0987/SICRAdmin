import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button,
  Stack,
  Group,
  Title,
  Text,
  UnstyledButton,
  Collapse,
  Loader
} from '@mantine/core';
import { 
  IconClipboardCheck, 
  IconChevronLeft,
  IconChevronRight,
  IconListCheck
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/EvaluarInspeccion.css';
import axios from 'axios';
import { NORMATIVA_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const EvaluarInspeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openedNormativa, setOpenedNormativa] = useState(null);
  const [normativas, setNormativas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNormativas();
  }, []);

  const fetchNormativas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        NORMATIVA_ENDPOINTS.GET_ALL,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Respuesta de normativas:', response.data);

      const normativasFormateadas = response.data.map(normativa => ({
        id: normativa.idNormativa.toString(),
        title: normativa.nombreNormativa,
        description: normativa.descripcion,
        version: normativa.version,
        fechaVigencia: new Date(normativa.fechaVigencia).toLocaleDateString('es-ES'),
        icon: getIconForNormativa(normativa.tipo || 'default'),
        listas: normativa.listaVerificacions ? normativa.listaVerificacions.map(lista => ({
          id: lista.idLista.toString(),
          title: lista.nombreLista
        })) : []
      }));

      setNormativas(normativasFormateadas);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener normativas:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar las normativas',
        color: 'red'
      });
      setLoading(false);
    }
  };

  const getIconForNormativa = (tipo) => {
    switch(tipo) {
      case 'BPM':
        return <IconClipboardCheck size={20} />;
      case 'HACCP':
        return <IconListCheck size={20} />;
      default:
        return <IconClipboardCheck size={20} />;
    }
  };

  const handleNormativaClick = (normativaId) => {
    setOpenedNormativa(openedNormativa === normativaId ? null : normativaId);
  };

  const handleListClick = (normativaId, listaId) => {
    navigate(`/inspecciones/${id}/evaluar/${normativaId}/${listaId}`);
  };

  return (
    <div className="evaluar-inspeccion">
      <Header />
      <Menu />
      <div className="evaluar-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate(`/inspecciones/${id}`)}
            >
              Volver
            </Button>
            <Title order={2}>Normativas</Title>
          </Group>
        </div>

        <div className="normativas-section">
          {loading ? (
            <Loader />
          ) : (
            normativas.map((normativa) => (
              <div key={normativa.id} className="normativa-card">
                <UnstyledButton
                  className="normativa-header"
                  onClick={() => handleNormativaClick(normativa.id)}
                >
                  <Group position="apart">
                    <Group>
                      {normativa.icon}
                      <Text weight={500}>{normativa.title}</Text>
                    </Group>
                    <IconChevronRight 
                      size={20} 
                      stroke={1.5}
                      className={`arrow-icon ${openedNormativa === normativa.id ? 'rotated' : ''}`}
                    />
                  </Group>
                </UnstyledButton>
                <Collapse in={openedNormativa === normativa.id}>
                  <Stack spacing="md" className="listas-container">
                    {normativa.listas.map((lista) => (
                      <UnstyledButton
                        key={lista.id}
                        className="lista-verificacion-button"
                        onClick={() => handleListClick(normativa.id, lista.id)}
                      >
                        <Group position="apart" className="lista-content">
                          <Text weight={500}>{lista.title}</Text>
                          <IconChevronRight 
                            size={20} 
                            stroke={1.5}
                            className="arrow-icon" 
                          />
                        </Group>
                      </UnstyledButton>
                    ))}
                  </Stack>
                </Collapse>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluarInspeccion; 