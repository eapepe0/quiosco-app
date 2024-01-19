import { useRouter } from "next/router"
import useQuiosco from "../hooks/useQuiosco"


const pasos = [
    { paso: 1, nombre: "Menú", url: "/" },
    { paso: 2, nombre: "Resumen", url: "/resumen" },
    { paso: 3, nombre: "Datos y Total", url: "/total" },
]


const Pasos = () => {
    const { handleChangePaso } = useQuiosco()
    const router = useRouter()

    const calcularProgreso = () => {
        let valor;
        if (router.pathname === '/') { //* depense de la ruta
            valor = 1; //* el valor del progreso de los pasos
        } else if (router.pathname === "/resumen") { //* paso 2
            valor = 50; //* el valor es 50
        } else {
            valor = 100
        }
        return valor
    }

    const calcularFondo = (paso) => {
        if (paso === 1) { //* primer paso fondo amarillo
            return 'bg-amber-500'
        }
        if (paso === 50) { //* mitad fondo azul
            return 'bg-blue-500'
        }
        return 'bg-green-500' //* ultimo paso fondo verde
    }

    return (
        <>
            <div className="flex justify-between mb-5">
                {
                    pasos.map(paso => (
                        <button onClick={() => {
                            router.push(paso.url)
                        }
                        }
                            key={paso.paso}
                            className="text-2xl font-bold"
                        >{paso.nombre}</button>
                    ))
                }
            </div>
            <div className="bg-gray-100 mb-10">
                <div className={`rounded-full ${calcularFondo(calcularProgreso())} text-xs leading-none text-center h-2 text-white
                `} style={{ width: `${calcularProgreso()}%` }}>
                </div>
            </div>
        </>
    )
}

export default Pasos