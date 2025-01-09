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
import '../Estilos/DetallesUsuario.css';

const DetallesUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos de ejemplo (esto vendría de tu API)
  const userData = {
    id: id,
    nombres: 'Juan Marcos',
    apellidos: 'Martinez Brito',
    rol: 'Inspector',
    correo: 'juan.perez@email.com',
    telefono: '809-527-8963',
    direccion: 'Villa mella',
    fechaNacimiento: '11/02/2024',
    fechaIngreso: '15/12/2024'
  };

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
                    <td><Text weight={500}>Nombres:</Text></td>
                    <td>{userData.nombres}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Apellidos:</Text></td>
                    <td>{userData.apellidos}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Rol:</Text></td>
                    <td>{userData.rol}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Correo Electrónico:</Text></td>
                    <td>{userData.correo}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Teléfono:</Text></td>
                    <td>{userData.telefono}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Dirección:</Text></td>
                    <td>{userData.direccion}</td>
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
                    <td>{userData.fechaNacimiento}</td>
                  </tr>
                  <tr>
                    <td><Text weight={500}>Fecha de Ingreso:</Text></td>
                    <td>{userData.fechaIngreso}</td>
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