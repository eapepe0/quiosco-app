import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import Producto from '../components/Producto'

export default function Home() {
  const { categoriaActual } = useQuiosco()
  console.log(categoriaActual)
  return (
    <Layout pagina={`Menu - ${categoriaActual?.nombre}`}> {/* en pagina cambiamos el Titulo de la pagina */}
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1> {/* Titulo en negrita */}
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuacion ...</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"> {/* grid */}
        {
          categoriaActual?.productos?.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))
        }
      </div>
    </Layout>

  )
}




/**
|--------------------------------------------------
|  const categorias = await prisma.categoria.findMany() //* buscamos todo

   //* buscamos por nombre
  const categorias = await prisma.categoria.findFirst({
    where: {
      nombre: "Tomate"
    },
  }) //* no existe devuelve null


  const categorias = await prisma.categoria.findFirst({
    where: {
      nombre: "Café"
    }
  }) //* devuelve : { id: 1, nombre: 'Café', icono: 'cafe' }

|--------------------------------------------------
*/