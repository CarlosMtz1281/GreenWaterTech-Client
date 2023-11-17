import React from 'react';

interface Props {
    data: {
        id: number,
        name: string,
        temperatura: number,
        humedad: number,
        plant: string
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
    return (
        <div style={styles.container}>
            <p style={styles.id}>Name: {data.name}</p>
            <p style={styles.plant}>Plant: {data.plant}</p>
            <p style={styles.humidity}>Humidity: {data.humedad}%</p>
            <p style={styles.temperature}>Temperature: {data.temperatura}°C</p>
        </div>
    );
};

export default TarjetaCuadrante;
