import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Paper,
    Title,
    Text,
    Select,
    Button,
    Group,
    Stack
} from '@mantine/core';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/InspeccionCreada.css';

const InspeccionCreada = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedInspector, setSelectedInspector] = useState(null);

    // Usar el id para obtener los datos del establecimiento
    const inspeccionData = {
        id: id, // Usar el id
        fechaInspeccion: '15/09/2025',
        establecimiento: 'Matadero La Esperanza',
        direccion: 'Calle Ficticia 123, Ciudad',
        coordenadas: '40° 24\' 59" N; 03° 42\' 09" O',
        tipoEstablecimiento: 'Matadero'
    };

    const handleSubmit = () => {
        if (selectedInspector) {
            // Aquí iría la lógica para asignar el inspector
            navigate('/establecimientos/pendientes');
        }
    };

    return (
        <div className="inspeccion-creada">
            <Header />
            <Menu />
            <div className="inspeccion-content">
                <Title order={2} mb="xl">Asignar Inspector</Title>

                <Paper shadow="sm" radius="md" p="xl" className="info-card">
                    <Stack spacing="xs">
                        <Text weight={500}>Inspección creada</Text>
                        <Text size="sm">Fecha Inspección: {inspeccionData.fechaInspeccion}</Text>
                        
                        <Text size="sm">
                            Nombre del Establecimiento: {inspeccionData.establecimiento}
                        </Text>
                        <Text size="sm">
                            Dirección: {inspeccionData.direccion}
                        </Text>
                        <Text size="sm">
                            Coordenadas del Establecimiento: {inspeccionData.coordenadas}
                        </Text>
                        <Text size="sm">
                            Tipo de Establecimiento: {inspeccionData.tipoEstablecimiento}
                        </Text>
                    </Stack>
                </Paper>

                <Paper shadow="sm" radius="md" p="xl" mt="md">
                    <Stack spacing="md">
                        <Select
                            label="Inspector"
                            placeholder="Seleccionar inspector"
                            value={selectedInspector}
                            onChange={setSelectedInspector}
                            data={[
                                { value: 'inspector1', label: 'Juan Pérez' },
                                { value: 'inspector2', label: 'María García' },
                                { value: 'inspector3', label: 'Carlos López' }
                            ]}
                            required
                        />

                        <Group position="right" mt="xl">
                            <Button 
                                variant="outline" 
                                color="gray"
                                onClick={() => navigate('/establecimientos/pendientes')}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                color="red"
                                onClick={handleSubmit}
                                disabled={!selectedInspector}
                            >
                                Asignar
                            </Button>
                        </Group>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default InspeccionCreada; 