import React, { useState } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';

function Solicitudes() {
    const navigate = useNavigate();

    const initialData = [
        {
            codigo: 'S111793',
            nombre: 'Matadero La Esperanza',
            tipo: 'Matadero',
            inspector: 'Asignar Inspector',
            estado: 'pendiente'
        },
        {
            codigo: 'S596322',
            nombre: 'Planta Procesadora Verde',
            tipo: 'Planta Procesadora',
            inspector: 'Asignar Inspector',
            estado: 'pendiente'
        },
        {
            codigo: 'S587411',
            nombre: 'Frigorífico Frío Norte',
            tipo: 'Frigorífico',
            inspector: 'Asignar Inspector',
            estado: 'pendiente'
        }
    ];

    const [solicitudes, setSolicitudes] = useState(initialData);
    const [filteredData, setFilteredData] = useState(initialData);

    const handleAsignarInspector = (codigo) => {
        const newSolicitudes = solicitudes.map(solicitud => {
            if (solicitud.codigo === codigo) {
                return {
                    ...solicitud,
                    inspector: 'Asignado',
                    estado: 'asignado'
                };
            }
            return solicitud;
        });
        setSolicitudes(newSolicitudes);
        setFilteredData(newSolicitudes);
        navigate(`/solicitudes/asignar-inspector/${codigo}`);
    };

    const handleSearch = (searchTerm) => {
        const filtered = solicitudes.filter(item => 
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...solicitudes];
        
        if (filters.matadero || filters.planta || filters.frigorifico) {
            filtered = filtered.filter(item => 
                (filters.matadero && item.tipo === 'Matadero') ||
                (filters.planta && item.tipo === 'Planta Procesadora') ||
                (filters.frigorifico && item.tipo === 'Frigorífico')
            );
        }

        setFilteredData(filtered);
    };

    const columns = [
        { header: 'Código de Solicitud', key: 'codigo' },
        { header: 'Nombre del Establecimiento', key: 'nombre' },
        { header: 'Tipo de Establecimiento', key: 'tipo' },
        { 
            header: 'Inspector', 
            key: 'inspector',
            render: (value, row) => (
                row.estado === 'pendiente' ? (
                    <button 
                        className="assign-button"
                        onClick={() => handleAsignarInspector(row.codigo)}
                    >
                        {value}
                    </button>
                ) : (
                    <Badge 
                        color="green" 
                        variant="light"
                        size="lg"
                    >
                        {value}
                    </Badge>
                )
            )
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/detalles-solicitud/${row.codigo}`)}
                />
            )
        }
    ];

    return (
        <div className="solicitudes">
            <Header />
            <Menu />
            <SearchBar 
                placeholder="Search"
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filterPlaceholder="Tipo de Establecimiento"
                filterOptions={[
                    { value: 'matadero', label: 'Matadero' },
                    { value: 'planta', label: 'Planta Procesadora' },
                    { value: 'frigorifico', label: 'Frigorífico' }
                ]}
            />
            <DataTable 
                title="Solicitudes Pendientes"
                columns={columns}
                data={filteredData}
            />
        </div>
    );
}

export default Solicitudes;

