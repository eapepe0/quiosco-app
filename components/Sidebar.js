import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

//* componente que muestra un Sidebar del lado izquierdo , con un logo
//* mapeamos las categorias y mostramos el componente Categoria

export default function Sidebar() {

    const { categorias } = useQuiosco()
    return (
        <>
            <Image width={300} height={100} src="/assets/img/logo.svg" alt="imagen logotipo" />
            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
            </nav>
        </>


    )
}