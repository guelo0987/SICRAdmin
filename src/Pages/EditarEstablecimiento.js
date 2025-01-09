import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import Formulario from '../Componentes/Formulario';
import '../Estilos/EditarEstablecimiento.css';
import { IconChevronDown } from '@tabler/icons-react';

const EditarEstablecimiento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "Matadero La Esperanza",
    direccion: "Calle Ficticia 123, Ciudad",
    coordenadas: "40° 24' 59\" N, 03° 42' 09\" O",
    tipo: "matadero",
    operacion: "sacrificio",
    producto: "producto_a",
    volumenProcesado: "volumen_a",
    volumenUnidad: "volumen_a",
    periodoVolumen: "periodo_3"
  });

  const formFields = [
    {
      id: 'nombre',
      type: 'text',
      label: 'Nombre del Establecimiento',
      placeholder: 'Ingrese el nombre del establecimiento',
      value: formData.nombre,
      onChange: (value) => setFormData({ ...formData, nombre: value }),
      required: true
    },
    {
      id: 'direccion',
      type: 'text',
      label: 'Dirección del Establecimiento',
      placeholder: 'Ingrese la dirección',
      value: formData.direccion,
      onChange: (value) => setFormData({ ...formData, direccion: value }),
      required: true
    },
    {
      id: 'coordenadas',
      type: 'text',
      label: 'Coordenadas del Establecimiento',
      placeholder: 'Ingrese las coordenadas',
      value: formData.coordenadas,
      onChange: (value) => setFormData({ ...formData, coordenadas: value }),
      required: true
    },
    {
      id: 'tipo',
      type: 'select',
      label: 'Tipo de Establecimiento',
      placeholder: 'Seleccione el tipo',
      value: formData.tipo,
      onChange: (value) => setFormData({ ...formData, tipo: value }),
      options: [
        { value: 'matadero', label: 'Matadero' },
        { value: 'planta', label: 'Planta Procesadora' },
        { value: 'frigorifico', label: 'Frigorífico' }
      ],
      required: true,
      rightSection: <IconChevronDown size={14} />,
      styles: { rightSection: { pointerEvents: 'none' } }
    },
    {
      id: 'operacion',
      type: 'select',
      label: 'Tipo de Operación',
      placeholder: 'Seleccione la operación',
      value: formData.operacion,
      onChange: (value) => setFormData({ ...formData, operacion: value }),
      options: [
        { value: 'sacrificio', label: 'Sacrificio' },
        { value: 'procesamiento', label: 'Procesamiento' },
        { value: 'almacenamiento', label: 'Almacenamiento' }
      ],
      required: true
    },
    {
      id: 'producto',
      type: 'select',
      label: 'Tipo de Producto',
      placeholder: 'Seleccione el producto',
      value: formData.producto,
      onChange: (value) => setFormData({ ...formData, producto: value }),
      options: [
        { value: 'producto_a', label: 'Producto A' },
        { value: 'producto_b', label: 'Producto B' },
        { value: 'producto_c', label: 'Producto C' }
      ],
      required: true
    },
    {
      id: 'volumenProcesado',
      type: 'number',
      label: 'Volumen Procesado',
      placeholder: 'Ingrese el volumen procesado',
      value: formData.volumenProcesado,
      onChange: (value) => {
        const numericValue = parseFloat(value) || 0;
        setFormData({ ...formData, volumenProcesado: numericValue });
      },
      required: true,
      min: 0,
      step: 0.01
    },
    {
      id: 'volumenUnidad',
      type: 'text',
      label: 'Unidad de Volumen',
      placeholder: 'Ingrese la unidad (ej: kg, ton, litros)',
      value: formData.volumenUnidad,
      onChange: (value) => setFormData({ ...formData, volumenUnidad: value }),
      required: true
    },
    {
      id: 'periodoVolumen',
      type: 'text',
      label: 'Periodo de Volumen',
      placeholder: 'Ingrese el periodo (ej: diario, mensual, anual)',
      value: formData.periodoVolumen,
      onChange: (value) => setFormData({ ...formData, periodoVolumen: value }),
      required: true
    }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Aquí iría la lógica para guardar los cambios
      console.log('Guardando cambios:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de guardado
      navigate(`/establecimientos/${id}`);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-establecimiento">
      <Header />
      <Menu />
      <div className="editar-content">
        <Formulario 
          title="Editar Establecimiento"
          description="Modifique los datos del establecimiento"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/establecimientos/${id}`)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditarEstablecimiento; 