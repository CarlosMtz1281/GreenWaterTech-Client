'use client'

import React, {useState, useEffect, use} from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import { firebaseConfig } from "../.././firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import NavBar from "../.././NavBar/page";

export default function Home({ params }) {
    const userEmail = decodeURIComponent(params.useremail);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [user, setUser] = useState<DocumentData | null>(null);
    const [userKey, setUserKey] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'users', userEmail); // Use the correct collection name and document id
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              setUser(docSnap.data());
            } else {
              // Handle the case where the document does not exist
              setUser(null);
            }
          };
      
          fetchData();
    }
    , [userEmail]);

    // Deconstruct document data
    useEffect(() => {
        if (user) {
            setUserKey(user.email);
        }
    }
    , [user]);

    // Retrieve user data from Realtime Database
    const [cuadrante1, setCuadrante1] = useState<string>('');
    const [cuadrante2, setCuadrante2] = useState<string>('');
    const [cuadrante3, setCuadrante3] = useState<string>('');
    const [cuadrante4, setCuadrante4] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://greenwatertech-572bc-default-rtdb.firebaseio.com/Users/${userKey}.json`);
            const data = await response.json();
            setCuadrante1(data.cuadrante1);
            setCuadrante2(data.cuadrante2);
            setCuadrante3(data.cuadrante3);
            setCuadrante4(data.cuadrante4);
        };

        fetchData();
    }
    , [userKey]);



  return (
    <div style={{ display: "flex" }}>
      <NavBar />

      <Container maxWidth="md" style={{ margin: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" style = {{color: 'white'}}>
              Hello {userEmail}, welcome to your dashboard.
              
              Cuadrante 1: {cuadrante1}
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}
