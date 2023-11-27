"use client";
import TarjetaCuadrante from "@/app/components/TarjetaCuadrante";
import { Container, Tab, Tabs, Paper } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const testData = [
  {
    id: 1,
    name: "Cuadrante 1",
    temperatura: 20,
    humedad: 50,
    plant: "Tomatoes",
  },
  {
    id: 2,
    name: "Cuadrante 2",
    temperatura: 20,
    humedad: 50,
    plant: "Peppers",
  },
  {
    id: 3,
    name: "Cuadrante 3",
    temperatura: 20,
    humedad: 50,
    plant: "Lettuce",
  },
  {
    id: 4,
    name: "Cuadrante 4",
    temperatura: 20,
    humedad: 50,
    plant: "Carrots",
  },
];

export default function Campos() {
  const [tabValue, setTabValue] = useState("general");
  const [realData, setRealData] = useState<any>([]);
  const [altData, setAltData] = useState<any>([]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    let selectedData;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gwt-back.uc.r.appspot.com//api/getUser?user=-Nj8Y4gCCGdasz5SxLdp`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const dataArray = Object.values(data);
        const formattedData = dataArray.slice(0, 4); // Get the first 4 items
        const altData = dataArray.slice(4); // Get the remaining items

        // Get the current URL
        const url = window.location.pathname;
        // Extract the campo number from the URL
        const campoNumber = parseInt(url.split('campo')[1]);

        // If the campo number is valid, update realData to only contain the corresponding element
        if (!isNaN(campoNumber) && campoNumber >= 1 && campoNumber <= 4) {
          selectedData = formattedData[campoNumber - 1];
          setRealData([selectedData]);
        } else {
          setRealData(formattedData);
        }

        setAltData(altData); // Assuming you have a state variable altData
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(realData[0]);
  console.log(altData);

  return (
    <div>
      <h1 className="campo-tittle">Fields</h1>
      <div className="campo-main-container">
        <Container maxWidth="lg">
          {" "}
          {/* Adjust the maxWidth as needed */}
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
            {tabValue === "general" && (
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
                    <img src="/weather.png" alt="weather" />
                  </div>
                </div>

                <div className="data-stats">
                  <p> GRAPHS AND STUFF</p>
                </div>

                <div className="recomendation"></div>
              </div>
            )}
            {tabValue === "map" && (
  <div className="cuadrante-grid">
    {realData.length > 0 &&
      ["cuadrante1", "cuadrante2", "cuadrante3", "cuadrante4"].map((cuadrante, index) => (
        <TarjetaCuadrante key={index} data={realData[0][cuadrante]} />
      ))}
  </div>
)}
          </div>
        </Container>
      </div>
    </div>
  );
}
