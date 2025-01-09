import React from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import StatCards from '../Componentes/StatCards';
import DataTable from '../Componentes/DataTable';

function DashBoard() {
  // Definición de columnas
  const columns = [
    { header: 'Nombre del Establecimiento', key: 'nombre' },
    { header: 'Tipo de Establecimiento', key: 'tipo' },
    { header: 'Dirección', key: 'direccion' },
    { header: 'Fecha de Registro', key: 'fecha' },
    { 
      header: 'Estado de Inspección', 
      key: 'estado',
      render: (value) => (
        <span className={`status ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    }
  ];

  // Datos de ejemplo
  const data = [
    {
      nombre: 'Matadero La Esperanza',
      tipo: 'Matadero',
      direccion: '089 Kutch Green Apt. 448',
      fecha: '14 Feb 2019',
      estado: 'Aprobado'
    },
    {
      nombre: 'Planta Procesadora Verde',
      tipo: 'Planta Procesadora',
      direccion: '979 Immanuel Ferry Suite 526',
      fecha: '14 Feb 2019',
      estado: 'Aprobado'
    },
    {
      nombre: 'Frigorífico Frío Norte',
      tipo: 'Frigorífico',
      direccion: '8587 Frida Ports',
      fecha: '14 Feb 2019',
      estado: 'Aprobado'
    }
  ];

  return (
    <div className="DashBoard">
      <Header />
      <Menu />
      <StatCards />
      <DataTable 
        title="Últimos Registros"
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default DashBoard;
