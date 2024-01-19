import useQuiosco from "../../../hooks/useQuiosco";

export default function BotonRestar({ cantidad, setCantidad }) {

    return (
        <button type="button" onClick={() => {
            if (cantidad <= 1) return;
            setCantidad(cantidad - 1)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    )
}