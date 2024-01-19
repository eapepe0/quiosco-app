import useQuiosco from "../../../hooks/useQuiosco"

export default function TituloProducto() {
    const { producto } = useQuiosco()
    return (
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
    )
}