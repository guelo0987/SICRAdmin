import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Badge,
} from '@mantine/core';
import { 
  IconChevronLeft,
  IconAlertCircle
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/Irregularidades.css';

const Irregularidades = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos de ejemplo (esto vendría de tu API)
  const irregularidadesData = {
    codigo: 'IN117934',
    fecha: '15/12/2024',
    establecimiento: 'Matadero La Esperanza',
    inspector: 'Juan Pérez',
    irregularidades: [
      {
        id: 1,
        descripcion: 'La temperatura de la sala de sacrificio no está controlada adecuadamente',
        tipo: 'Condiciones inadecuadas de almacenamiento',
        fechaDetectada: '15/12/2024',
        nivelGravedad: 'Medio',
        estado: 'N/A'
      },
      // Más irregularidades...
    ]
  };

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
              onClick={() => navigate(`/resultados/${id}`)}
            >
              Volver
            </Button>
            <Text size="xl" weight={600}>Irregularidades Detectadas</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="xs">
            <Text>Código de Inspección: {irregularidadesData.codigo}</Text>
            <Text>Fecha de Inspección: {irregularidadesData.fecha}</Text>
            <Text>Establecimiento: {irregularidadesData.establecimiento}</Text>
            <Text>Inspector: {irregularidadesData.inspector}</Text>
          </Stack>
        </Paper>

        <Text size="lg" weight={600} mt="xl" mb="md">Lista de Irregularidades</Text>

        {irregularidadesData.irregularidades.map((irregularidad, index) => (
          <Paper key={index} shadow="sm" radius="md" className="irregularidad-item">
            <Stack spacing="md">
              <Group position="apart">
                <Text weight={500}>Irregularidad #{irregularidad.id}</Text>
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
                  <Text>{irregularidad.fechaDetectada}</Text>
                </Group>

                <Group>
                  <Text weight={500}>Estado:</Text>
                  <Text>{irregularidad.estado}</Text>
                </Group>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Irregularidades; 