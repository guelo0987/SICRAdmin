import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';
import { INSPECTION_ENDPOINTS } from '../Api/Endpoints';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import '../Estilos/Resultados.css';
import { notifications } from '@mantine/notifications';

const Resultados = () => {
  const navigate = useNavigate();
  const [inspecciones, setInspecciones] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchInspeccionesEvaluadas();
  }, []);

  const fetchInspeccionesEvaluadas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(INSPECTION_ENDPOINTS.GET_ALL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta original:', response.data);

      // Filtrar solo las inspecciones evaluadas
      const inspeccionesEvaluadas = response.data
        .filter(insp => insp.fueEvaluada === true && insp.resultadosInspeccions?.length > 0)
        .map(insp => {
          // Tomamos el primer resultado de la inspección
          const primerResultado = insp.resultadosInspeccions[0];
          // Calcular el puntaje basado en los resultados
          const totalItems = insp.resultadosInspeccions.length;
          const itemsCumplidos = insp.resultadosInspeccions.filter(r => r.cumple).length;
          const puntaje = Math.round((itemsCumplidos / totalItems) * 100);

          return {
            idInspeccion: insp.idInspeccion,
            idResultado: primerResultado.idResultado,
            codigo: `IN${insp.idInspeccion}`,
            nombre: insp.idEstablecimientoNavigation?.nombre || 'Sin nombre',
            fecha: new Date(insp.fechaInspeccion).toLocaleDateString('es-ES'),
            resultado: insp.resultado,
            puntaje: puntaje
          };
        });

      console.log('Inspecciones evaluadas:', inspeccionesEvaluadas);
      setInspecciones(inspeccionesEvaluadas);
      setFilteredData(inspeccionesEvaluadas);
    } catch (error) {
      console.error('Error al obtener inspecciones:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar las inspecciones evaluadas',
        color: 'red'
      });
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = inspecciones.filter(item => 
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fecha.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...inspecciones];
    
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
      'Cumple': { color: 'green', label: 'CUMPLE' },
      'No Cumple': { color: 'red', label: 'NO CUMPLE' },
      'En Revision': { color: 'yellow', label: 'EN REVISIÓN' }
    };

    return (
      <Badge 
        color={config[resultado]?.color || 'gray'}
        variant="light"
        size="sm"
        className="resultado-badge"
      >
        {config[resultado]?.label || resultado}
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
      header: 'PUNTAJE',
      key: 'puntaje',
      className: 'puntaje-column',
      render: (value) => (
        <Badge 
          color={value >= 70 ? 'green' : value >= 50 ? 'yellow' : 'red'}
          variant="light"
          size="sm"
        >
          {value}%
        </Badge>
      )
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
          onClick={() => navigate(`/resultados/${row.idResultado}`)}
          style={{ cursor: 'pointer' }}
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