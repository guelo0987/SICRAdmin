import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Table,
  Badge,
  Loader
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { USER_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesUsuario.css';

const DetallesUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarioDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(USER_ENDPOINTS.GET_BY_ID(id), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar los detalles del usuario',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="detalles-usuario loading">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="detalles-usuario">
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
            <Text size="xl" weight={600}>Detalles de Usuario</Text>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="lg">
            <div>
              <Text size="lg" weight={600} mb="md">Información Personal</Text>
              <Table>
                <tbody>
                  <tr>
                    <td><Text weight={500}>Usuario:</Text></td>
                    <td>{usuario?.username}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Nombres:</Text></td>
                    <td>{usuario?.nombre || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Apellidos:</Text></td>
                    <td>{usuario?.apellidos || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Rol:</Text></td>
                    <td>
                      <Badge 
                        color={usuario?.rol === 'Admin' ? 'blue' : 'green'}
                        variant="light"
                      >
                        {usuario?.rol}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Correo Electrónico:</Text></td>
                    <td>{usuario?.email}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Teléfono:</Text></td>
                    <td>{usuario?.telefono || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Dirección:</Text></td>
                    <td>{usuario?.direccion || 'No especificada'}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
              <Text size="lg" weight={600} mb="md">Información Laboral</Text>
              <Table>
                <tbody>
                  <tr>
                    <td><Text weight={500}>Fecha de Nacimiento:</Text></td>
                    <td>
                      {usuario?.fechaNacimiento ? 
                        new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES') : 
                        'No especificada'}
                    </td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Fecha de Ingreso:</Text></td>
                    <td>
                      {usuario?.fechaIngreso ? 
                        new Date(usuario.fechaIngreso).toLocaleDateString('es-ES') : 
                        'No especificada'}
                    </td>
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

export default DetallesUsuario; 