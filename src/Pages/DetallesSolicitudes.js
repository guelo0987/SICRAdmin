import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  IconClipboardList, 
  IconMapPin, 
  IconCalendar, 
  IconBuilding, 
  IconUser,
  IconPhone,
  IconMail,
  IconClock
} from '@tabler/icons-react';
import CardDetails from '../Componentes/CardDetails';
import Header from '../Componentes/Header';
import Menu from '../Componentes/Menu';
import '../Estilos/DetallesSolicitudes.css';

const DetallesSolicitudes = () => {
  const { id } = useParams();

  const solicitudDetails = [
    {
      label: "Código de Solicitud",
      value: id || "S111793",
      icon: <IconClipboardList size={16} />
    },
    {
      label: "Estado de Solicitud",
      value: "Pendiente",
      icon: <IconClock size={16} />
    },
    {
      label: "Fecha de Solicitud",
      value: "14 Feb 2024",
      icon: <IconCalendar size={16} />
    },
    {
      label: "Tipo de Establecimiento",
      value: "Matadero",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Nombre del Establecimiento",
      value: "Matadero La Esperanza",
      icon: <IconBuilding size={16} />
    },
    {
      label: "Dirección",
      value: "Calle Ficticia 123, Ciudad",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Coordenadas del Establecimiento",
      value: "40° 24' 59\" N, 03° 42' 09\" O",
      icon: <IconMapPin size={16} />
    },
    {
      label: "Nombre del Solicitante",
      value: "Juan Pérez González",
      icon: <IconUser size={16} />
    },
    {
      label: "Teléfono de Contacto",
      value: "+34 612 345 678",
      icon: <IconPhone size={16} />
    },
    {
      label: "Correo Electrónico",
      value: "juan.perez@mataderolaesperanza.com",
      icon: <IconMail size={16} />
    }
  ];

  return (
    <div className="detalles-solicitud">
      <Header />
      <Menu />
      <div className="detalles-content">
        <div className="content-wrapper">
          <CardDetails 
            title="Detalles de Solicitud"
            details={solicitudDetails}
            icon={<IconClipboardList size={24} stroke={1.5} />}
          />
        </div>
      </div>
    </div>
  );
};

export default DetallesSolicitudes;
