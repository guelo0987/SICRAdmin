const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5069';

// Endpoints de Autenticación
export const AUTH_ENDPOINTS = {
    LOGIN: `${API_URL}/api/Auth/login`,
    LOGOUT: `${API_URL}/api/Auth/logout`,
    GET_PROFILE: `${API_URL}/api/Auth/profile`,
};

// Endpoints de Usuarios
export const USER_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/User`,
    GET_BY_ID: (id) => `${API_URL}/api/User/${id}`,
    CREATE_UPDATE: `${API_URL}/api/User`,
    SET_INACTIVE: (id) => `${API_URL}/api/User/${id}`,
};

// Endpoints de Clientes
export const CLIENT_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Cliente`,
    GET_BY_ID: (id) => `${API_URL}/api/Cliente/${id}`,
    GET_SOLICITUDES: (id) => `${API_URL}/api/Cliente/${id}/solicitudes`,
    CHANGE_STATUS: (id) => `${API_URL}/api/Cliente/${id}/cambiar-estado`,
};

// Endpoints de Establecimientos
export const ESTABLISHMENT_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Establecimiento`,
    GET_BY_ID: (id) => `${API_URL}/api/Establecimiento/${id}`,
    CREATE: `${API_URL}/api/Establecimiento`,
    UPDATE: (id) => `${API_URL}/api/Establecimiento/${id}`,
    DELETE: (id) => `${API_URL}/api/Establecimiento/${id}`,
    SEARCH: (nombre) => `${API_URL}/api/Establecimiento/Search/${nombre}`,
};

// Endpoints de Inspecciones
export const INSPECTION_ENDPOINTS = {
    UPSERT: `${API_URL}/api/Inspeccion`,
    GET_ALL: `${API_URL}/api/Inspeccion`,
    GET_BY_ID: (id) => `${API_URL}/api/Inspeccion/${id}`,
    DELETE: (id) => `${API_URL}/api/Inspeccion/${id}`,
    CREATE_RANDOM: `${API_URL}/api/Inspeccion/CrearInspeccionAleatorio`,
    VERIFICAR_INSPECCION: (id) => `${API_URL}/api/Inspeccion/verificar-inspeccion/${id}`,
};

// Endpoints de Solicitudes
export const SOLICITUD_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Solicitud`,
    GET_BY_ID: (id) => `${API_URL}/api/Solicitud/${id}`,
    UPDATE: (id) => `${API_URL}/api/Solicitud/${id}`,
};

// Endpoints de Resultados
export const RESULTADO_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Resultado`,
    GET_BY_ID: (id) => `${API_URL}/api/Resultado/${id}`,
    UPSERT: `${API_URL}/api/Resultado`,
    FINALIZAR_INSPECCION: (id) => `${API_URL}/api/Resultado/FinalizarInspeccionSolicitud?idInspeccion=${id}`,
    FINALIZAR_INSPECCION_ALEATORIA: (id) => `${API_URL}/api/Resultado/FinalizarInspeccionAleatoria?idInspeccion=${id}`,
    GENERAR_IRREGULARIDADES: (idInspeccion) => `${API_URL}/api/Resultado/GenerarIrregularidades?idInspeccion=${idInspeccion}`
};

// Endpoints de Irregularidades
export const IRREGULARIDAD_ENDPOINTS = {
    BASE: `${API_URL}/api/Resultado`,
    EDITAR: `${API_URL}/api/Irregularidad/EditarIrregularidad`,
    VERIFICAR_IRREGULARIDADES_INSPECCION: (idInspeccion) => 
        `${API_URL}/api/Irregularidad/TieneIrregularidadesInspeccion?idInspeccion=${idInspeccion}`,
    GET_POR_INSPECCION: (idInspeccion) => 
        `${API_URL}/api/Irregularidad/PorInspeccion/${idInspeccion}`
};

// Endpoints de Sanciones
export const SANCION_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Sancione`,
    APLICAR_SANCION: `${API_URL}/api/Sancione/AplicarSancioneIrregularidad`,
    CAMBIAR_ESTADO: (idIrregularidad, idSancion) => 
        `${API_URL}/api/Sancione/CambiarEstado/${idIrregularidad}/${idSancion}`,
    CREAR: `${API_URL}/api/Sancione/Crear`,
};

// Endpoints de Animales y Lotes
export const ANIMAL_LOTE_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/AnimalesLotes`,
    CREATE: `${API_URL}/api/AnimalesLotes`,
    DELETE: `${API_URL}/api/AnimalesLotes`,
};

// Endpoints de Animales
export const ANIMAL_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Animal`,
    GET_BY_ID: (id) => `${API_URL}/api/Animal/${id}`,
    UPSERT: `${API_URL}/api/Animal`,
    DELETE: (id) => `${API_URL}/api/Animal/${id}`,
};

// Endpoints de Lotes de Productos
export const LOTE_PRODUCTO_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/LoteProducto`,
    GET_BY_ID: (id) => `${API_URL}/api/LoteProducto/${id}`,
    UPSERT: `${API_URL}/api/LoteProducto`,
    DELETE: (id) => `${API_URL}/api/LoteProducto/${id}`,
    GET_BY_ESTABLISHMENT: (idEstablecimiento) => 
        `${API_URL}/api/LoteProducto/LotesPorEstablecimiento/${idEstablecimiento}`,
};

// Endpoints de Documentos
export const DOCUMENTO_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Documento`,
    GET_BY_ID: (id) => `${API_URL}/api/Documento/${id}`,
    UPSERT: `${API_URL}/api/Documento`,
    DELETE: (id) => `${API_URL}/api/Documento/${id}`,
};

// Endpoints de Items de Verificación
export const ITEMS_VERIFICACION_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/ItemsVerificacion`,
    GET_BY_ID: (id) => `${API_URL}/api/ItemsVerificacion/${id}`,
    GET_BY_LISTA: (idLista) => `${API_URL}/api/ItemsVerificacion/Lista/${idLista}`,
    UPSERT: `${API_URL}/api/ItemsVerificacion`,
    DELETE: (id) => `${API_URL}/api/ItemsVerificacion/${id}`,
};

// Endpoints de Listas de Verificación
export const LISTA_VERIFICACION_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/ListaVerificacion`,
    GET_BY_ID: (id) => `${API_URL}/api/ListaVerificacion/${id}`,
    GET_BY_NORMATIVA: `${API_URL}/api/ListaVerificacion/Normativa`,
    UPSERT: `${API_URL}/api/ListaVerificacion`,
    DELETE: (id) => `${API_URL}/api/ListaVerificacion/${id}`,
};

// Endpoints de Normativas
export const NORMATIVA_ENDPOINTS = {
    GET_ALL: `${API_URL}/api/Normativa`,
    GET_BY_ID: (id) => `${API_URL}/api/Normativa/${id}`,
    UPSERT: `${API_URL}/api/Normativa`,
    DELETE: (id) => `${API_URL}/api/Normativa/${id}`,
};
