import Head from "next/head"
import Sidebar from "../components/Sidebar"
import Modal from "react-modal"
import Pasos from '../components/Pasos'


import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"


//* estilos para el modal , para que este al medio de la pantalla
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50% , -50%)",
    },
};

//*  lo agregamos al root , en caso de Next es en #__next
Modal.setAppElement("#__next")


/**
* Layout
*
* @param {children}  children Son los hijos que van a ser renderizados
* @param {string}  pagina titulo de la pagina
* @return {component}  Componente Que tiene un titulo , un sidebar y un main , y se muestra un modal 
*/



export default function Layout({ children, pagina }) {
    const { modal } = useQuiosco(); //* aca guardamos el estado del modal , si esta abierto o cerrado
    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafeteria" />
            </Head>
            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar />
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        <Pasos />
                        {children}
                    </div>
                </main>
            </div>
            {modal && (<Modal isOpen={modal} style={customStyles}><ModalProducto /></Modal>)}
            <ToastContainer />
        </>

    )
}
