import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

/**
|--------------------------------------------------
| Componente encargado de llenar las categorias , las cuales son cargadas en el archivo prisma/data/categorias.ts
| muestra la categoria , depende de la categoria clickeada carga los productos que corresponden a dicha categoria
|--------------------------------------------------
*/

export default function Categoria({ categoria }) {
    const { nombre, icono, id } = categoria
    const { handleClickCategoria, categoriaActual } = useQuiosco()
    return (
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>

            <Image src={`/assets/img/icono_${icono}.svg`} alt={`Imagen de ${nombre}`} width={70} height={70} className="mr-5" />
            <button type="button" className="text-2xl font-bold hover:cursor-pointer" onClick={() => handleClickCategoria(id)}>{nombre}</button>

        </div>
    )
}