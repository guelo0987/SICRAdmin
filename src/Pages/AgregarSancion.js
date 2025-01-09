import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  TextInput,
  Select,
  Textarea,
  NumberInput
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/AgregarSancion.css';

const AgregarSancion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    establecimiento: '',
    codigo: '',
    fecha: '',
    inspector: '',
    irregularidad: '',
    tipoSancion: '',
    monto: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la sanción
    console.log('Datos de la sanción:', formData);
    navigate('/sanciones');
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
            <Text size="xl" weight={600}>Agregar Sanción</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="form-section">
          <form onSubmit={handleSubmit}>
            <Stack spacing="lg">
              <div>
                <Text size="lg" weight={600} mb="md">Información del Establecimiento</Text>
                <Stack spacing="md">
                  <TextInput
                    label="Establecimiento"
                    placeholder="Ingrese el nombre del establecimiento"
                    required
                    value={formData.establecimiento}
                    onChange={(e) => setFormData({...formData, establecimiento: e.target.value})}
                  />
                  <TextInput
                    label="Código de Establecimiento"
                    placeholder="Ingrese el código"
                    required
                    value={formData.codigo}
                    onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                  />
                  <TextInput
                    label="Fecha de Inspección"
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  />
                  <TextInput
                    label="Inspector"
                    placeholder="Nombre del inspector"
                    required
                    value={formData.inspector}
                    onChange={(e) => setFormData({...formData, inspector: e.target.value})}
                  />
                </Stack>
              </div>

              <div>
                <Text size="lg" weight={600} mb="md">Irregularidad Detectada</Text>
                <Textarea
                  placeholder="Describa la irregularidad"
                  minRows={3}
                  required
                  value={formData.irregularidad}
                  onChange={(e) => setFormData({...formData, irregularidad: e.target.value})}
                />
              </div>

              <div>
                <Text size="lg" weight={600} mb="md">Detalles de la Sanción</Text>
                <Stack spacing="md">
                  <Select
                    label="Tipo de Sanción"
                    placeholder="Seleccione el tipo de sanción"
                    data={[
                      { value: 'multa', label: 'Multa económica' },
                      { value: 'suspension', label: 'Suspensión temporal' },
                      { value: 'cierre', label: 'Cierre definitivo' }
                    ]}
                    required
                    value={formData.tipoSancion}
                    onChange={(value) => setFormData({...formData, tipoSancion: value})}
                  />
                  <NumberInput
                    label="Monto"
                    placeholder="Ingrese el monto"
                    required
                    value={formData.monto}
                    onChange={(value) => setFormData({...formData, monto: value})}
                    prefix="$"
                    min={0}
                  />
                </Stack>
              </div>

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
                >
                  Guardar Sanción
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