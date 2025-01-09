import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, ActionIcon } from '@mantine/core';
import { IconPlus, IconEdit, IconChevronRight } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Usuarios.css';

const Usuarios = () => {
  const navigate = useNavigate();
  
  const initialData = [
    {
      nombres: 'Juan Marcos',
      apellidos: 'Pérez Ajpop',
      rol: 'Inspector',
      correo: 'juan.perez@email.com'
    },
    {
      nombres: 'Carlos Emanuel',
      apellidos: 'García Cuello',
      rol: 'Administrador',
      correo: 'carlos.garcia@email.com'
    },
    {
      nombres: 'Jessie Melisa',
      apellidos: 'López Mejía',
      rol: 'Inspector',
      correo: 'melisa.lopez@email.com'
    }
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (searchTerm) => {
    const filtered = initialData.filter(item => 
      item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.correo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...initialData];
    
    if (filters.inspector || filters.administrador) {
      filtered = filtered.filter(item => 
        (filters.inspector && item.rol === 'Inspector') ||
        (filters.administrador && item.rol === 'Administrador')
      );
    }

    setFilteredData(filtered);
  };

  const columns = [
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
      key: 'rol'
    },
    {
      header: 'Correo Electrónico',
      key: 'correo'
    },
    {
      header: '',
      key: 'actions',
      render: (value, row) => (
        <Group spacing={4}>
          <ActionIcon
            color="red"
            onClick={() => navigate(`/usuarios/editar/${row.correo}`)}
          >
            <IconEdit size={18} />
          </ActionIcon>
          <IconChevronRight 
            className="action-icon" 
            onClick={() => navigate(`/usuarios/${row.correo}`)}
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
        placeholder="Buscar por nombre, apellido, rol o correo"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterPlaceholder="Rol"
        filterOptions={[
          { value: 'inspector', label: 'Inspector' },
          { value: 'administrador', label: 'Administrador' }
        ]}
      />
      <DataTable 
        title="Gestión de Usuarios"
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default Usuarios; 