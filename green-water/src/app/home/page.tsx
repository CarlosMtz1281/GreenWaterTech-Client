import React from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import NavBar from "../NavBar/page";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />

      <Container maxWidth="md" style={{ margin: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" noWrap>
              Home page
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
