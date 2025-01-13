import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';
import '../Estilos/Inspecciones.css';
import axios from 'axios';
import { INSPECTION_ENDPOINTS } from '../Api/Endpoints';

function Inspecciones() {
    const navigate = useNavigate();
    const [inspecciones, setInspecciones] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchInspecciones();
    }, []);

    const fetchInspecciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(INSPECTION_ENDPOINTS.GET_ALL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const inspeccionesFormateadas = response.data.map(insp => ({
                codigo: `IN${insp.idInspeccion}`,
                nombre: insp.idEstablecimientoNavigation?.nombre || 'Sin nombre',
                fecha: new Date(insp.fechaInspeccion).toLocaleDateString('es-ES'),
                prioridad: getPrioridadText(insp.prioridad)
            }));

            setInspecciones(inspeccionesFormateadas);
            setFilteredData(inspeccionesFormateadas);
        } catch (error) {
            console.error('Error al obtener inspecciones:', error);
        }
    };

    const getPrioridadText = (prioridad) => {
        switch(prioridad) {
            case 1: return 'alta';
            case 2: return 'media';
            case 3: return 'baja';
            default: return 'no definida';
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
                    onClick={() => navigate(`/inspecciones/${row.codigo.substring(2)}`)}
                    style={{ cursor: 'pointer' }}
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
