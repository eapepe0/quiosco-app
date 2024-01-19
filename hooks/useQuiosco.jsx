import { useContext } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco

//* lo usamos importando primero donde lo vayamos a usar :
//*
//* import useQuiosco from 'ruta del hook'
//*
//* const { datos que vayamos a sacar del Provider } = useQuiosco()
//* crear el useQuiosco en la carpeta /hooks