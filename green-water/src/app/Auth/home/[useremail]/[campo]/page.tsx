"use client";
import TarjetaCuadrante from "@/app/components/TarjetaCuadrante";
import { Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import LineGraph from "@/app/components/lineGraph";
import BarGraph from "@/app/components/BarGraph";
import { set } from "firebase/database";
import Image from "next/image";


export default function Campos() {
  const [tabValue, setTabValue] = useState("general");
  const [realData, setRealData] = useState<any>([]);
  const [altData, setAltData] = useState<any>([]);
  const [RealweatherData, setRealWeatherData] = useState<any>([]);
  const [humidity, setHumidity] = useState<any>([]);
  const [recomendation, setRecomendation] = useState("Error")

  const handleChangeTab = (event, newValue: any) => {
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
        const campoNumber = parseInt(url.split("campo")[1]);

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

      setHumidity(cuadrantes);
    }
  }, [realData]);

  const weatherTest = [{
    "Headline": {
        "EffectiveDate": "2023-11-30T07:00:00-06:00",
        "EffectiveEpochDate": 1701349200,
        "Severity": 4,
        "Text": "Becoming noticeably warmer Thursday",
        "Category": "warmer",
        "EndDate": "2023-11-30T19:00:00-06:00",
        "EndEpochDate": 1701392400,
        "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?unit=c&lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2023-11-28T07:00:00-06:00",
            "EpochDate": 1701176400,
            "Temperature": {
                "Minimum": {
                    "Value": 7.7,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 14.6,
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
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=1&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=1&unit=c&lang=en-us"
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
                    "Value": 15.9,
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
            "Date": "2023-11-30T07:00:00-06:00",
            "EpochDate": 1701349200,
            "Temperature": {
                "Minimum": {
                    "Value": 13.0,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 26.3,
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
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=3&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=3&unit=c&lang=en-us"
        },
        {
            "Date": "2023-12-01T07:00:00-06:00",
            "EpochDate": 1701435600,
            "Temperature": {
                "Minimum": {
                    "Value": 11.9,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 23.3,
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
                "Icon": 38,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=4&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/mx/monterrey/244681/daily-weather-forecast/244681?day=4&unit=c&lang=en-us"
        },
        {
            "Date": "2023-12-02T07:00:00-06:00",
            "EpochDate": 1701522000,
            "Temperature": {
                "Minimum": {
                    "Value": 12.8,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 22.9,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 6,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
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

useEffect(() => {
  let suggestion = "";
  if(realData && realData.length > 0){
    if(realData[0].cuadrante1.planta1.Humedad_Tierra_lastHour < 20){
      suggestion = "The soil of cuadrant 1 is too dry, you should water it. ";
    }
    if(realData[0].cuadrante2.planta1.Humedad_Tierra_lastHour < 20){
      suggestion = suggestion +"The soil of cuadrant 2 is too dry, you should water it. ";
    }
    if(realData[0].cuadrante3.planta1.Humedad_Tierra_lastHour < 20){
      suggestion = suggestion +"The soil of cuadrant 3 is too dry, you should water it. ";
    }
    if(realData[0].cuadrante4.planta1.Humedad_Tierra_lastHour < 20){
      suggestion = suggestion +"The soil of cuadrant 4 is too dry, you should water it. ";
    }
    if(suggestion == ""){
      suggestion = "Your plants have apropiate soil humidity irrigation is not necesary right now. "
    }
  }
  console.log("suggestion");
  console.log(suggestion);
  setRecomendation(suggestion);
  let arr = [];
  if (realData.length > 0) {
    arr = ['cuadrante1', 'cuadrante2', 'cuadrante3', 'cuadrante4'].map(cuadrante => realData[0][cuadrante].planta1.Humedad_Tierra_lastHour);
  }
  console.log("arr");
  console.log(arr);
}, [realData]);


  const temperaturesMin = weatherTest[0].DailyForecasts.map((day) => day.Temperature.Minimum.Value);
  const temperaturesMax = weatherTest[0].DailyForecasts.map((day) => day.Temperature.Maximum.Value);

  console.log("Real daata");
  console.log(realData);
  console.log("BUG");
  console.log(weatherTest[0].DailyForecasts[0].Day )

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
                <div className="gi-topRow">
                  <div className="campo-gi-header">

                    <div>
                      <h1 className="gi-campoName">Campo el Cuchillo</h1>
                      <h3 className="gi-location">Santaigo N.L Mexico</h3>
                      <p>Latitude: 25.5626, Longitude: -100.2285</p>
                    </div>
                    <div className="weather-image">
                        <Image src="/intermitentCloud.png" width= {80} height={80} alt="weather Icon" />
                      </div>
                    <div className="weather-container">
                      <div className="weather-info">
                        <h2>Weather: {weatherTest[0].DailyForecasts[0].Day.IconPhrase}  {/*{weatherTest[0].DailyForecasts[0].Day.HasPrecipitation &&
    `, ${weatherTest[0].DailyForecasts[0].Day.PrecipitationIntensity} ${weatherTest[0].DailyForecasts[0].Day.PrecipitationType}` */}
  } </h2>
                        <h3>Temperature: <br/>  ---Maximum: {temperaturesMax[0]}  <br/>  ---Minimum: {temperaturesMin[0]}°</h3>
                        <h3>Ambient Humidity: 50%</h3>
                      </div>

                    </div>
                  </div>

                  <div className="gi-recomendation">
                    <h2>Recomendation based on weather and sensor data</h2>
                    <p>{recomendation}</p>
                  </div>

                </div>


                <div className="data-stats">

                  <LineGraph dataset1={temperaturesMin} dataset2={temperaturesMax} label1 = {"Minimum temperatures"} label2 = {"Maximum temperatures"} />

                  <BarGraph dataset1={humidity} label1={"Soil humidity"} />

                </div>

                <div className="recomendation"></div>
              </div>
            )}
            {tabValue === "map" && (
              <div>
            <div className="cuadrante-grid">
              {realData.length > 0 &&
                ["cuadrante1", "cuadrante2", "cuadrante3", "cuadrante4"].map((cuadrante, index) => (
                  <TarjetaCuadrante key={index} data={realData[0][cuadrante]} />
                ))}
            </div>

                <footer className="cuadrante-footer">
                  <div className="footer-column">
                    <small><strong>AH:</strong> Ambient Humidity</small>
                    <small><strong>SH:</strong> Soil Humidity</small>
                  </div>
                  <div className="footer-column">
                    <small><strong>AH LH:</strong> Soil Humidity last hour</small>
                    <small><strong>SH LT:</strong> Ambient Humidity last hour</small>
                  </div>
                  <div className="footer-column">
                    <small><strong>T:</strong> Temperature</small>
                    <small><strong>T LH:</strong> Temperature last hour</small>
                  </div>
                </footer>
              </div>
)}
          </div>
        </Container>
      </div>
    </div>
  );
}
