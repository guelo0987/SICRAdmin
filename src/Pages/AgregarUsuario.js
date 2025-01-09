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
  Checkbox,
  PasswordInput
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/AgregarUsuario.css';

const AgregarUsuario = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    fechaIngreso: '',
    password: '',
    confirmarPassword: '',
    rol: '',
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

  const validatePasswords = () => {
    if (formData.password !== formData.confirmarPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    if (!validatePasswords()) {
      return; // Detiene el envío si las contraseñas no coinciden
    }
    // Aquí iría la validación y el envío a la API
    console.log('Nuevo usuario:', formData);
    navigate('/usuarios');
  };

  return (
    <div className="agregar-usuario">
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
            <Text size="xl" weight={600}>Agregar Usuario</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="form-section">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <Stack spacing="lg">
              <div>
                <Text size="lg" weight={600} mb="md">Información Personal</Text>
                <Stack spacing="md">
                  <TextInput
                    label="Nombres"
                    placeholder="Ingrese los nombres"
                    value={formData.nombres}
                    onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Apellidos"
                    placeholder="Ingrese los apellidos"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Correo Electrónico"
                    placeholder="ejemplo@email.com"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({...formData, correo: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Teléfono"
                    placeholder="Ingrese el teléfono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Dirección"
                    placeholder="Ingrese la dirección"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Fecha de Nacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                    required
                  />
                  <TextInput
                    label="Fecha de Ingreso"
                    type="date"
                    value={formData.fechaIngreso}
                    onChange={(e) => setFormData({...formData, fechaIngreso: e.target.value})}
                    required
                  />
                </Stack>
              </div>

              <div>
                <Text size="lg" weight={600} mb="md">Credenciales</Text>
                <Stack spacing="md">
                  <PasswordInput
                    label="Contraseña"
                    placeholder="Ingrese la contraseña"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      if (passwordError) validatePasswords();
                    }}
                    required
                    error={passwordError}
                  />
                  <PasswordInput
                    label="Confirmar Contraseña"
                    placeholder="Confirme la contraseña"
                    value={formData.confirmarPassword}
                    onChange={(e) => {
                      setFormData({...formData, confirmarPassword: e.target.value});
                      if (passwordError) validatePasswords();
                    }}
                    required
                    error={passwordError}
                  />
                </Stack>
              </div>

              <div>
                <Text size="lg" weight={600} mb="md">Rol y Permisos</Text>
                <Stack spacing="md">
                  <Select
                    label="Rol Asignado"
                    placeholder="Seleccione un rol"
                    value={formData.rol}
                    onChange={(value) => setFormData({...formData, rol: value})}
                    data={[
                      { value: 'inspector', label: 'Inspector' },
                      { value: 'administrador', label: 'Administrador' }
                    ]}
                    required
                  />
                  <div>
                    <Text weight={500} size="sm" mb="xs">Permisos Asignados</Text>
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
                </Stack>
              </div>

              <Group position="right" mt="xl">
                <Button
                  variant="outline"
                  color="gray"
                  onClick={() => navigate('/usuarios')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="red"
                >
                  Guardar
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AgregarUsuario; 