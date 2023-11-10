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
import { firebaseConfig } from "../.././firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import NavBar from "../.././NavBar/page";

function dashboardCards(cuadrante: string, name: string) {
  const [temp, setTemp] = useState<string>("");
  const [hum, setHum] = useState<string>("");

  useEffect(() => {
    if (cuadrante && cuadrante.includes(',')) {
      // Separate data from "0, 0" into temp and hum
      const data = cuadrante.split(",");
      setTemp(data[0].trim());
      setHum(data[1].trim());
    } else {
      setTemp("");
      setHum("");
    }
  }, [cuadrante]);

  return (
    <div>
      <Card style={{ padding: 20 }}>
        <Stack spacing={2}>
          <Typography variant="h5" style={{ fontWeight: 200, textAlign: "center" }}>
            {name}
          </Typography>

          {cuadrante === "" ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Typography variant="h6">
              Temperatura: {temp}°C
              <br />
              Humedad: {hum}%
            </Typography>
          )}
        </Stack>
      </Card>
    </div>
  );
}

export default function Home({ params }) {
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
  const [cuadrante1, setCuadrante1] = useState<string>("");
  const [cuadrante2, setCuadrante2] = useState<string>("");
  const [cuadrante3, setCuadrante3] = useState<string>("");
  const [cuadrante4, setCuadrante4] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://greenwatertech-572bc-default-rtdb.firebaseio.com/Users/${userKey}.json`
      );
      const data = await response.json();
      setCuadrante1(data.cuadrante1);
      setCuadrante2(data.cuadrante2);
      setCuadrante3(data.cuadrante3);
      setCuadrante4(data.cuadrante4);
    };

    fetchData();
  }, [userKey]);

  return (
    <div style={{ display: "flex" }}>
      <NavBar />

      <Container maxWidth="md" style={{ margin: 70 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: "white" }}>
              Hello {userEmail}, welcome to your dashboard.
            </Typography>
          </Grid>

          <Grid item xs={6}>
            {dashboardCards(cuadrante1, "Cuadrante 1")}
          </Grid>

          <Grid item xs={6}>
            {dashboardCards(cuadrante2, "Cuadrante 2")}
          </Grid>

          <Grid item xs={6}>
            {dashboardCards(cuadrante3, "Cuadrante 3")}
          </Grid>

          <Grid item xs={6}>
            {dashboardCards(cuadrante4, "Cuadrante 4")}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
