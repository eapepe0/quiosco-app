import useQuiosco from "../../../hooks/useQuiosco";

export default function BotonAgregarPedido({ cantidad, edicion }) {
    const { handleAgregarPedido, producto } = useQuiosco();
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
            onClick={() => handleAgregarPedido({ ...producto, cantidad })}
        >
            {edicion ? "Guardar Cambios" : "Añadir al pedido"}
        </button>
    );
}
