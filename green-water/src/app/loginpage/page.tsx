'use client'

import React, { useEffect, useState } from 'react';
import { Button, TextField, Alert, Stack, Typography, Paper } from '@mui/material';
import { firebaseConfig } from '../firebase/firebaseconfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { set } from 'firebase/database';
import Link from 'next/link';

const SignInPage = () => {
    const [email, setEmail] = useState('');
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
        <div className='signcontainer'>
            <Paper elevation={5} style = {{height: "50vh", padding: 30}}>
        <form className = "formcontainer" onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <Typography style = {{fontWeight: "lighter"}} variant="h4">Log in to your account</Typography>
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

            <Button className = "loginbtn" type="submit">Log In</Button>

            {Error !== '' && <Alert severity="error">{Error}</Alert>}
            </Stack>

        </form>
        </Paper>
        </div>
    );
};

export default SignInPage;
