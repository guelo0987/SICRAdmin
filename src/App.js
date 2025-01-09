import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Dashboard from './Pages/DashBoard';
import Solicitudes from './Pages/Solicitudes';
import AsignarInspector from './Pages/AsignarInspector';
import DetallesSolicitudes from './Pages/DetallesSolicitudes';
import Establecimiento from './Pages/Establecimiento';
import DetallesEstablecimientos from './Pages/DetallesEstablecimientos';
import EditarEstablecimiento from './Pages/EditarEstablecimiento';
import Inspecciones from './Pages/Inspecciones';
import DetallesInspeccion from './Pages/DetallesInspeccion';
import EvaluarInspeccion from './Pages/EvaluarInspeccion';
import ListaVerificacion from './Pages/ListaVerificacion';
import Resultados from './Pages/Resultados';
import DetallesResultados from './Pages/DetallesResultados';
import Irregularidades from './Pages/Irregularidades';
import Sanciones from './Pages/Sanciones';
import DetallesSanciones from './Pages/DetallesSanciones';
import AgregarSancion from './Pages/AgregarSancion';
import Usuarios from './Pages/Usuarios';
import DetallesUsuario from './Pages/DetallesUsuario';
import EditarUsuario from './Pages/EditarUsuario';
import AgregarUsuario from './Pages/AgregarUsuario';


function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'red',
        colors: {
          red: ['#FFE3E3', '#FFB1B1', '#FF7F7F', '#FF4C4C', '#FF1A1A', '#D94A3D', '#B30000', '#800000', '#4C0000', '#190000']
        }
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <div className="app">
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/solicitudes/asignar-inspector/:id" element={<AsignarInspector />} />
              <Route path="/detalles-solicitud/:id" element={<DetallesSolicitudes />} />
              <Route path="/establecimientos" element={<Establecimiento />} />
              <Route path="/establecimientos/:id" element={<DetallesEstablecimientos />} />
              <Route path="/establecimientos/editar/:id" element={<EditarEstablecimiento />} />
              <Route path="/inspecciones" element={<Inspecciones />} />
              <Route path="/inspecciones/:id" element={<DetallesInspeccion />} />
              <Route path="/inspecciones/:id/evaluar" element={<EvaluarInspeccion />} />
              <Route path="/inspecciones/:id/evaluar/:normativaId/:listaId" element={<ListaVerificacion />} />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/resultados/:id" element={<DetallesResultados />} />
              <Route path="/resultados/:id/irregularidades" element={<Irregularidades />} />
              <Route path="/sanciones" element={<Sanciones />} />
              <Route path="/sanciones/:id" element={<DetallesSanciones />} />
              <Route path="/sanciones/agregar" element={<AgregarSancion />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/:id" element={<DetallesUsuario />} />
              <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
              <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
