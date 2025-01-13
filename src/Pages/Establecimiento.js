import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Establecimiento.css';
import axios from 'axios';
import { ESTABLISHMENT_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';

function Establecimiento() {
    const navigate = useNavigate();
    const [establecimientos, setEstablecimientos] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEstablecimientos();
    }, []);

    const fetchEstablecimientos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(ESTABLISHMENT_ENDPOINTS.GET_ALL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const establecimientosFormateados = response.data.map(est => ({
                codigo: `E${est.idEstablecimiento}`,
                nombre: est.nombre,
                tipo: est.tipoOperacion || 'No especificado',
                operacion: est.estadoEstablecimiento || 'No especificado',
                riesgo: est.riesgo || 'Pendiente'
            }));

            setEstablecimientos(establecimientosFormateados);
            setFilteredData(establecimientosFormateados);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener establecimientos:', error);
            notifications.show({
                title: 'Error',
                message: 'No se pudieron cargar los establecimientos',
                color: 'red'
            });
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = establecimientos.filter(item => 
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.operacion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...establecimientos];
        
        if (filters.activo || filters.inactivo || filters.pendiente) {
            filtered = filtered.filter(item => 
                (filters.activo && item.operacion === 'Activo') ||
                (filters.inactivo && item.operacion === 'Inactivo') ||
                (filters.pendiente && item.operacion === 'Pendiente')
            );
        }

        setFilteredData(filtered);
    };

    const columns = [
        { 
            header: 'Código', 
            key: 'codigo' 
        },
        { 
            header: 'Nombre', 
            key: 'nombre' 
        },
        { 
            header: 'Tipo de Operación', 
            key: 'tipo' 
        },
        { 
            header: 'Estado', 
            key: 'operacion' 
        },
        { 
            header: 'Riesgo', 
            key: 'riesgo' 
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => {
                        const idEstablecimiento = row.codigo.replace('E', '');
                        navigate(`/establecimientos/${idEstablecimiento}`);
                    }}
                />
            )
        }
    ];

    if (loading) {
        return (
            <div className="establecimientos">
                <Header />
                <Menu />
                <div className="content-wrapper">
                    <Loader size="lg" variant="dots" />
                </div>
            </div>
        );
    }

    return (
        <div className="establecimientos">
            <Header />
            <Menu />
            <SearchBar 
                placeholder="Buscar establecimiento"
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filterPlaceholder="Estado"
                filterOptions={[
                    { value: 'activo', label: 'Activo' },
                    { value: 'inactivo', label: 'Inactivo' },
                    { value: 'pendiente', label: 'Pendiente' }
                ]}
            />
            <DataTable 
                title="Establecimientos"
                columns={columns}
                data={filteredData}
            />
        </div>
    );
}

export default Establecimiento;
