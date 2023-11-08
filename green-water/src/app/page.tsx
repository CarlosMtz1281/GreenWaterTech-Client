import NavBar from "./NavBar/page";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Stack,
  Fab,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className = "main-container">
      <div
        className="home introduction"
      >
        <Stack spacing={4}>
          <Typography style={{ fontSize: "3vw", fontWeight: 200 }} noWrap>
            Hello, welcome to Green Water Tech
          </Typography>

          <Link href="/home" className = "logpagelink">
            <Fab variant="extended" className="signupbtn">
              <Typography style={{ fontWeight: 500 }} noWrap>
                Get Started
              </Typography>
            </Fab>
          </Link>

          <Link href="/home" className = "logpagelink">
            <Typography style={{ fontWeight: 500, color: "black" }} noWrap>
              I already have an account
            </Typography>
          </Link>
        </Stack>
      </div>
    </main>
  );
}
