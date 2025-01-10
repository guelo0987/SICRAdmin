import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { Button, Badge, Group } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import '../Estilos/InspeccionesPendientes.css';

function InspeccionesPendientes() {
    const navigate = useNavigate();
    
    const initialData = [
        {
            codigoEstablecimiento: 'E111793',
            nombreEstablecimiento: 'Matadero La Esperanza',
            tipoEstablecimiento: 'Matadero',
            prioridad: 'Alta',
            inspector: 'Asignar inspector'
        },
        {
            codigoEstablecimiento: 'E596322',
            nombreEstablecimiento: 'Planta Procesadora Verde',
            tipoEstablecimiento: 'Planta Procesadora',
            prioridad: 'Media',
            inspector: 'Asignar inspector'
        },
        {
            codigoEstablecimiento: 'E587411',
            nombreEstablecimiento: 'Frigorifico Frío Norte',
            tipoEstablecimiento: 'Frigorífico',
            prioridad: 'Baja',
            inspector: 'Asignar inspector'
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.codigoEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombreEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipoEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.prioridad.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        
        if (filters.alta || filters.media || filters.baja) {
            filtered = filtered.filter(item => 
                (filters.alta && item.prioridad === 'Alta') ||
                (filters.media && item.prioridad === 'Media') ||
                (filters.baja && item.prioridad === 'Baja')
            );
        }

        setFilteredData(filtered);
    };

    const getBadgeColor = (prioridad) => {
        switch(prioridad.toLowerCase()) {
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
            header: 'CÓDIGO DE ESTABLECIMIENTO',
            key: 'codigoEstablecimiento'
        },
        { 
            header: 'NOMBRE DEL ESTABLECIMIENTO',
            key: 'nombreEstablecimiento'
        },
        { 
            header: 'TIPO DE ESTABLECIMIENTO',
            key: 'tipoEstablecimiento'
        },
        { 
            header: 'PRIORIDAD',
            key: 'prioridad',
            render: (value) => (
                <Badge 
                    color={getBadgeColor(value)}
                    variant="light"
                    size="sm"
                    styles={{
                        root: {
                            textTransform: 'uppercase',
                            fontWeight: 500
                        }
                    }}
                >
                    {value}
                </Badge>
            )
        },
        {
            header: 'INSPECTOR',
            key: 'inspector',
            render: (value, row) => (
                <Group position="left" spacing="md" noWrap>
                    <Button
                        variant="filled"
                        color="red"
                        size="xs"
                        styles={{
                            root: {
                                backgroundColor: '#D94A3D'
                            }
                        }}
                        onClick={() => navigate(`/inspecciones/${row.codigoEstablecimiento}/asignar`)}
                    >
                        Asignar inspector
                    </Button>
                    <IconChevronRight 
                        className="action-icon"
                        onClick={() => navigate(`/inspecciones/${row.codigoEstablecimiento}`)}
                    />
                </Group>
            )
        }
    ];

    return (
        <div className="inspecciones-pendientes">
            <Header />
            <Menu />
            <SearchBar 
                placeholder="Buscar por código, nombre o tipo"
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
                title="Inspecciones Pendientes"
                columns={columns}
                data={filteredData}
            />
        </div>
    );
}

export default InspeccionesPendientes; 