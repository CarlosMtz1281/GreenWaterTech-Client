import React from 'react';

interface Props {
    data: {
        planta1: {
            Humedad: number,
            Humedad_Tierra: number,
            Humedad_Tierra_lastHour: number,
            Humedad_lastHour: number,
            Temperatura: number,
            Temperatura_lastHour: number
        }
    };
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '30vw',
        height: '25vh',
        margin: 'auto'

    },
    id: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    plant: {
        fontSize: '16px',
        marginBottom: '8px'
    },
    humidity: {
        fontSize: '14px',
        marginBottom: '4px'
    },
    temperature: {
        fontSize: '14px'
    }
}
const TarjetaCuadrante: React.FC<Props> = ({ data }) => {
    const { planta1 } = data;
    return (
        <div style={styles.container}>
            <p style={styles.humidity}>Humedad: {planta1.Humedad}%</p>
            <p style={styles.humidity}>Humedad Tierra: {planta1.Humedad_Tierra}%</p>
            <p style={styles.humidity}>Humedad Tierra Last Hour: {planta1.Humedad_Tierra_lastHour}%</p>
            <p style={styles.humidity}>Humedad Last Hour: {planta1.Humedad_lastHour}%</p>
            <p style={styles.temperature}>Temperature: {planta1.Temperatura}°C</p>
            <p style={styles.temperature}>Temperature Last Hour: {planta1.Temperatura_lastHour}°C</p>
        </div>
    );
};

export default TarjetaCuadrante;
