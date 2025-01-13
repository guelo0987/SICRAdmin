import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { Button, Badge, Group } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import '../Estilos/InspeccionesPendientes.css';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { INSPECTION_ENDPOINTS } from '../Api/Endpoints';

function InspeccionesPendientes() {
    const navigate = useNavigate();
    const [inspecciones, setInspecciones] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const getPrioridadText = (prioridad) => {
        switch(prioridad) {
            case 1: return 'Alta';
            case 2: return 'Media';
            case 3: return 'Baja';
            default: return 'No definida';
        }
    };

    const getBadgeColor = (prioridad) => {
        switch(prioridad) {
            case 'Alta': return 'red';
            case 'Media': return 'yellow';
            case 'Baja': return 'green';
            default: return 'gray';
        }
    };

    const columns = [
        {
            header: 'CÓDIGO DE ESTABLECIMIENTO',
            key: 'codigoEstablecimiento'
        },
        {
            header: 'NOMBRE DE ESTABLECIMIENTO',
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

    const handleSearch = (searchTerm) => {
        const filtered = inspecciones.filter(item => 
            item.codigoEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombreEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipoEstablecimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.prioridad.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...inspecciones];
        
        if (filters.alta || filters.media || filters.baja) {
            filtered = filtered.filter(item => 
                (filters.alta && item.prioridad === 'Alta') ||
                (filters.media && item.prioridad === 'Media') ||
                (filters.baja && item.prioridad === 'Baja')
            );
        }

        setFilteredData(filtered);
    };

    const handleGenerarInspeccionAleatoria = async () => {
        try {
            const token = localStorage.getItem('token');
            const fechaInspeccion = new Date();
            fechaInspeccion.setDate(fechaInspeccion.getDate() + 7); // Una semana después

            const response = await axios.post(
                INSPECTION_ENDPOINTS.CREATE_RANDOM,
                {
                    fechaInspeccion: fechaInspeccion.toISOString()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Formatear la inspección aleatoria recién creada
            const inspeccionAleatoria = {
                codigoEstablecimiento: `IN${response.data.idInspeccion}`,
                nombreEstablecimiento: response.data.idEstablecimientoNavigation?.nombre || 'Sin nombre',
                tipoEstablecimiento: response.data.idEstablecimientoNavigation?.tipoOperacion || 'No especificado',
                prioridad: getPrioridadText(response.data.prioridad),
                inspector: response.data.idAdminInspector ? `Inspector ${response.data.idAdminInspector}` : 'Sin asignar'
            };

            // Actualizar el estado con solo la inspección aleatoria
            setInspecciones([inspeccionAleatoria]);
            setFilteredData([inspeccionAleatoria]);

            notifications.show({
                title: 'Éxito',
                message: 'Inspección aleatoria generada correctamente',
                color: 'green'
            });

        } catch (error) {
            console.error('Error al generar inspección aleatoria:', error);
            notifications.show({
                title: 'Error',
                message: 'No se pudo generar la inspección aleatoria',
                color: 'red'
            });
        }
    };

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
                title={
                    <Group position="apart">
                        <span>Generar Inspeccion Aleatorio</span>
                        <Group>
                            <Button
                                color="red"
                                onClick={handleGenerarInspeccionAleatoria}
                            >
                                Generar Inspección Aleatoria
                            </Button>
                        </Group>
                    </Group>
                }
                columns={columns}
                data={filteredData}
            />
        </div>
    );
}

export default InspeccionesPendientes; 