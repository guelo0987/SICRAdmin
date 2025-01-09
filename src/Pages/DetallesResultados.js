import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Paper, 
  Text, 
  Group,
  Stack,
  Badge,
  Divider,
  Modal
} from '@mantine/core';
import { 
  IconChevronLeft,
  IconFileDownload,
  IconAlertTriangle,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesResultados.css';
import ResultadoPDF from '../Componentes/ResultadoPDF';

const DetallesResultados = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  // Datos de ejemplo (esto vendría de tu API)
  const resultadoData = {
    codigo: 'IN112024',
    fecha: '15/12/2024',
    establecimiento: 'Matadero La Esperanza',
    inspector: 'Juan Pérez',
    resultado: 'denegado',
    normativas: [
      {
        nombre: 'Buenas Prácticas de Manufactura (BPM)',
        lista: 'Lista de Verificación HACCP',
        preguntas: [
          {
            pregunta: '¿Las instalaciones están libres de contaminantes como polvo, suciedad o plagas?',
            respuesta: 'Si'
          },
          {
            pregunta: '¿Se realizan prácticas adecuadas de limpieza y desinfección en todas las áreas de procesamiento?',
            respuesta: 'No',
            observacion: 'Se observaron algunas áreas del equipo de procesamiento con residuos de carne. Se recomienda una limpieza más exhaustiva.'
          },
          {
            pregunta: '¿El personal utiliza vestimenta adecuada (guantes, botas, mascarillas, etc.)?',
            respuesta: 'No'
          }
        ]
      }
    ]
  };

  const getResultadoBadge = (resultado) => {
    const config = {
      aprobado: { color: 'green', icon: <IconCheck size={16} />, label: 'Aprobado' },
      denegado: { color: 'red', icon: <IconX size={16} />, label: 'Denegado' }
    };

    return (
      <Badge 
        color={config[resultado].color}
        variant="light"
        size="lg"
        leftSection={config[resultado].icon}
      >
        {config[resultado].label}
      </Badge>
    );
  };

  return (
    <div className="detalles-resultados">
      <Header />
      <Menu />
      <div className="resultados-content">
        <div className="content-header">
          <Group position="apart" align="flex-start" style={{ marginBottom: '24px' }}>
            <Group>
              <Button
                variant="subtle"
                color="gray"
                leftIcon={<IconChevronLeft size={16} />}
                onClick={() => navigate('/resultados')}
              >
                Volver
              </Button>
              <Text size="xl" weight={600}>Resultado de Inspección</Text>
            </Group>
          </Group>

          <Group position="right" spacing="md">
            {resultadoData.resultado === 'denegado' && (
              <Button
                color="red"
                variant="light"
                leftIcon={<IconAlertTriangle size={16} />}
                onClick={() => navigate(`/resultados/${id}/irregularidades`)}
              >
                Ver Irregularidades
              </Button>
            )}
            <Button
              color="red"
              leftIcon={<IconFileDownload size={16} />}
              onClick={() => setPdfModalOpen(true)}
            >
              Generar Informe
            </Button>
          </Group>
        </div>

        <Paper shadow="sm" radius="md" className="info-section">
          <Stack spacing="xs">
            <Group position="apart">
              <Text>Código de Inspección: {resultadoData.codigo}</Text>
              {getResultadoBadge(resultadoData.resultado)}
            </Group>
            <Text>Fecha de Inspección: {resultadoData.fecha}</Text>
            <Text>Establecimiento: {resultadoData.establecimiento}</Text>
            <Text>Inspector: {resultadoData.inspector}</Text>
          </Stack>
        </Paper>

        {resultadoData.normativas.map((normativa, index) => (
          <Paper key={index} shadow="sm" radius="md" className="normativa-section">
            <Stack spacing="md">
              <div>
                <Text weight={600} size="lg">{normativa.nombre}</Text>
                <Text color="dimmed">{normativa.lista}</Text>
              </div>
              
              <Divider />
              
              <Stack spacing="lg">
                {normativa.preguntas.map((item, idx) => (
                  <div key={idx} className="pregunta-item">
                    <Group position="apart" align="flex-start">
                      <Text>{item.pregunta}</Text>
                      <Badge 
                        color={item.respuesta === 'Si' ? 'green' : 'red'}
                        variant="light"
                      >
                        {item.respuesta}
                      </Badge>
                    </Group>
                    {item.observacion && (
                      <Text color="dimmed" size="sm" mt="xs">
                        Observación: {item.observacion}
                      </Text>
                    )}
                  </div>
                ))}
              </Stack>
            </Stack>
          </Paper>
        ))}
      </div>

      <Modal
        opened={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        title="Vista previa del informe"
        size="xl"
        fullScreen
      >
        <ResultadoPDF data={resultadoData} />
      </Modal>
    </div>
  );
};

export default DetallesResultados;
