import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  NumberInput,
  Select,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { SANCION_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/AgregarSancion.css';

const AgregarSancion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idIrregularidad: '',
    idSancion: '',
    fechaAplicada: new Date(),
    fechaResolution: new Date(),
    estadoSancion: 'Pendiente'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        idIrregularidad: parseInt(formData.idIrregularidad),
        idSancion: parseInt(formData.idSancion),
        fechaAplicada: formData.fechaAplicada.toISOString(),
        fechaResolution: formData.fechaResolution.toISOString(),
        estadoSancion: formData.estadoSancion
      };

      await axios.post(
        SANCION_ENDPOINTS.APLICAR_SANCION,
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      notifications.show({
        title: 'Éxito',
        message: 'Sanción aplicada correctamente a la irregularidad',
        color: 'green'
      });
      navigate('/sanciones');
    } catch (error) {
      console.error('Error al aplicar sanción:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo aplicar la sanción a la irregularidad',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agregar-sancion">
      <Header />
      <Menu />
      <div className="sancion-content">
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
            <Text size="xl" weight={600}>Aplicar Sanción a Irregularidad</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="form-section">
          <form onSubmit={handleSubmit}>
            <Stack spacing="lg">
              <NumberInput
                label="ID Irregularidad"
                placeholder="Ingrese el ID de la irregularidad"
                required
                value={formData.idIrregularidad}
                onChange={(value) => setFormData({...formData, idIrregularidad: value})}
                min={1}
              />
              
              <NumberInput
                label="ID Sanción"
                placeholder="Ingrese el ID de la sanción"
                required
                value={formData.idSancion}
                onChange={(value) => setFormData({...formData, idSancion: value})}
                min={1}
              />

              <DateInput
                label="Fecha de Aplicación"
                placeholder="Seleccione la fecha"
                value={formData.fechaAplicada}
                onChange={(value) => setFormData({...formData, fechaAplicada: value})}
                required
              />

              <DateInput
                label="Fecha de Resolución"
                placeholder="Seleccione la fecha"
                value={formData.fechaResolution}
                onChange={(value) => setFormData({...formData, fechaResolution: value})}
                required
              />

              <Select
                label="Estado de la Sanción"
                placeholder="Seleccione el estado"
                data={[
                  { value: 'Pendiente', label: 'Pendiente' },
                  { value: 'Resuelto', label: 'Resuelto' }
                ]}
                required
                value={formData.estadoSancion}
                onChange={(value) => setFormData({...formData, estadoSancion: value})}
              />

              <Group position="right" mt="xl">
                <Button
                  variant="outline"
                  color="gray"
                  onClick={() => navigate('/sanciones')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="red"
                  loading={loading}
                >
                  Aplicar Sanción
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AgregarSancion; 