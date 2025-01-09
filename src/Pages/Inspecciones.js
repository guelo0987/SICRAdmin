import React, { useState } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';
import '../Estilos/Inspecciones.css';

function Inspecciones() {
    const navigate = useNavigate();

    const initialData = [
        {
            codigo: 'IN11793',
            nombre: 'Matadero La Esperanza',
            fecha: '12/03/2024',
            prioridad: 'alta'
        },
        {
            codigo: 'INR6322',
            nombre: 'Planta Procesadora Verde',
            fecha: '20/12/2024',
            prioridad: 'media'
        },
        {
            codigo: 'IN87411',
            nombre: 'Frigorífico Frío Norte',
            fecha: '25/08/2024',
            prioridad: 'baja'
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
        
        if (filters.alta || filters.media || filters.baja) {
            filtered = filtered.filter(item => 
                (filters.alta && item.prioridad === 'alta') ||
                (filters.media && item.prioridad === 'media') ||
                (filters.baja && item.prioridad === 'baja')
            );
        }

        setFilteredData(filtered);
    };

    const getPrioridadColor = (prioridad) => {
        switch (prioridad) {
            case 'alta':
                return 'red';
            case 'media':
                return 'yellow';
            case 'baja':
                return 'green';
            default:
                return 'gray';
        }
    };

    const columns = [
        { 
            header: 'Código de Inspección', 
            key: 'codigo' 
        },
        { 
            header: 'Nombre del Establecimiento', 
            key: 'nombre' 
        },
        { 
            header: 'Fecha Inspección', 
            key: 'fecha' 
        },
        {
            header: 'Prioridad',
            key: 'prioridad',
            render: (value) => (
                <Badge 
                    color={getPrioridadColor(value)}
                    variant="light"
                    size="sm"
                    className="priority-badge"
                >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </Badge>
            )
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/inspecciones/${row.codigo}`)}
                />
            )
        }
    ];

    return (
        <div className="inspecciones">
            <Header />
            <Menu />
            <div className="inspecciones-content">
                <SearchBar 
                    placeholder="Buscar por código, nombre o fecha"
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Prioridad"
                    filterOptions={[
                        { value: 'alta', label: 'Alta' },
                        { value: 'media', label: 'Media' },
                        { value: 'baja', label: 'Baja' }
                    ]}
                />
                <DataTable 
                    title="Inspecciones"
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </div>
    );
}

export default Inspecciones;
