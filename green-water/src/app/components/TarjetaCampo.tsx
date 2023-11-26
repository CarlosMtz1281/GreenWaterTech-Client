import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";


interface Plant {
  Humedad: number;
  Humedad_Tierra: number;
  Humedad_Tierra_lastHour: number;
  Humedad_lastHour: number;
  Temperatura: number;
  Temperatura_lastHour: number;
}

interface Cuadrante {
  planta1: Plant;
}

interface Campo {
  Coordenates: string;
  Locaiton: string;
  cuadrante1: Cuadrante;
  cuadrante2: Cuadrante;
  cuadrante3: Cuadrante;
  cuadrante4: Cuadrante;
  idUB: number;
  name: string;
}

interface TarjetaCampoProps {
  data: Campo;
}

const styles = {
  container: {
    display: 'flex',
    height: '20vh',
    width: '78vw',
    backgroundColor: 'aliceblue',
    borderRadius: '20px',
    margin: '1vw',
  },
  title: {
    display: 'flex',
    fontSize: '1.7vw',
    fontWeight: '600',
    margin: '1vw',
    marginLeft: '2vw',
  },
  subtitle: {
    display: 'flex',
    fontSize: '1rem',
    fontWeight: '400',
    marginTop: '-1vw',
    marginLeft: '2vw',
  },
  tittleWrap: {
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
    marginLeft: "5vw",
    marginTop: "7vh"

  },
  divisor: {
    height: "15vh",
    width: "2px",
    backgroundColor: "black",
    marginTop: "2.5vh",
    marginLeft: "5vw",
    marginBottom: "1vh",
    display: "flex",
  },
  cuadranteTittle:{
    marginLeft: "2vw",
    marginTop: "1vh",
    fontSize: "2vw"
  },
  cuadrantesGrid:{
    display:"flex",
    marginLeft:"5vw",
    marginTop: "2vh",

  },
  cuadranteWrp:{
    height: "15vh",
    width: "8vw",
    backgroundColor: "#cbcaca",
    borderRadius: "10px",
    padding: "10px",
    marginRight: "1vw",

  },
  cuadranteSection:{

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

  return (
    <div style={styles.container}>
      <div style={styles.tittleWrap}>
        <h2 style={styles.title}>Campo {data.name}</h2>
        <h4 style={styles.subtitle}>{data.Locaiton}</h4>
      </div>
      <div style={styles.divisor} />

      <div style={styles.cuadranteSection}>
        <div style={styles.cuadrantesGrid}>
          {Object.keys(data).filter(key => key.startsWith('cuadrante')).map((cuadrante) => (
            <div style={styles.cuadranteWrp}>
              <h3>{cuadrante}</h3>
              {Object.keys(data[cuadrante]).map((planta) => (
                <div>
                  <h4>{planta}</h4>
                  <h4>Hum: {data[cuadrante][planta].Humedad}</h4>
                  <h4>Temp: {data[cuadrante][planta].Temperatura}</h4>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Link href={`/Auth/home/${userID}/campo1`}>
        <div style={styles.button}>
          <p>See More</p>
        </div>
      </Link>
    </div>
  );
};

export default TarjetaCampo;
