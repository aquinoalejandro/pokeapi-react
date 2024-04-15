import { useState } from "react"

const Pokimon = () => {
    const [pokimon, setPokimon] = useState([])
    const [active, setActive] = useState({})

    // traigo la data de los pokimones
    const getPokimon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then((res) => res.json())
            .then((data) => {
                setPokimon(data.results)
                // inicializo el estado active con cada pokimon como una clave y true como su valor
                const inicio = data.results.reduce((pokimones, actual) => ({ ...pokimones, [actual.name]: true }), {})
                setActive(inicio)
            })
    }

    // definimos la función toggleActive para cambiar el estado active de un pokimon específico
    const toggleActive = (nombre) => {
        setActive(prevState => ({ ...prevState, [nombre]: !prevState[nombre] }))
    }

    // renderizo
    return (
        <div>
            <button onClick={getPokimon}>Get pokimon</button>
            {pokimon.map((pokimon) => (
                <div key={pokimon.name}>
                    <a href={pokimon.url} className={active[pokimon.name] ? "active" : "disabled"}>
                        {pokimon.name}
                    </a>
                    <button onClick={() => toggleActive(pokimon.name)} className={active[pokimon.name] ? "" : "disabled"}	>
                        {active[pokimon.name] ? "x" : ""}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Pokimon
