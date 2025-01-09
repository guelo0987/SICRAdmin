import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  TextInput,
  Select,
  Checkbox
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/EditarUsuario.css';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: 'Juan Marcos',
    apellidos: 'Martinez Brito',
    correo: 'juan.perez@email.com',
    rol: 'Inspector',
    permisos: {
      asignarInspecciones: false,
      gestionarUsuarios: false,
      gestionarSanciones: false,
      gestionarSolicitudes: false
    }
  });

  const handlePermisosChange = (permiso) => {
    setFormData({
      ...formData,
      permisos: {
        ...formData.permisos,
        [permiso]: !formData.permisos[permiso]
      }
    });
  };

  const handleSubmit = () => {
    console.log('Datos actualizados:', formData);
    navigate('/usuarios');
  };

  return (
    <div className="editar-usuario">
      <Header />
      <Menu />
      <div className="usuario-content">
        <div className="content-header">
          <Group>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<IconChevronLeft size={16} />}
              onClick={() => navigate('/usuarios')}
            >
              Volver
            </Button>
            <Text size="xl" weight={600}>Editar Usuario</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="form-section">
          <Stack spacing="lg">
            <div>
              <Text size="lg" weight={600} mb="md">Información del Usuario</Text>
              <Stack spacing="md">
                <TextInput
                  label="Nombres"
                  value={formData.nombres}
                  readOnly
                />
                <TextInput
                  label="Apellidos"
                  value={formData.apellidos}
                  readOnly
                />
                <TextInput
                  label="Correo Electrónico"
                  value={formData.correo}
                  readOnly
                />
              </Stack>
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Rol Asignado</Text>
              <Select
                value={formData.rol}
                onChange={(value) => setFormData({...formData, rol: value})}
                data={[
                  { value: 'inspector', label: 'Inspector' },
                  { value: 'administrador', label: 'Administrador' }
                ]}
              />
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Permisos Asignados</Text>
              <Stack spacing="xs">
                <Checkbox
                  label="Asignar Inspecciones"
                  checked={formData.permisos.asignarInspecciones}
                  onChange={() => handlePermisosChange('asignarInspecciones')}
                />
                <Checkbox
                  label="Gestionar Usuarios"
                  checked={formData.permisos.gestionarUsuarios}
                  onChange={() => handlePermisosChange('gestionarUsuarios')}
                />
                <Checkbox
                  label="Gestionar Sanciones"
                  checked={formData.permisos.gestionarSanciones}
                  onChange={() => handlePermisosChange('gestionarSanciones')}
                />
                <Checkbox
                  label="Gestionar Solicitudes"
                  checked={formData.permisos.gestionarSolicitudes}
                  onChange={() => handlePermisosChange('gestionarSolicitudes')}
                />
              </Stack>
            </div>

            <Group position="right" mt="xl" spacing="sm">
              <Button
                variant="outline"
                color="gray"
                onClick={() => navigate('/usuarios')}
              >
                Cancelar
              </Button>
              <Button
                color="red"
                onClick={handleSubmit}
              >
                Guardar
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  // Aquí iría la lógica para eliminar el usuario
                  console.log('Eliminar usuario:', id);
                  navigate('/usuarios');
                }}
              >
                Eliminar Usuario
              </Button>
            </Group>
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default EditarUsuario; 