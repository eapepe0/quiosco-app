import useQuiosco from "../hooks/useQuiosco"
import { useState } from "react"
import Foto from "./ui/Modal/Foto"
import BotonCerrar from "./ui/Modal/BotonCerrar"
import TituloProducto from "./ui/Modal/TituloProducto"
import PrecioProducto from "./ui/Modal/PrecioProducto"
import BotonRestar from "./ui/Modal/BotonRestar"
import Cantidad from "./ui/Modal/Cantidad"
import BotonSumar from "./ui/Modal/BotonSumar"
import BotonAgregarPedido from "./ui/Modal/BotonAgregarPedido"

/**
|--------------------------------------------------
| componente que muestra un modal
|--------------------------------------------------
*/

export default function ModalProducto() {

    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    return (
        <div className="md:flex gap-10"> {/* contenedor central */}
            <div className="md:w-1/3">{/* dividimos el contenedor en 3 , y usamos una parte */}
                <Foto width={300} height={400} /> {/* mostramos la foto */}
            </div>
            <div className="md:w-2/3"> {/* usamos la otras 2 partes  */}
                <div className="flex justify-end"> {/* movemos el contenedor a la derecha */}
                    <BotonCerrar /> {/* boton de cerrar el modal */}
                </div>
                <TituloProducto /> {/* titulo del producto */}
                <PrecioProducto /> {/* precio del producto */}
                <div className="flex gap-4 mt-5"> {/* contenedor horizontal */}
                    <BotonRestar cantidad={cantidad} setCantidad={setCantidad} /> {/* boton restar producto */}
                    <Cantidad cantidad={cantidad} setCantidad={setCantidad} setEdicion={setEdicion} /> {/* mostramos la cantidad elegida */}
                    <BotonSumar cantidad={cantidad} setCantidad={setCantidad} /> {/* sumamos productos */}
                </div>
                <BotonAgregarPedido cantidad={cantidad} edicion={edicion} /> {/* agregamos el producto al carrito */}
            </div>
        </div>
    )
}