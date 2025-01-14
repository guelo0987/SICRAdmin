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
  PasswordInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { USER_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/AgregarUsuario.css';

const AgregarUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmarPassword: '',
    rol: '',
    email: '',
    direccion: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: null,
    fechaIngreso: null
  });

  const validatePasswords = () => {
    if (formData.password !== formData.confirmarPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        adminId: 0,
        username: formData.username,
        password: formData.password,
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol,
        telefono: formData.telefono || '',
        direccion: formData.direccion || '',
        apellidos: formData.apellidos || '',
        fechaNacimiento: formData.fechaNacimiento ? 
          new Date(formData.fechaNacimiento).toISOString() : null,
        fechaIngreso: formData.fechaIngreso ? 
          new Date(formData.fechaIngreso).toISOString() : null
      };

      await axios.post(USER_ENDPOINTS.CREATE_UPDATE, dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      notifications.show({
        title: 'Éxito',
        message: 'Usuario creado correctamente',
        color: 'green'
      });
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      const errorMessage = error.response?.data || 'No se pudo crear el usuario';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
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

        <Paper shadow="sm" radius="md" p="xl">
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                label="Nombre de Usuario"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
              <PasswordInput
                label="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                error={passwordError}
              />
              <PasswordInput
                label="Confirmar Contraseña"
                value={formData.confirmarPassword}
                onChange={(e) => setFormData({...formData, confirmarPassword: e.target.value})}
                required
                error={passwordError}
              />
              <TextInput
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
              <TextInput
                label="Apellidos"
                value={formData.apellidos}
                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              />
              <Select
                label="Rol"
                value={formData.rol}
                onChange={(value) => setFormData({...formData, rol: value})}
                data={[
                  { value: 'Admin', label: 'Administrador' },
                  { value: 'Empleado', label: 'Empleado' }
                ]}
                required
              />
              <TextInput
                label="Correo Electrónico"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <TextInput
                label="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
              <TextInput
                label="Dirección"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              />
              <DateInput
                label="Fecha de Nacimiento"
                placeholder="Seleccione una fecha"
                value={formData.fechaNacimiento}
                onChange={(value) => setFormData({...formData, fechaNacimiento: value})}
                clearable
              />
              <DateInput
                label="Fecha de Ingreso"
                placeholder="Seleccione una fecha"
                value={formData.fechaIngreso}
                onChange={(value) => setFormData({...formData, fechaIngreso: value})}
                clearable
              />
              <Button 
                type="submit" 
                loading={loading}
                color="red"
              >
                Crear Usuario
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AgregarUsuario; 