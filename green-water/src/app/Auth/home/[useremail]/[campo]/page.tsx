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
                  {/* Your general data content goes here */}
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