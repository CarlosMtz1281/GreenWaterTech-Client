"use client";

import Image from "next/image";

import React, { useEffect, useState } from 'react';
import { Button, TextField, Alert, Stack, Typography, Paper } from '@mui/material';
import { firebaseConfig } from './firebase/firebaseconfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { set } from 'firebase/database';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
    // You can customize other theme properties here
  },
});

export default function Home() {
const [login, setLogin] = useState(false);

function startLogin(){
  setLogin(true);
  console.log("login");
};const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Submitting email: ${email} and password: ${password}`);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                const encodedEmail = encodeURIComponent(email);

                // Finally, redirect to the home page
                window.location.href = `Auth/home/${encodedEmail}`;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 5000);
    }
    , [Error]);

  return (

    <div className="landing-page">

      <div className={login ? "landing-circle active" : "landing-circle"}>
        {!login && (
          <div className="landingStage">
            <div className="landing-logoWrp">
              <Image src="/logoGreenWater.png" alt="Green Water Tech Logo" width={200} height={200} />
            </div>
            <h1 className="landing-tittle">Welcome To <br/> Green Water Tech</h1>
            <div className="landing-btnWrp">
              <button href="/signup" className="landing-btn" style={{fontSize:"1.5vw"}}>Get Started</button>
              <button onClick={() =>startLogin()}  className="landing-btn">I already have an account</button>
            </div>
          </div>
        )}
        {login && (
          <div className="loginStage">
            <div className="login-logoWrp">
              <Image src="/logoGreenWater.png" alt="Green Water Tech Logo" width={200} height={200} />
            </div>

            <ThemeProvider theme={darkTheme}>
            <div className='Login-container'>
            <h1 className="login-tittle">Log in to your account</h1>

                <form className = "formcontainer" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <div className="logIn-btnWrp">
                <button onClick={() => setLogin(false)} className="logIn-btn">Go Back</button>

                <button type="submit" className="logIn-btn">Login</button>
                </div>
                    {Error !== '' && <Alert severity="error">{Error}</Alert>}
                    </Stack>

                </form>

            </div>
            </ThemeProvider>






          </div>
        )}

      </div>
      <div className="landing-drawWrp">
        <Image src="/LandingDraw.svg" alt="illustration" width={1000} height={1000} />
      </div>
    </div>
  );
}

/*
<div className="landing-btnWrp">
            <a href="/signup" className="landing-btn" style={{fontSize:"1.5vw"}}>Get Started</a>
            <a href="/loginpage" className="landing-btn">I already have an account</a>
            </div>

            <div className="landing-btnWrp">
              <a href="/loginpage" className="landing-btn" style={{fontSize:"1.5vw"}}>Login</a>
              <a onClick={() => setLogin(false)} className="landing-btn">Go Back</a>
            </div>
*/


/*

<main className = "main-container">
      <div
        className="home introduction"
      >
        <Stack spacing={4}>
          <Typography style={{ fontSize: "5vw", fontWeight: "lighter", color: "white" }} noWrap>
            Hello, welcome to Green Water Tech
          </Typography>

          <Stack spacing={2}>
          <Link href="/signup" className = "logpagelink">
            <Fab variant="extended" className="signupbtn">
              <Typography style={{ fontWeight: 500 }} noWrap>
                Get Started
              </Typography>
            </Fab>
          </Link>

          <Link href="/loginpage" className = "logpagelink">
            <Typography style={{ fontWeight: 500, color: "white" }} noWrap>
              I already have an account
            </Typography>
          </Link>
          </Stack>
        </Stack>
      </div>
    </main>


*/