import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"



/**
* componente encargado de mostrar el producto , una imagen y un boton para agregar en el carro , abre el modal y carga los datos del producto en el
*
* @param {objeto} producto un objeto con el producto , cargado
* @return {componente}  Imagen arriba , titulo en el medio , precio , y un boton para agregar el producto en el carrito
*/





export default function Producto({ producto }) {
    const { handleSetProducto, handleChangeModal } = useQuiosco()
    const { nombre, imagen, precio } = producto
    return (
        <div className="border p-3">
            <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen ${nombre}`} width={400} height={500} />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)} </p>
                <button type="button" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        handleSetProducto(producto)
                        handleChangeModal()
                    }
                    } >Agregar al carrito</button>
            </div>
        </div>
    )
}