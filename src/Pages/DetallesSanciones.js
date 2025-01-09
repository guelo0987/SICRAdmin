import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Table
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesSanciones.css';

const DetallesSanciones = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos de ejemplo (esto vendría de tu API)
  const sancionData = {
    id: id,
    establecimiento: 'Matadero La Esperanza',
    codigo: 'E11773',
    fecha: '12/09/2024',
    inspector: 'Juan Pérez',
    irregularidad: 'Temperatura de la sala de sacrificio no controlada adecuadamente.',
    tipoSancion: 'Multa económica por incumplimiento de normas sanitarias',
    monto: '$500',
    estado: 'Aprobada'
  };

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
            <Text size="xl" weight={600}>Detalles de Sanciones</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="lg">
            <div>
              <Text size="lg" weight={600} mb="md">Información del Establecimiento</Text>
              <Table>
                <tbody>
                  <tr>
                    <td><Text weight={500}>Establecimiento:</Text></td>
                    <td>{sancionData.establecimiento}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Código de Establecimiento:</Text></td>
                    <td>{sancionData.codigo}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Fecha de Inspección:</Text></td>
                    <td>{sancionData.fecha}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Inspector:</Text></td>
                    <td>{sancionData.inspector}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Irregularidad Detectada</Text>
              <Paper p="md" radius="md" className="irregularidad-box">
                <Text>{sancionData.irregularidad}</Text>
              </Paper>
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Detalles de la Sanción</Text>
              <Table>
                <tbody>
                  <tr>
                    <td><Text weight={500}>Tipo de Sanción:</Text></td>
                    <td>{sancionData.tipoSancion}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Monto:</Text></td>
                    <td>{sancionData.monto}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Estado de la Sanción:</Text></td>
                    <td>{sancionData.estado}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default DetallesSanciones; 