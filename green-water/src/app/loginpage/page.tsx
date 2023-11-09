'use client'

import React, { useEffect, useState } from 'react';
import { Button, TextField, Alert, Stack, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
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
                window.location.href = '/home';
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
        <form className = "formcontainer" onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <Typography style = {{fontWeight: "lighter"}} variant="h4">Sign In</Typography>
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

            <Typography style = {{fontWeight: "lighter"}} variant="h5">Or, use your Google Account</Typography>

            {Error !== '' && <Alert severity="error">{Error}</Alert>}
            </Stack>

        </form>
        </div>
    );
};

export default SignInPage;
