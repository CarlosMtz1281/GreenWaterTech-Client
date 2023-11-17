import Link from "next/link";
import { useState } from "react";
import{ useEffect } from "react";

interface TarjetaCampoProps {
    data: {
      // Define the shape of the data object here
      id: number;
      name: string;
      cuadrantes: {
        id: number;
        name: string;
        temperatura: number;
        humedad: number;
      }[];
    };
  }
  const styles = {
    container: {

      height: '20vh',
      width: '78vw',
      backgroundColor: 'aliceblue',
      borderRadius: '20px',
      margin: '1vw',
    },
    title: {
      display: 'flex',
      fontSize: '3vw',
      fontWeight: '600',
      margin: '1vw',
      marginLeft: '2vw',
    },
    subtitle: {
      display: 'flex',
      fontSize: '1rem',
      fontWeight: 'bold',
      marginTop: '-1vw',
      marginLeft: '2.2vw',
    },
    tittleWrap: {
     position: "absolute",
     marginTop: "3vh",
     justifyContent: "center",
     alignItems: "center"
    },
    button: {
      backgroundColor: "#3796e8",
      color: 'white',
      borderRadius: '10px',
      height: '5vh',
      width: '10vw',
      justifyContent: "center",
      alignItems: "center",
      //center
      display: "flex",
      marginLeft: "66vw",
      marginTop: "-3vh"

    },
    divisor: {
      height: "15vh",
      width: "2px",
      backgroundColor: "black",
      marginTop: "2.5vh",
      marginLeft: "20vw",
      marginBottom: "1vh",
      display: "flex",
      position: "absolute"
    },
    cuadranteTittle:{
      marginLeft: "22vw",
      marginTop: "2vh",
      fontSize: "2vw"
    },
    cuadrantesGrid:{
      display:"flex",
      marginLeft:"22vw"

    },
    cuadranteWrp:{
      height: "10vh",
      width: "8vw",
      backgroundColor: "#cbcaca",
      borderRadius: "10px",
      padding: "5px",
      marginRight: "1vw"
    }
  };
  const TarjetaCampo: React.FC<TarjetaCampoProps> = ({ data }) => {
    const [userID, setUserId] = useState("");
    var URL;
    useEffect(() => {
      URL = window.location.href.split("/")[5];
      setUserId(URL);
    }, []);
    console.log(userID);

    return(
        <div style={styles.container}>
          <div style={styles.tittleWrap}>
            <h1 style={styles.title}>{data.name}</h1>
            <p style={styles.subtitle}>Id: {data.id}</p>
          </div>
            <div style={styles.divisor}/>
              <h3 style={styles.cuadranteTittle}>Cuadrantes</h3>
              <div style={styles.cuadrantesGrid}>
                  <div style ={styles.cuadranteWrp}>
                    <p>Id: {data.cuadrantes[0].id}</p>
                    <p>Temp: {data.cuadrantes[0].temperatura}</p>
                    <p>Hum: {data.cuadrantes[0].humedad}</p>
                  </div>

                  <div style ={styles.cuadranteWrp}>
                    <p>Id: {data.cuadrantes[1].id}</p>
                    <p>Temp: {data.cuadrantes[1].temperatura}</p>
                    <p>Hum: {data.cuadrantes[1].humedad}</p>
                  </div>

                  <div style ={styles.cuadranteWrp}>
                    <p>Id: {data.cuadrantes[2].id}</p>
                    <p>Temp: {data.cuadrantes[2].temperatura}</p>
                    <p>Hum: {data.cuadrantes[2].humedad}</p>
                  </div>

                  <div style ={styles.cuadranteWrp}>
                    <p>Id: {data.cuadrantes[3].id}</p>
                    <p>Temp: {data.cuadrantes[3].temperatura}</p>
                    <p>Hum: {data.cuadrantes[3].humedad}</p>
                  </div>
              </div>
              <Link href={`/Auth/home/${userID}/campo1`
                }>
                <div style={styles.button}>
                  <p>See More</p>
                </div>
              </Link>
        </div>
    )
}

export default TarjetaCampo;