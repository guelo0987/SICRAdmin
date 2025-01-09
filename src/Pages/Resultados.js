import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Resultados.css';

const Resultados = () => {
  const navigate = useNavigate();

  const initialData = [
    {
      codigo: 'IN11793',
      nombre: 'Matadero La Esperanza',
      fecha: '12/03/2024',
      resultado: 'aprobado'
    },
    {
      codigo: 'INR6322',
      nombre: 'Planta Procesadora Verde',
      fecha: '20/12/2024',
      resultado: 'denegado'
    },
    {
      codigo: 'IN87411',
      nombre: 'Frigorífico Frío Norte',
      fecha: '25/08/2024',
      resultado: 'aprobado'
    }
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (searchTerm) => {
    const filtered = initialData.filter(item => 
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fecha.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...initialData];
    
    if (filters.aprobado || filters.denegado) {
      filtered = filtered.filter(item => 
        (filters.aprobado && item.resultado === 'aprobado') ||
        (filters.denegado && item.resultado === 'denegado')
      );
    }

    setFilteredData(filtered);
  };

  const getResultadoBadge = (resultado) => {
    const config = {
      aprobado: { color: 'green', label: 'APROBADO' },
      denegado: { color: 'red', label: 'DENEGADO' }
    };

    return (
      <Badge 
        color={config[resultado].color}
        variant="light"
        size="sm"
        className="resultado-badge"
      >
        {config[resultado].label}
      </Badge>
    );
  };

  const columns = [
    { 
      header: 'CÓDIGO DE INSPECCIÓN',
      key: 'codigo',
      className: 'codigo-column'
    },
    { 
      header: 'NOMBRE DEL ESTABLECIMIENTO',
      key: 'nombre',
      className: 'nombre-column'
    },
    { 
      header: 'FECHA INSPECCIÓN',
      key: 'fecha',
      className: 'fecha-column'
    },
    {
      header: 'RESULTADO',
      key: 'resultado',
      className: 'resultado-column',
      render: (value) => getResultadoBadge(value)
    },
    {
      header: '',
      key: 'actions',
      render: (value, row) => (
        <IconChevronRight 
          className="action-icon" 
          onClick={() => navigate(`/resultados/${row.codigo}`)}
        />
      )
    }
  ];

  return (
    <div className="resultados">
      <Header />
      <Menu />
      <SearchBar 
        placeholder="Buscar por código, nombre o fecha"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterPlaceholder="Estado"
        filterOptions={[
          { value: 'aprobado', label: 'Aprobado' },
          { value: 'denegado', label: 'Denegado' }
        ]}
      />
      <DataTable 
        title="Resultados de Inspección"
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default Resultados;