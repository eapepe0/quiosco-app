

import AdminLayout from "../layout/AdminLayout"
import Orden from "../components/Orden"
import useQuiosco from "../hooks/useQuiosco";
import { useEffect } from "react";


export default function OrdenesCompletadas() {
    const { obtenerOrdenesCompletadas, completadas } = useQuiosco()
    //* obtenemos la funcion que le pide a la api , que ordenes tienen el estado en true (finalizado) y el estado (completadas) donde estas se guardan

    //* una vez que carga la pagina , obtenemos las ordenes completadas
    useEffect(() => {
        obtenerOrdenesCompletadas()
    }, []);

    //* si las ordenes completadas , existen y tienen un largo , se mapean de lo contrario no existe ninguna orden
    return (
        <AdminLayout pagina={"Ordenes Completadas"}>
            <h1 className="text-4xl font-black"> Panel de Ordenes </h1>
            <p className="text-2xl my-10">Administra las ordenes Completadas</p>
            {completadas && completadas.length ? completadas.map((orden, index) =>
            (
                <div key={index} className="my-5">
                    <Orden key={orden.id} orden={orden} boton={false} />
                </div>
            )

            ) :
                <p>No existe ninguna orden</p>}
        </AdminLayout>
    )
}