import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]); //* aca cargamos las categorias que sacamos de una base de datos
    const [categoriaActual, setCategoriaActual] = useState({}); //* aca guardamos la categoria actual donde hacemos click por ejemplo cafe
    const [producto, setProducto] = useState({}); //* aca guardamos los productos que van en el carrito
    const [modal, setModal] = useState(false); //* aca mostramos u ocualtamos el modal , cantidad de productos que necesitamos en el pedido
    const [pedido, setPedido] = useState([]); //* aca guardamos el pedido 
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [completadas, setCompletadas] = useState([])

    const router = useRouter()

    //*  llamamos a la api y buscamos las categorias , ese valor lo ponemos en el estado categorias
    const obtenerCategorias = async () => {
        const { data } = await axios("/api/categorias");
        setCategorias(data);
    };

    //* obtiene la categoria hace una peticion asincrona cuando carga la pagina
    useEffect(() => {
        obtenerCategorias(); //* hace una llamada a la api , busca en la DB las categorias y llena el estado categorias
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);
    //* al ser una funcion asincrona la que llena categorias esperamos que se ejecute y despues se llene , cuando se llena cambia el estado y ahi se ejecuta el effect

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])





    //* si hacemos click en un elemento recibimos el id del elemento
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter((cat) => cat.id === id); //* buscamos en las categorias un elemento dentro del array que tenga el mismo id que clickeamos y lo guardamos
        setCategoriaActual(categoria[0]); //* ponemos el resultado en categoriaActual , al ser un Objeto para poder guardalo ingresamos al indice 0
        router.push("/") //* si estamos en otra pagina por ejemplo resumen o total y hacemos click en la sidebar nos muestra la pantalla principal
    };

    //* si hacemos click en el boton agregar el carrito , pónemos el producto en el carrito (producto)
    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    //* mostramos u ocultamos el modal
    const handleChangeModal = () => {
        setModal(!modal);
    };

    //* haciendo un objeto {} desestructuramos , sacamos categoriaId  y despues copiamos el resto , asi los eliminamos
    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        //* some devuelve true si un elemento del array cumple con la funcion del callback
        if (pedido.some((productoState) => productoState.id === producto.id)) {
            //* mapeamos el array del carrito y comparamos que ya exista en el carro, si es verdadero devolvemos el producto actualizado y si es falso el
            const pedidoActualizado = pedido.map((productoState) => {
                //* si el producto mapeado es igual al producto que recibimos
                if (productoState.id === producto.id) {
                    console.log(`producto : ${JSON.stringify(producto)}`);
                    //* devolvemos el producto en el array pedidoActualizado
                    return producto;
                } else {
                    //* significa quen en el mapeo el producto es distinto por eso devolvemos el producto original
                    console.log(`productoState : ${JSON.stringify(productoState)}`);
                    return productoState;
                }
            });
            //* const pedidoActualizado = pedido.map(productoState => producto.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado);
            toast.success("Guardado correctamente")
        } else {
            //*  Si el producto no existe en el pedido, la función agrega el producto al final del pedido utilizando el operador de propagación ...
            setPedido([...pedido, producto]);
            toast.success("Agregado al pedido")
        }
        setModal(false) //* se cierra al apretar el boton de Actualizar o de Guardar Cambios
    };


    const handleEditarCantidades = (id) => {
        const productoActualizar = pedido.filter(producto => producto.id === id) //* obtenemos el producto con el id pasado del carrito (producto)
        setProducto(productoActualizar[0]) //* pasamos el producto filtrado a producto, asi se puede ver en el modal
        setModal(!modal) //* como el modal estaba cerrado , ahora lo abrimos
    }

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)  //* obtenemos todos los productos menos el del id pasado del carrito (producto)
        setPedido(pedidoActualizado) //* ponemos todo lo filtrado en pedido, (carro de compras)
    }

    const colocarOrden = async (e) => {
        e.preventDefault() //* no se nos resetea la app cuando enviamos datos
        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })
            //* enviamos a nuestra api/ordenes los siguientes datos

            //* resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            //* mostramos un mensaje 
            toast.success('Pedido Realizado Correctamente')

            //* esperamos 3 seg y volvemos al root
            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error)

        }
    }

    const obtenerOrdenesCompletadas = async () => {
        try {
            const { data } = await axios.get('/api/ordenes/completadas') //* pedimos a la api que filtre los pedidos que tienen el estado en true (finalizado)
            setCompletadas(data) //* ponemos esos datos en el estado completadas
        } catch (error) {
            console.log(error)
        }
    }

    //* funcion que llama a la api dependiendo del id , cambia el estado de false a true
    const completarOrden = async (id) => {
        try {
            const data = await axios.post(`/api/ordenes/${id}`);
            if (data.status === 200) {
                toast.success("Orden completada correctamente.");
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total,
                obtenerOrdenesCompletadas,
                completadas,
                completarOrden
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider };

export default QuioscoContext;

//* recomendado : crear el archivo en QuioscoProvider.jsx en la carpeta context
//* modo de uso : <QuioscoProvider>
//*             :    <App/> o un Componente de Alto Orden (HOC)
//*               </QuioscoProvider>
