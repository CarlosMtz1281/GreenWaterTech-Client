"use client";

import React, { useState, useEffect, use } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { firebaseConfig } from "../../../firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import NavBar from "../../NavBar/Navbar";

import TarjetaCampo from "@/app/components/TarjetaCampo";

function dashboardCards(Temperatura: string, Humedad: string, name: string) {



  return (
    <div>
      <Card style={{ padding: 20 }}>
        <Stack spacing={2}>
          <Typography variant="h5" style={{ fontWeight: 200, textAlign: "center" }}>
            {name}
          </Typography>

          {Temperatura === "" ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Typography variant="h6">
              Temperatura: {Temperatura}°C
              Humedad: {Humedad}%
            </Typography>
          )}
        </Stack>
      </Card>
    </div>
  );
}

export default function Home({ params }) {
  const testData =[
    {
      id: 1,
      name: "Campo 1",
      cuadrantes: [
        {
          id: 1,
          name: "Cuadrante 1",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 2,
          name: "Cuadrante 2",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 3,
          name: "Cuadrante 3",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 4,
          name: "Cuadrante 4",
          temperatura: 20,
          humedad: 50,
        },
      ],
    },
    {
      id: 2,
      name: "Campo 2",
      cuadrantes: [
        {
          id: 1,
          name: "Cuadrante 1",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 2,
          name: "Cuadrante 2",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 3,
          name: "Cuadrante 3",
          temperatura: 20,
          humedad: 50,
        },
        {
          id: 4,
          name: "Cuadrante 4",
          temperatura: 20,
          humedad: 50,
        },
      ],

    }
  ]


  const userEmail = decodeURIComponent(params.useremail);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [user, setUser] = useState<DocumentData | null>(null);
  const [userKey, setUserKey] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", userEmail); // Use the correct collection name and document id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        // Handle the case where the document does not exist
        setUser(null);
      }
    };

    fetchData();
  }, [userEmail]);

  // Deconstruct document data
  useEffect(() => {
    if (user) {
      setUserKey(user.email);
    }
  }, [user]);

  // Retrieve user data from Realtime Database
  const [campo, setCampo] = useState<string>("");
  const [cuadrante1, setCuadrante1] = useState<string>("");
  const [cuadrante2, setCuadrante2] = useState<string>("");
  const [cuadrante3, setCuadrante3] = useState<string>("");
  const [cuadrante4, setCuadrante4] = useState<string>("");
  const [cuad1Temp, setCuad1Temp] = useState<string>("");
  const [cuad1Hum, setCuad1Hum] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://greenwatertech-572bc-default-rtdb.firebaseio.com/Users/${userKey}/campo1/cuadrante1/Humedad.json`

      );
      const data = await response.json();
      setCuad1Hum(data);

      const response2 = await fetch(
        `https://greenwatertech-572bc-default-rtdb.firebaseio.com/Users/${userKey}/campo1/cuadrante1/Temperatura.json`
      );

      var data2 = await response2.json();
      // Round temperature to 2 decimals
      data2 = Math.round(data2 * 100) / 100;
      setCuad1Temp(data2);

    };

    fetchData();
  }, [userKey]);



  return (
    <div>
        <h1 className="home-tittle">Hello {userEmail}</h1>
        <div className="home-cardContainer">
            {testData.map((item, index) => (
            <TarjetaCampo key={index} data={item} />
          ))}
        </div>

    </div>
  );
}
