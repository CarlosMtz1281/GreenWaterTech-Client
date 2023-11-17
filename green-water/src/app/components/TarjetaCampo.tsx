interface Plant {
  Humedad: number;
  Nombre: string;
  Temperatura: number;
}

interface Cuadrante {
  [key: string]: Plant;
}

interface Campo {
  [key: string]: Cuadrante;
}

interface TarjetaCampoProps {
  data: Campo;
}

const styles = {
  container: {
    height: "20vh",
    width: "78vw",
    backgroundColor: "aliceblue",
    borderRadius: "20px",
    margin: "1vw",
  },
  title: {
    display: "flex",
    fontSize: "3vw",
    fontWeight: "600",
    margin: "1vw",
    marginLeft: "2vw",
  },
  subtitle: {
    display: "flex",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "-1vw",
    marginLeft: "2.2vw",
  },
  tittleWrap: {
    position: "absolute" as "absolute",
    marginTop: "3vh",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3796e8",
    color: "white",
    borderRadius: "10px",
    height: "5vh",
    width: "10vw",
    justifyContent: "center",
    alignItems: "center",
    //center
    display: "flex",
    marginLeft: "66vw",
    marginTop: "-3vh",
  },
  divisor: {
    height: "15vh",
    width: "2px",
    backgroundColor: "black",
    marginTop: "2.5vh",
    marginLeft: "20vw",
    marginBottom: "1vh",
    display: "flex",
    position: "absolute" as "absolute",
  },
  cuadranteTittle: {
    marginLeft: "22vw",
    marginTop: "2vh",
    fontSize: "2vw",
  },
  cuadrantesGrid: {
    display: "flex",
    marginLeft: "22vw",
  },
  cuadranteWrp: {
    height: "10vh",
    width: "8vw",
    backgroundColor: "#cbcaca",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "1vw",
  },
};

const TarjetaCampo: React.FC<TarjetaCampoProps> = ({ data }) => {
  return (
    <div style={styles.container}>
      <div style={styles.tittleWrap}>
        <h2 style={styles.subtitle}>Campo</h2>
      </div>
      <div style={styles.divisor} />

      <div style={styles.cuadranteTittle}>
        <h2>Cuadrantes</h2>
      </div>

      <div style={styles.cuadrantesGrid}>
        {Object.keys(data).map((cuadrante) => (
          <div style={styles.cuadranteWrp}>
            <h3>{cuadrante}</h3>
            {Object.keys(data[cuadrante]).map((planta) => (
              <div>
                <h4>{planta}</h4>
                <h4>{data[cuadrante][planta].Humedad}</h4>
                <h4>{data[cuadrante][planta].Temperatura}</h4>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={styles.button}>
        <h3>Ver</h3>
      </div>
    </div>
  );
};

export default TarjetaCampo;
