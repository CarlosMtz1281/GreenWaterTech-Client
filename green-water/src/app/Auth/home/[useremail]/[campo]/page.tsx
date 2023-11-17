import TarjetaCuadrante from "@/app/components/TarjetaCuadrante"
    const testData = [
        {
            id: 1,
            name: "Cuadrante 1",
            temperatura: 20,
            humedad: 50,
            plant: "Tomatoes"
        },
        {
            id: 2,
            name: "Cuadrante 2",
            temperatura: 20,
            humedad: 50,
            plant: "Peppers"
        },
        {
            id: 3,
            name: "Cuadrante 3",
            temperatura: 20,
            humedad: 50,
            plant: "Lettuce"
        },
        {
            id: 4,
            name: "Cuadrante 4",
            temperatura: 20,
            humedad: 50,
            plant: "Carrots"
        },
    ]

export default function Campos(){
    return(
        <div >
            <h1 className="campo-tittle">Campos</h1>
            <div className="campo-container">
                    {testData.length > 0 && testData.map((item, index) => (
                <TarjetaCuadrante key={index} data={item} />
                ))}


            </div>

        </div>
    )
}