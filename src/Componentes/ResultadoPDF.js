import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer 
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 150,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  normativaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listaTitle: {
    fontSize: 12,
    marginBottom: 10,
    color: '#666',
  },
  pregunta: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  preguntaText: {
    marginBottom: 5,
  },
  respuesta: {
    color: '#666',
  },
  observacion: {
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 5,
    color: '#666',
  },
  resultado: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E3FCEF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultadoDenegado: {
    backgroundColor: '#FFE3E3',
  }
});

const ResultadoPDF = ({ data }) => (
  <PDFViewer style={{ width: '100%', height: '500px' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Resultado de Inspección</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Código de Inspección:</Text>
            <Text style={styles.value}>{data.codigo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de Inspección:</Text>
            <Text style={styles.value}>{data.fecha}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Establecimiento:</Text>
            <Text style={styles.value}>{data.establecimiento}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Inspector:</Text>
            <Text style={styles.value}>{data.inspector}</Text>
          </View>
        </View>

        {data.normativas.map((normativa, index) => (
          <View key={index}>
            <Text style={styles.normativaTitle}>{normativa.nombre}</Text>
            <Text style={styles.listaTitle}>{normativa.lista}</Text>

            {normativa.preguntas.map((item, idx) => (
              <View key={idx} style={styles.pregunta}>
                <Text style={styles.preguntaText}>{item.pregunta}</Text>
                <Text style={styles.respuesta}>Respuesta: {item.respuesta}</Text>
                {item.observacion && (
                  <Text style={styles.observacion}>
                    Observación: {item.observacion}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={[
          styles.resultado,
          data.resultado === 'denegado' && styles.resultadoDenegado
        ]}>
          <Text>
            Resultado Final: {data.resultado.toUpperCase()}
          </Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ResultadoPDF; 