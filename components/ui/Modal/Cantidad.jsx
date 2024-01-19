import { useEffect, useState } from "react"
import useQuiosco from "../../../hooks/useQuiosco"

export default function Cantidad({ cantidad, setCantidad, setEdicion }) {
    const { pedido, producto } = useQuiosco()


    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido])


    return (
        <p className="text-3xl">{cantidad}</p>
    )
}