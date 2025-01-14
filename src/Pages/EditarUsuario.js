import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  TextInput,
  Select
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { USER_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/EditarUsuario.css';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idAdmin: '',
    username: '',
    password: '',
    rol: '',
    email: '',
    direccion: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: null,
    fechaIngreso: null,
    estado: ''
  });

  useEffect(() => {
    if (id) {
      const fetchUsuario = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(USER_ENDPOINTS.GET_BY_ID(id), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          setFormData({
            ...response.data,
            idAdmin: response.data.idAdmin,
            fechaNacimiento: response.data.fechaNacimiento ? new Date(response.data.fechaNacimiento) : null,
            fechaIngreso: response.data.fechaIngreso ? new Date(response.data.fechaIngreso) : null
          });
        } catch (error) {
          console.error('Error al obtener usuario:', error);
          notifications.show({
            title: 'Error',
            message: 'No se pudo cargar la información del usuario',
            color: 'red'
          });
        }
      };
      fetchUsuario();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        adminId: id ? parseInt(id) : 0,
        username: formData.username,
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password || '',
        rol: formData.rol,
        telefono: formData.telefono || '',
        direccion: formData.direccion || '',
        fechaNacimiento: formData.fechaNacimiento ? 
          new Date(formData.fechaNacimiento).toISOString() : null,
        fechaIngreso: formData.fechaIngreso ? 
          new Date(formData.fechaIngreso).toISOString() : null
      };

      const response = await axios.post(USER_ENDPOINTS.CREATE_UPDATE, dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      notifications.show({
        title: 'Éxito',
        message: id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
        color: 'green'
      });
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      const errorMessage = error.response?.data || 'No se pudo actualizar el usuario';
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
            <Text size="xl" weight={600}>
              {id ? 'Editar Usuario' : 'Crear Usuario'}
            </Text>
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
                {id ? 'Actualizar Usuario' : 'Crear Usuario'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default EditarUsuario;
