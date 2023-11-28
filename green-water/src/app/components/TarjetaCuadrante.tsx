import React from 'react';
import { Grid, Stack } from '@mui/material';
import RoundedBarChart from './BorderedGraph';

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
        margin: '10px',
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
        fontSize: '12px',
        marginBottom: '4px'
    },
    temperature: {
        fontSize: '12px'
    },
    graphfooter: {
        fontSize: '0.5vh',
    }

}
const TarjetaCuadrante: React.FC<Props> = ({ data }) => {
    const { planta1 } = data;

    return (
        <div style={styles.container}>
            <Grid container>
            
            <Grid item xs={6}>
                <div
                style={{paddingTop: "15px"}}>
                    <p style={styles.humidity}>Humedad: {planta1.Humedad}%</p>
                    <p style={styles.humidity}>Humedad Tierra: {planta1.Humedad_Tierra}%</p>
                    <p style={styles.humidity}>Humedad Tierra Last Hour: {planta1.Humedad_Tierra_lastHour}%</p>
                    <p style={styles.humidity}>Humedad Last Hour: {planta1.Humedad_lastHour}%</p>
                    <p style={styles.temperature}>Temperature: {planta1.Temperatura}°C</p>
                    <p style={styles.temperature}>Temperature Last Hour: {planta1.Temperatura_lastHour}°C</p>
                </div>
            </Grid>


            <Grid item xs={6}>

            <RoundedBarChart data={{
                labels: ['HA', 'HT', 'HT LH', 'HA LH', 'T', 'T LH'],
                datasets: [{
                    label: 'Values',
                    data: [planta1.Humedad, planta1.Humedad_Tierra, planta1.Humedad_Tierra_lastHour, planta1.Humedad_lastHour, planta1.Temperatura, planta1.Temperatura_lastHour],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    borderWidth: 1,
                }]
            }} />

            </Grid>      

            </Grid>
        </div>
    );
};

export default TarjetaCuadrante;
