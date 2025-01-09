import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button,
  Stack,
  Group,
  Title,
  Text,
  UnstyledButton,
  Collapse
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

const EvaluarInspeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openedNormativa, setOpenedNormativa] = useState(null);

  const normativas = [
    {
      id: 'bpm',
      title: 'Buenas Prácticas de Manufactura (BPM)',
      icon: <IconClipboardCheck size={20} />,
      listas: [
        { id: 'bpm_1', title: 'Lista de verificación #1' },
        { id: 'bpm_2', title: 'Lista de verificación #2' },
        { id: 'bpm_3', title: 'Lista de verificación #3' }
      ]
    },
    {
      id: 'haccp',
      title: 'Controles de HACCP',
      icon: <IconListCheck size={20} />,
      listas: [
        { id: 'haccp_1', title: 'Lista de verificación #1' },
        { id: 'haccp_2', title: 'Lista de verificación #2' }
      ]
    },
    {
      id: 'seguridad',
      title: 'Normativa de Seguridad Alimentaria',
      icon: <IconClipboardCheck size={20} />,
      listas: [
        { id: 'seg_1', title: 'Lista de verificación #1' },
        { id: 'seg_2', title: 'Lista de verificación #2' }
      ]
    }
  ];

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
          {normativas.map((normativa) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluarInspeccion; 