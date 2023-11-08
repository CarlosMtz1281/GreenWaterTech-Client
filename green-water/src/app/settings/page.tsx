import React from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import NavBar from '../NavBar/page';

const ConfigurationPage = () => {
  return (
    <div style = {{display: "flex"}}>

        <NavBar />

    <Container maxWidth="md" style = {{margin: 50}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" noWrap>Configuration page</Typography>
          </Grid>
        <Grid item xs={12}>
          <TextField label="Device Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Device ID" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="API Key" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" style = {{backgroundColor: "blue"}}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default ConfigurationPage;
