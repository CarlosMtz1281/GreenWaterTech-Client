"use client";
import TarjetaCuadrante from "@/app/components/TarjetaCuadrante"
import { Container, Tab, Tabs, Paper } from '@mui/material';
import { useState } from 'react';

    const testData = [
        {
            id: 1,
            name: "Cuadrante 1",
            temperatura: 20,
            humedad: 50,
            plant: "Tomatoes"
        },
        {
            id: 2,
            name: "Cuadrante 2",
            temperatura: 20,
            humedad: 50,
            plant: "Peppers"
        },
        {
            id: 3,
            name: "Cuadrante 3",
            temperatura: 20,
            humedad: 50,
            plant: "Lettuce"
        },
        {
            id: 4,
            name: "Cuadrante 4",
            temperatura: 20,
            humedad: 50,
            plant: "Carrots"
        },
    ]

export default function Campos(){
    const [tabValue, setTabValue] = useState('general');

    const handleChangeTab = (event, newValue) => {
      setTabValue(newValue);
    };

    const fetchData = async () => {
        try {
          const response = await fetch(`https://gwt-back.uc.r.appspot.com/api/getCampos?campo=campo1`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          // Handle any errors that occur during the request
          console.error(error);
        }
      };

      fetchData().then(data => console.log(data));

    return (
        <div>
            <h1 className="campo-tittle">Fields</h1>
            <div className="campo-main-container">


        <Container maxWidth="lg"> {/* Adjust the maxWidth as needed */}
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="General Data" value="general" />
              <Tab label="Map" value="map" />
            </Tabs>

            <div className="tab-content">
              {tabValue === 'general' && (
                <div className="campo-generalInfo">
                    <div className="campo-gi-header">
                        <h1>Campo el cuchillo</h1>
                        <h3>Santaigo N.L Mexico</h3>
                        <p>Latitude: xxxxxxxxx, Longitude: xxxxxxxx</p>
                    </div>
                    <div className="weather-container">
                        <div className="weather-info">
                            <h2>Weather</h2>
                            <h3>Temperature: 20°</h3>
                            <h3>Humidity: 50%</h3>
                        </div>
                        <div className="weather-image">
                            <img src="/weather.png" alt="weather"/>
                        </div>
                    </div>

                <div className="data-stats">
                    <p> GRAPHS AND STUFF</p>
                </div>

                <div className="recomendation">

                </div>

                </div>
              )}
              {tabValue === 'map' && (
                <div className="cuadrante-grid">
                  {testData.length > 0 &&
                    testData.map((item) => (
                      <TarjetaCuadrante key={item.id} data={item} />
                    ))}
                </div>
              )}
            </div>
        </Container>
        </div>
        </div>
      );
    };