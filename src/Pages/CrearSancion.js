import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Text, Group, Stack, TextInput, NumberInput } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { SANCION_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/Sanciones.css';

const CrearSancion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descripcion: '',
    monto: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        SANCION_ENDPOINTS.CREAR,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      notifications.show({
        title: 'Éxito',
        message: 'Sanción creada correctamente',
        color: 'green'
      });
      navigate('/sanciones');
    } catch (error) {
      console.error('Error al crear sanción:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo crear la sanción',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sanciones">
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
            <Text size="xl" weight={600}>Crear Nueva Sanción</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" p="xl">
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                label="Descripción"
                placeholder="Ingrese la descripción de la sanción"
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              />
              <NumberInput
                label="Monto"
                placeholder="Ingrese el monto"
                required
                value={formData.monto}
                onChange={(value) => setFormData({...formData, monto: value})}
                precision={2}
                min={0}
                prefix="S/. "
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
                  Crear Sanción
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CrearSancion; 