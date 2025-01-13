import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import Formulario from '../Componentes/Formulario';
import '../Estilos/EditarEstablecimiento.css';
import axios from 'axios';
import { ESTABLISHMENT_ENDPOINTS } from '../Api/Endpoints';
import { notifications } from '@mantine/notifications';

const EditarEstablecimiento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idEstablecimiento: "",
    nombre: "",
    direccion: "",
    comerciales: "",
    tipoOperacion: "",
    tipoProducto: "",
    capacidadOperativa: "",
    volumenProcesado: "",
    unidadVolumen: "",
    periodoVolumen: "",
    riesgo: "",
    licenciasCertificaciones: "",
    estadoEstablecimiento: ""
  });

  const fetchEstablecimientoData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(ESTABLISHMENT_ENDPOINTS.GET_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setFormData({
        idEstablecimiento: response.data.idEstablecimiento || "",
        nombre: response.data.nombre || "",
        direccion: response.data.direccion || "",
        comerciales: response.data.comerciales || "",
        tipoOperacion: response.data.tipoOperacion || "",
        tipoProducto: response.data.tipoProducto || "",
        capacidadOperativa: response.data.capacidadOperativa || "",
        volumenProcesado: response.data.volumenProcesado || "",
        unidadVolumen: response.data.unidadVolumen || "",
        periodoVolumen: response.data.periodoVolumen || "",
        riesgo: response.data.riesgo || "Pendiente",
        licenciasCertificaciones: response.data.licenciasCertificaciones || "",
        estadoEstablecimiento: response.data.estadoEstablecimiento || "Activo"
      });
    } catch (error) {
      console.error('Error al obtener datos del establecimiento:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudieron cargar los datos del establecimiento',
        color: 'red'
      });
    }
  }, [id]);

  useEffect(() => {
    fetchEstablecimientoData();
  }, [fetchEstablecimientoData]);

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
      id: 'comerciales',
      type: 'text',
      label: 'Comerciales',
      placeholder: 'Ingrese los comerciales',
      value: formData.comerciales,
      onChange: (value) => setFormData({ ...formData, comerciales: value })
    },
    {
      id: 'tipoOperacion',
      type: 'select',
      label: 'Tipo de Operación',
      placeholder: 'Seleccione la operación',
      value: formData.tipoOperacion,
      onChange: (value) => setFormData({ ...formData, tipoOperacion: value }),
      options: [
        { value: 'Carne+', label: 'Carne+' },
        { value: 'Procesamiento', label: 'Procesamiento' },
        { value: 'Almacenamiento', label: 'Almacenamiento' }
      ],
      required: true
    },
    {
      id: 'tipoProducto',
      type: 'text',
      label: 'Tipo de Producto',
      placeholder: 'Ingrese el tipo de producto',
      value: formData.tipoProducto,
      onChange: (value) => setFormData({ ...formData, tipoProducto: value })
    },
    {
      id: 'capacidadOperativa',
      type: 'text',
      label: 'Capacidad Operativa',
      placeholder: 'Ingrese la capacidad operativa',
      value: formData.capacidadOperativa,
      onChange: (value) => setFormData({ ...formData, capacidadOperativa: value })
    },
    {
      id: 'volumenProcesado',
      type: 'text',
      label: 'Volumen Procesado',
      placeholder: 'Ingrese el volumen procesado',
      value: formData.volumenProcesado,
      onChange: (value) => setFormData({ ...formData, volumenProcesado: value })
    },
    {
      id: 'unidadVolumen',
      type: 'text',
      label: 'Unidad de Volumen',
      placeholder: 'Ingrese la unidad de volumen',
      value: formData.unidadVolumen,
      onChange: (value) => setFormData({ ...formData, unidadVolumen: value })
    },
    {
      id: 'periodoVolumen',
      type: 'text',
      label: 'Periodo de Volumen',
      placeholder: 'Ingrese el periodo de volumen',
      value: formData.periodoVolumen,
      onChange: (value) => setFormData({ ...formData, periodoVolumen: value })
    },
    {
      id: 'riesgo',
      type: 'select',
      label: 'Riesgo',
      placeholder: 'Seleccione el nivel de riesgo',
      value: formData.riesgo,
      onChange: (value) => setFormData({ ...formData, riesgo: value }),
      options: [
        { value: 'Alto', label: 'Alto' },
        { value: 'Medio', label: 'Medio' },
        { value: 'Bajo', label: 'Bajo' },
        { value: 'Pendiente', label: 'Pendiente' }
      ]
    },
    {
      id: 'licenciasCertificaciones',
      type: 'text',
      label: 'Licencias y Certificaciones',
      placeholder: 'Ingrese las licencias y certificaciones',
      value: formData.licenciasCertificaciones,
      onChange: (value) => setFormData({ ...formData, licenciasCertificaciones: value })
    },
    {
      id: 'estadoEstablecimiento',
      type: 'select',
      label: 'Estado del Establecimiento',
      placeholder: 'Seleccione el estado',
      value: formData.estadoEstablecimiento,
      onChange: (value) => setFormData({ ...formData, estadoEstablecimiento: value }),
      options: [
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' },
        { value: 'Pendiente', label: 'Pendiente' }
      ],
      required: true
    }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        ESTABLISHMENT_ENDPOINTS.UPDATE(id),
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      notifications.show({
        title: 'Éxito',
        message: 'Establecimiento actualizado correctamente',
        color: 'green'
      });
      
      navigate(`/establecimientos/${id}`);
    } catch (error) {
      console.error('Error al actualizar:', error);
      notifications.show({
        title: 'Error',
        message: 'No se pudo actualizar el establecimiento',
        color: 'red'
      });
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