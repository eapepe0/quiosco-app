import Image from "next/image"
import useQuiosco from "../../../hooks/useQuiosco"

export default function Foto() {
    const { producto } = useQuiosco()
    return (

        <Image width={300} height={400} alt={`Imagen producto ${producto.nombre}`} src={`/assets/img/${producto.imagen}.jpg`} />

    )
}