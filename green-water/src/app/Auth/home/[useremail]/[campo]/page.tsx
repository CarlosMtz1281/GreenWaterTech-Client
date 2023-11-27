"use client";
import TarjetaCuadrante from "@/app/components/TarjetaCuadrante";
import { Container, Tab, Tabs, Paper } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import LineGraph from "@/app/components/lineGraph";
import BarGrap from "@/app/components/BarGraph";
import { set } from "firebase/database";


export default function Campos() {
  const [tabValue, setTabValue] = useState("general");
  const [realData, setRealData] = useState<any>([]);
  const [altData, setAltData] = useState<any>([]);
  const [RealweatherData, setRealWeatherData] = useState<any>([]);
  const [humidity, setHumidity] = useState<any>([]);

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

        // Fetch weather data
        /*
        const weatherResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/244681?apikey=2KIo7Elt2ttUi4ah0wLkdPsQDLQmzdWU&metric=true`
        );

        if (!weatherResponse.ok) {
          throw new Error(`HTTP error! status: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        setRealWeatherData(weatherData);
        console.log("WEATHER DATA NOW")
        console.log(weatherData);
        console.log(RealweatherData);
        */

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();

  }, []);
  useEffect(() => {
    if (realData.length > 0) {
      const cuadrantes = ['cuadrante1', 'cuadrante2', 'cuadrante3', 'cuadrante4'].map(cuadrante => realData[0][cuadrante].planta1.Humedad_Tierra_lastHour);
      console.log("CUADRANTES")
      console.log(cuadrantes);
      setHumidity(cuadrantes);
    }
  }, [realData]);

  const weatherTest = [{
    "Headline": {
        "EffectiveDate": "2023-11-27T07:00:00-06:00",
        "EffectiveEpochDate": 1701090000,
        "Severity": 4,
        "Text": "Noticeably cooler weather on the way today",
        "Category": "cooler",
        "EndDate": "2023-11-27T19:00:00-06:00",
        "EndEpochDate": 1701133200,
        "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?unit=c&lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2023-11-27T07:00:00-06:00",
            "EpochDate": 1701090000,
            "Temperature": {
                "Minimum": {
                    "Value": 6.3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 10.8,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 12,
                "IconPhrase": "Showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=1&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=1&unit=c&lang=en-us"
        },
        {
            "Date": "2023-11-28T07:00:00-06:00",
            "EpochDate": 1701176400,
            "Temperature": {
                "Minimum": {
                    "Value": 7.2,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 13.4,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=2&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=2&unit=c&lang=en-us"
        },
        {
            "Date": "2023-11-29T07:00:00-06:00",
            "EpochDate": 1701262800,
            "Temperature": {
                "Minimum": {
                    "Value": 10.9,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 14.5,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=3&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=3&unit=c&lang=en-us"
        },
        {
            "Date": "2023-11-30T07:00:00-06:00",
            "EpochDate": 1701349200,
            "Temperature": {
                "Minimum": {
                    "Value": 13.0,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 26.1,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 3,
                "IconPhrase": "Partly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 36,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=4&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=4&unit=c&lang=en-us"
        },
        {
            "Date": "2023-12-01T07:00:00-06:00",
            "EpochDate": 1701435600,
            "Temperature": {
                "Minimum": {
                    "Value": 12.4,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 23.5,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 35,
                "IconPhrase": "Partly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=5&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=5&unit=c&lang=en-us"
        }
    ]
}]
  console.log(realData[0]);
  console.log(altData);
  console.log("WEATHER DATA AFTER")
  console.log(RealweatherData);
  console.log(weatherTest)
  console.log(humidity)
  const temperaturesMin = weatherTest[0].DailyForecasts.map((day) => day.Temperature.Minimum.Value);
  const temperaturesMax = weatherTest[0].DailyForecasts.map((day) => day.Temperature.Maximum.Value);


  return (
    <div>
      <h1 className="campo-tittle">Fields </h1>
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
                  <LineGraph dataset1={temperaturesMin} dataset2={temperaturesMax}/>
                  <BarGrap data={humidity}/>
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
