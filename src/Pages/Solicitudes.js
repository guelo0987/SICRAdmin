import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { SOLICITUD_ENDPOINTS } from '../Api/Endpoints';

function Solicitudes() {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('en espera');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(SOLICITUD_ENDPOINTS.GET_ALL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const solicitudesFormateadas = response.data.map(sol => {
                    const inspeccionAsignada = sol.inspecciones?.[0];
                    const fechaAdmitida = sol.fechaAdmitida ? 
                        new Date(sol.fechaAdmitida) : null;
                    const estadoSolicitud = sol.estadoSolicitud?.toLowerCase() || 'pendiente';

                    return {
                        codigo: `S${sol.idSolicitud}`,
                        nombre: sol.nombreEst || 'Sin nombre',
                        tipo: sol.tipoOperacion || 'No especificado',
                        direccion: sol.direccion || 'No especificada',
                        coordenadas: sol.coordenadas || 'No especificadas',
                        fechaAdmision: fechaAdmitida,
                        fechaAdmisionStr: fechaAdmitida ? fechaAdmitida.toLocaleDateString('es-ES') : 'No disponible',
                        estado: estadoSolicitud,
                        inspector: inspeccionAsignada ? 
                            `Inspector ${inspeccionAsignada.idAdminInspector}` : 
                            estadoSolicitud === 'aprobada' ? 'Asignar Inspector' : 'Solicitud no aprobada'
                    };
                });

                setSolicitudes(solicitudesFormateadas);
                const solicitudesEnEspera = solicitudesFormateadas.filter(
                    sol => sol.estado === 'en espera'
                );
                setFilteredData(solicitudesEnEspera);
            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
            }
        };

        fetchSolicitudes();
    }, []);

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
        navigate(`/solicitudes/asignar-inspector/${codigo.substring(1)}`);
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
        
        // Filtrar por estado
        if (filters.todas) {
            setEstadoFiltro('todas');
        } else if (filters.enEspera) {
            filtered = filtered.filter(item => item.estado === 'en espera');
            setEstadoFiltro('en espera');
        } else if (filters.aprobada) {
            filtered = filtered.filter(item => item.estado === 'aprobada');
            setEstadoFiltro('aprobada');
        }
        
        // Filtrar por tipo de establecimiento
        if (filters.matadero || filters.planta || filters.frigorifico) {
            filtered = filtered.filter(item => 
                (filters.matadero && item.tipo === 'Matadero') ||
                (filters.planta && item.tipo === 'Planta Procesadora') ||
                (filters.frigorifico && item.tipo === 'Frigorífico')
            );
        }

        // Filtrar por rango de fechas
        if (fechaInicio && fechaFin) {
            filtered = filtered.filter(item => {
                if (!item.fechaAdmision) return false;
                return item.fechaAdmision >= fechaInicio && 
                       item.fechaAdmision <= fechaFin;
            });
        }

        setFilteredData(filtered);
    };

    const columns = [
        { header: 'Código', key: 'codigo' },
        { header: 'Nombre Establecimiento', key: 'nombre' },
        { header: 'Tipo de Operación', key: 'tipo' },
        { header: 'Dirección', key: 'direccion' },
        { header: 'Fecha Admisión', key: 'fechaAdmision' },
        { header: 'Estado', key: 'estado' },
        { 
            header: 'Inspector', 
            key: 'inspector',
            render: (value, row) => {
                if (row.estado === 'aprobada') {
                    if (!value.includes('Inspector')) {
                        return (
                            <button 
                                className="assign-button"
                                onClick={() => handleAsignarInspector(row.codigo)}
                            >
                                {value}
                            </button>
                        );
                    } else {
                        return (
                            <Badge 
                                color="green" 
                                variant="light"
                                size="lg"
                            >
                                {value}
                            </Badge>
                        );
                    }
                } else {
                    return (
                        <Badge 
                            color="gray" 
                            variant="light"
                            size="lg"
                        >
                            {value}
                        </Badge>
                    );
                }
            }
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/detalles-solicitud/${row.codigo.substring(1)}`)}
                />
            )
        }
    ];

    return (
        <div className="solicitudes">
            <Header />
            <Menu />
            <div className="filters-container">
                <SearchBar 
                    placeholder="Buscar solicitud"
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Estado de Solicitud"
                    filterOptions={[
                        { value: 'todas', label: 'Todas las solicitudes' },
                        { value: 'enEspera', label: 'En espera' },
                        { value: 'aprobada', label: 'Aprobadas' }
                    ]}
                />
                <Group spacing="xs">
                    <DatePickerInput
                        placeholder="Fecha inicio"
                        value={fechaInicio}
                        onChange={(value) => {
                            setFechaInicio(value);
                            handleFilterChange({});
                        }}
                        locale="es"
                        clearable
                    />
                    <DatePickerInput
                        placeholder="Fecha fin"
                        value={fechaFin}
                        onChange={(value) => {
                            setFechaFin(value);
                            handleFilterChange({});
                        }}
                        locale="es"
                        clearable
                    />
                </Group>
            </div>
            <DataTable 
                title={`Solicitudes ${estadoFiltro === 'todas' ? '' : estadoFiltro}`}
                columns={columns}
                data={filteredData.map(item => ({
                    ...item,
                    fechaAdmision: item.fechaAdmisionStr
                }))}
            />
        </div>
    );
}

export default Solicitudes;

