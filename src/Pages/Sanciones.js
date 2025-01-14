import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { SANCION_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Sanciones.css';

const Sanciones = () => {
  const navigate = useNavigate();
  const [sanciones, setSanciones] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchSanciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(SANCION_ENDPOINTS.GET_ALL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sancionesFormateadas = response.data.map(sancion => ({
          id: sancion.idSancion,
          codigo: `S${sancion.idSancion}`,
          descripcion: sancion.descripcion,
          monto: sancion.monto.toFixed(2),
          irregularidades: sancion.sancionIrregularidads.length
        }));

        setSanciones(sancionesFormateadas);
        setFilteredData(sancionesFormateadas);
      } catch (error) {
        console.error('Error al obtener sanciones:', error);
      }
    };

    fetchSanciones();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = sanciones.filter(item => 
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.monto.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const columns = [
    { 
      header: 'Código',
      key: 'codigo',
      className: 'codigo-column'
    },
    { 
      header: 'Descripción',
      key: 'descripcion',
      className: 'descripcion-column'
    },
    { 
      header: 'Monto (S/.)',
      key: 'monto',
      render: (value) => (
        <Badge 
          color="blue" 
          variant="light"
          size="lg"
        >
          S/. {value}
        </Badge>
      )
    },
    {
      header: '',
      key: 'actions',
      render: (value, row) => (
        <IconChevronRight 
          className="action-icon" 
          onClick={() => navigate(`/sanciones/${row.id}`)}
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
        placeholder="Buscar por código, descripción o monto"
        onSearch={handleSearch}
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
