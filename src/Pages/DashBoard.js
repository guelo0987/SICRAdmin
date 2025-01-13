import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import StatCards from '../Componentes/StatCards';
import DataTable from '../Componentes/DataTable';
import { INSPECTION_ENDPOINTS } from '../Api/Endpoints';
import axios from 'axios';
import { Badge } from '@mantine/core';

function DashBoard() {
  const [inspecciones, setInspecciones] = useState([]);

  useEffect(() => {
    const fetchInspecciones = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(INSPECTION_ENDPOINTS.GET_ALL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Filtrar inspecciones de los últimos 2 meses
        const dosMesesAtras = new Date();
        dosMesesAtras.setMonth(dosMesesAtras.getMonth() - 2);

        const inspeccionesFormateadas = response.data
          .filter(insp => new Date(insp.fechaInspeccion) >= dosMesesAtras)
          .map(insp => ({
            codigo: `IN${insp.idInspeccion}`,
            nombre: insp.idEstablecimientoNavigation 
              ? insp.idEstablecimientoNavigation.nombre 
              : insp.idSolicitudNavigation.nombreEst,
            tipo: insp.idEstablecimientoNavigation 
              ? insp.idEstablecimientoNavigation.tipoOperacion 
              : insp.idSolicitudNavigation.tipoOperacion,
            direccion: insp.idEstablecimientoNavigation 
              ? insp.idEstablecimientoNavigation.direccion 
              : insp.idSolicitudNavigation.direccion,
            fecha: new Date(insp.fechaInspeccion).toLocaleDateString(),
            resultado: insp.resultado || 'Pendiente'
          }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        setInspecciones(inspeccionesFormateadas);
      } catch (error) {
        console.error('Error al obtener inspecciones:', error);
      }
    };

    fetchInspecciones();
  }, []);

  const getResultadoBadge = (resultado) => {
    const config = {
      'Cumple': { color: 'green', label: 'CUMPLE' },
      'No Cumple': { color: 'red', label: 'NO CUMPLE' },
      'En Revision': { color: 'yellow', label: 'EN REVISIÓN' },
      'Pendiente': { color: 'gray', label: 'PENDIENTE' }
    };

    return (
      <Badge 
        color={config[resultado]?.color || 'gray'}
        variant="light"
        size="sm"
      >
        {config[resultado]?.label || resultado.toUpperCase()}
      </Badge>
    );
  };

  const columns = [
    { header: 'Código', key: 'codigo' },
    { header: 'Nombre del Establecimiento', key: 'nombre' },
    { header: 'Tipo de Operación', key: 'tipo' },
    { header: 'Dirección', key: 'direccion' },
    { header: 'Fecha de Inspección', key: 'fecha' },
    { 
      header: 'Resultado', 
      key: 'resultado',
      render: (value) => getResultadoBadge(value)
    }
  ];

  return (
    <div className="DashBoard">
      <Header />
      <Menu />
      <StatCards />
      <DataTable 
        title="Inspecciones de los Últimos 2 Meses"
        columns={columns}
        data={inspecciones}
      />
    </div>
  );
}

export default DashBoard;
