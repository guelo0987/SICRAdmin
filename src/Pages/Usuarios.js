import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, ActionIcon, Badge } from '@mantine/core';
import { IconPlus, IconEdit, IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { USER_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Usuarios.css';

const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(USER_ENDPOINTS.GET_ALL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const usuariosFormateados = response.data.map(usuario => ({
          id: usuario.idAdmin,
          nombres: usuario.nombre,
          apellidos: usuario.apellidos || 'No especificado',
          rol: usuario.rol,
          correo: usuario.email,
          telefono: usuario.telefono,
          username: usuario.username,
          direccion: usuario.direccion || 'No especificada',
          fechaIngreso: new Date(usuario.fechaIngreso).toLocaleDateString('es-ES'),
          fechaNacimiento: usuario.fechaNacimiento ? 
            new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES') : 
            'No especificada'
        }));

        setUsuarios(usuariosFormateados);
        setFilteredData(usuariosFormateados);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        notifications.show({
          title: 'Error',
          message: 'No se pudieron cargar los usuarios',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = usuarios.filter(item => 
      item.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...usuarios];
    
    if (filters.admin || filters.empleado) {
      filtered = filtered.filter(item => 
        (filters.admin && item.rol === 'Admin') ||
        (filters.empleado && item.rol === 'Empleado')
      );
    }

    setFilteredData(filtered);
  };

  const columns = [
    { 
      header: 'Usuario',
      key: 'username'
    },
    { 
      header: 'Nombres',
      key: 'nombres'
    },
    { 
      header: 'Apellidos',
      key: 'apellidos'
    },
    {
      header: 'Rol',
      key: 'rol',
      render: (value) => (
        <Badge 
          color={value === 'Admin' ? 'blue' : 'green'}
          variant="light"
        >
          {value}
        </Badge>
      )
    },
    {
      header: 'Correo',
      key: 'correo'
    },
    {
      header: 'Teléfono',
      key: 'telefono'
    },
    {
      header: '',
      key: 'actions',
      render: (value, row) => (
        <Group spacing={4}>
          <ActionIcon
            color="red"
            onClick={() => navigate(`/usuarios/editar/${row.id}`)}
          >
            <IconEdit size={18} />
          </ActionIcon>
          <IconChevronRight 
            className="action-icon" 
            onClick={() => navigate(`/usuarios/${row.id}`)}
          />
        </Group>
      )
    }
  ];

  return (
    <div className="usuarios">
      <Header />
      <Menu />
      <div className="usuarios-header">
        <Button
          color="red"
          leftIcon={<IconPlus size={16} />}
          onClick={() => navigate('/usuarios/agregar')}
        >
          Agregar Usuario
        </Button>
      </div>
      <SearchBar 
        placeholder="Buscar por nombre, usuario, rol o correo"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterPlaceholder="Rol"
        filterOptions={[
          { value: 'admin', label: 'Admin' },
          { value: 'empleado', label: 'Empleado' }
        ]}
      />
      <DataTable 
        title="Gestión de Usuarios"
        columns={columns}
        data={filteredData}
        loading={loading}
      />
    </div>
  );
};

export default Usuarios; 