import React, { useState } from 'react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import DataTable from '../Componentes/DataTable';
import SearchBar from '../Componentes/SearchBar';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Establecimiento.css';

function Establecimiento() {
    const navigate = useNavigate();

    const initialData = [
        {
            codigo: 'E111793',
            nombre: 'Matadero La Esperanza',
            tipo: 'Matadero',
            operacion: 'Sacrificio'
        },
        {
            codigo: 'E596322',
            nombre: 'Planta Procesadora Verde',
            tipo: 'Planta Procesadora',
            operacion: 'Procesamiento'
        },
        {
            codigo: 'E587411',
            nombre: 'Frigorífico Frío Norte',
            tipo: 'Frigorífico',
            operacion: 'Almacenamiento'
        }
    ];

    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = initialData.filter(item => 
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.operacion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (filters) => {
        let filtered = [...initialData];
        
        if (filters.sacrificio || filters.procesamiento || filters.almacenamiento) {
            filtered = filtered.filter(item => 
                (filters.sacrificio && item.operacion === 'Sacrificio') ||
                (filters.procesamiento && item.operacion === 'Procesamiento') ||
                (filters.almacenamiento && item.operacion === 'Almacenamiento')
            );
        }

        setFilteredData(filtered);
    };

    const columns = [
        { 
            header: 'Código de Establecimiento', 
            key: 'codigo' 
        },
        { 
            header: 'Nombre del Establecimiento', 
            key: 'nombre' 
        },
        { 
            header: 'Tipo de Establecimiento', 
            key: 'tipo' 
        },
        { 
            header: 'Tipo de Operación', 
            key: 'operacion' 
        },
        {
            header: '',
            key: 'actions',
            render: (value, row) => (
                <IconChevronRight 
                    className="action-icon" 
                    onClick={() => navigate(`/establecimientos/${row.codigo}`)}
                />
            )
        }
    ];

    return (
        <div className="establecimientos">
            <Header />
            <Menu />
            <SearchBar 
                placeholder="Search"
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                filterPlaceholder="Tipo de Operación"
                filterOptions={[
                    { value: 'sacrificio', label: 'Sacrificio' },
                    { value: 'procesamiento', label: 'Procesamiento' },
                    { value: 'almacenamiento', label: 'Almacenamiento' }
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
