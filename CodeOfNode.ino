//Arduino Code
include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

#define DHTPIN D3       // Replace with your actual DHT sensor pin
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

// WiFi credentials
const char* ssid = "Tec-Contingencia"; // Replace with your WiFi SSID
const char* password = "";     // Replace with your WiFi password

// Firebase credentials
const char* firebaseHost = "greenwatertech-572bc-default-rtdb.firebaseio.com";
const char* firebaseAuth = "eNAbveZCFIoMyKLjIKp9UwXHsr4dJDt7pnV1dfe0"; // Replace with your Firebase auth token

// Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

int soilMoisture;
int soilMoisturePin = A0;

void setup() {
  Serial.begin(9600);
  dht.begin();

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  // Assign the project host and API key
  config.host = firebaseHost;
  config.signer.tokens.legacy_token = firebaseAuth;

  // Assign the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback; // See addons/TokenHelper.h

  // Initialize Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

}

int cont = 0;

int sumTemp = 0;
int sumHum = 0;
int sumHumTierra = 0;

float averageTemp = 0;
float averageHum = 0;
float averageHumTierra = 0;

void loop() {
  // Read temperature and humidity
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  if (isnan(hum) || isnan(temp)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Read the soil moisture value, which should be connected to A0
  soilMoisture = map(analogRead(soilMoisturePin), 1023, 0, 0, 100);

  // Log to the Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.print("°C, Humidity: ");
  Serial.print(hum);
  Serial.print("%, Soil Moisture: ");
  Serial.print(soilMoisture);
  Serial.println("%");


  sumTemp += temp;
  sumHum += hum;
  sumHumTierra += soilMoisture;

  if(cont > 59){
    averageTemp = sumTemp/60;
    averageHum = sumHum/60;
    averageHumTierra = sumHumTierra/60;

    //Ruta para mandar los promedios al firebase
    if (Firebase.ready()) {
      // Set the path and the value
      if (Firebase.RTDB.setFloat(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Temperatura_lastHour", averageTemp) &&
          Firebase.RTDB.setFloat(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Humedad_lastHour", averageHum) &&
          Firebase.RTDB.setInt(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Humedad_Tierra_lastHour", averageHumTierra)) {
        // Success, do something, e.g., print the result
        Serial.println("Data sent to Firebase");
      } else {
        // Failed, print the error code
        Serial.print("Error sending data: ");
        Serial.println(fbdo.errorReason());
      }
    }

    
    cont = 0;
    sumTemp = 0;
    sumHum = 0;
    sumHumTierra = 0;

    averageTemp = 0;
    averageHum = 0;
    averageHumTierra = 0;
  }

  // Send data to Firebase
  if (Firebase.ready()) {
    // Set the path and the value
    if (Firebase.RTDB.setFloat(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Temperatura", temp) &&
        Firebase.RTDB.setFloat(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Humedad", hum) &&
        Firebase.RTDB.setInt(&fbdo, "/Users/-Nj8Y4gCCGdasz5SxLdp/campo1/cuadrante3/planta1/Humedad_Tierra", soilMoisture)) {
      // Success, do something, e.g., print the result
      Serial.println("Data sent to Firebase");
    } else {
      // Failed, print the error code
      Serial.print("Error sending data: ");
      Serial.println(fbdo.errorReason());
    }
  }
  
  cont += 1;

  // Wait a little before sending new data
  delay(1000);
}


