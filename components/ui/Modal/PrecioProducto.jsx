import { formatearDinero } from "../../../helpers"
import useQuiosco from "../../../hooks/useQuiosco"


export default function PrecioProducto() {
    const { producto } = useQuiosco()
    return (
        <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>
    )
}