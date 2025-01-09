import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Select, 
  Button, 
  Group, 
  Stack,
  Paper,
  Title,
  Text,
  Divider
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { 
  IconCalendar, 
  IconMapPin, 
  IconClipboardList,
  IconUserCheck
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/AsignarInspector.css';

const AsignarInspector = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inspector, setInspector] = useState('');
  const [fecha, setFecha] = useState(null);

  const establecimientoDetails = [
    {
      label: "Código de Solicitud",
      value: id,
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: "Matadero La Esperanza"
    },
    {
      label: "Tipo de Establecimiento",
      value: "Matadero"
    },
    {
      label: "Dirección",
      value: "Calle Ficticia 123, Ciudad",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Coordenadas del Establecimiento",
      value: "40° 24' 59\" N, 03° 42' 09\" O",
      icon: <IconMapPin size={16} />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inspector || !fecha) {
      return;
    }
    console.log({ inspector, fecha });
    navigate('/solicitudes');
  };

  return (
    <div className="asignar-inspector">
      <Header />
      <Menu />
      <div className="asignar-inspector-content">
        <div className="content-wrapper">
          <CardDetails 
            title="Detalles de Solicitud"
            details={establecimientoDetails}
            icon={<IconClipboardList size={20} />}
          />
          
          <Paper shadow="sm" radius="md" className="asignar-form">
            <div className="form-header">
              <IconUserCheck size={24} stroke={1.5} />
              <div>
                <Title order={3}>Asignar Inspector</Title>
                <Text size="sm" color="dimmed">Complete los campos para asignar un inspector</Text>
              </div>
            </div>

            <Divider my="lg" />

            <form onSubmit={handleSubmit}>
              <Stack spacing="lg">
                <Select
                  label="Inspector"
                  description="Seleccione el inspector que realizará la visita"
                  placeholder="Seleccionar Inspector"
                  value={inspector}
                  onChange={setInspector}
                  data={[
                    { value: 'inspector1', label: 'Juan Pérez' },
                    { value: 'inspector2', label: 'María García' },
                    { value: 'inspector3', label: 'Carlos López' }
                  ]}
                  required
                  size="md"
                  radius="md"
                />

                <DatePickerInput
                  label="Fecha Inspección"
                  description="Seleccione la fecha para realizar la inspección"
                  placeholder="Seleccionar fecha"
                  value={fecha}
                  onChange={setFecha}
                  icon={<IconCalendar size={16} />}
                  required
                  size="md"
                  radius="md"
                  minDate={new Date()}
                />

                <Group grow mt="xl">
                  <Button 
                    variant="outline" 
                    color="gray"
                    onClick={() => navigate('/solicitudes')}
                    size="md"
                    radius="md"
                    className="cancel-button"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    color="red"
                    size="md"
                    radius="md"
                    className="submit-button"
                  >
                    Asignar 
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AsignarInspector;
