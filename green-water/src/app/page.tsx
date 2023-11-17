import Image from "next/image";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="landing-circle">
          <div className="landing-logoWrp">
            <Image src="/logoGreenWater.png" alt="Green Water Tech Logo" width={200} height={200} />
          </div>
          <h1 className="landing-tittle">Welcome To <br/> Green Water Tech</h1>
          <div className="landing-btnWrp">
            <a href="/signup" className="landing-btn" style={{fontSize:"1.5vw"}}>Get Started</a>
            <a href="/loginpage" className="landing-btn">I already have an account</a>
            </div>
      </div>
    </div>
  );
}

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