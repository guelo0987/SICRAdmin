import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Sanciones.css';

const Sanciones = () => {
  const navigate = useNavigate();

  const initialData = [
    {
      codigo: 'E111793',
      nombre: 'Matadero La Esperanza',
      fecha: '12/09/2024',
      inspector: 'Juan Polo',
      estado: 'Pendiente'
    },
    {
      codigo: 'E596322',
      nombre: 'Planta Procesadora Verde',
      fecha: '20/12/2024',
      inspector: 'Juan Polo',
      estado: 'Pendiente'
    },
    {
      codigo: 'E587411',
      nombre: 'Frigorífico Frío Norte',
      fecha: '25/08/2024',
      inspector: 'Juan Polo',
      estado: 'Pendiente'
    }
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (searchTerm) => {
    const filtered = initialData.filter(item => 
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inspector.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...initialData];
    
    if (filters.pendiente || filters.procesado || filters.archivado) {
      filtered = filtered.filter(item => 
        (filters.pendiente && item.estado === 'Pendiente') ||
        (filters.procesado && item.estado === 'Procesado') ||
        (filters.archivado && item.estado === 'Archivado')
      );
    }

    setFilteredData(filtered);
  };

  const getEstadoBadge = (estado) => {
    const config = {
      'Pendiente': { color: 'yellow', label: 'PENDIENTE' },
      'Procesado': { color: 'green', label: 'PROCESADO' },
      'Archivado': { color: 'gray', label: 'ARCHIVADO' }
    };

    return (
      <Badge 
        color={config[estado].color}
        variant="light"
        size="sm"
        className="estado-badge"
      >
        {config[estado].label}
      </Badge>
    );
  };

  const columns = [
    { 
      header: 'Código de Establecimiento',
      key: 'codigo',
      className: 'codigo-column'
    },
    { 
      header: 'Nombre del Establecimiento',
      key: 'nombre',
      className: 'nombre-column'
    },
    { 
      header: 'Fecha Inspección',
      key: 'fecha',
      className: 'fecha-column'
    },
    {
      header: 'Inspector',
      key: 'inspector'
    },
    {
      header: 'Estado',
      key: 'estado',
      render: (value) => getEstadoBadge(value)
    },
    {
      header: '',
      key: 'actions',
      render: (value, row) => (
        <IconChevronRight 
          className="action-icon" 
          onClick={() => navigate(`/sanciones/${row.codigo}`)}
        />
      )
    }
  ];

  return (
    <div className="sanciones">
      <Header />
      <Menu />
      <div className="sanciones-header">
        <Button
          color="red"
          leftIcon={<IconPlus size={16} />}
          onClick={() => navigate('/sanciones/agregar')}
        >
          Agregar Sanción
        </Button>
      </div>
      <SearchBar 
        placeholder="Search"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterPlaceholder="Estado"
        filterOptions={[
          { value: 'pendiente', label: 'Pendiente' },
          { value: 'procesado', label: 'Procesado' }
        ]}
      />
      <DataTable 
        title="Sanciones"
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default Sanciones;
