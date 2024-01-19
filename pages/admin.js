import useSWR from "swr"

import AdminLayout from "../layout/AdminLayout"
import axios from "axios"
import Orden from "../components/Orden"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"


export default function Admin() {


    const [previousOrders, setPreviousOrders] = useState([]) //* guardamos las ordenes previas

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data) //* funcion encargada de pedir a /api/ordenes 


    //* usamos SWR , el cual entrega la data , si hay un error y si esta cargando
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 2000 }) //* le pedimos cada 2 seg , la funcion fetcher

    useEffect(() => {
        if (!isLoading && data) { //* si no se esta verificando y hay datos
            //* guardamos en newOrders las ordenes que no existan en previousOrders
            const newOrders = data.filter(order => !previousOrders.includes(order.id));

            //* si hay nuevas ordenes
            if (newOrders.length > 0) {
                //* mostramos el toast
                toast.success(`¡${newOrders.length} nueva(s) orden(es)!`);
                //* copiamos las ordenes anteriores , los id's de las ordenes nuevas
                setPreviousOrders([...previousOrders, ...newOrders.map(order => order.id)]);
            }
        }

    }, [data, isLoading, previousOrders]);
    return (
        <AdminLayout pagina={"Admin"}>
            <h1 className="text-4xl font-black"> Panel de Administracion </h1>
            <p className="text-2xl my-10">Administra las ordenes </p>
            {data && data.length ? data.map(orden => <Orden key={orden.id} orden={orden} />) : <p>No existe ninguna orden</p>}
        </AdminLayout>
    )
}