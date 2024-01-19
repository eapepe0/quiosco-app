import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const prisma = new PrismaClient() //* nos conectamos a nuestra base de datos en Prisma

export default async function handler(req, res) {
    //* buscamos en la DB todos los productos donde 
    const productos = await prisma.producto.findMany(
        {
            where: {
                categoriaId: 1,
            },
        }
    ); //* devolvemos los productos
    res.status(200).json(productos)
}

//* esto se llama como eager Loading o cargar todos los datos

//* la otra opcion seria :

/**
|--------------------------------------------------
| const categorias = await prisma.categoria.findMany({
    include : {
        productos : true,
    }
})
|--------------------------------------------------
[{
    "id":1,
    "nombre":"Café",
    "icono":"cafe",
    "productos":[
        {
            "id":1,
            "nombre":"Café Caramel con Chocolate",
            "precio":59.9,
            "imagen":"cafe_01",
            "categoriaId":1
        },
        {
            "id":2,
            "nombre":"Café Frio con Chocolate Grande",
            "precio":49.9,
            "imagen":"cafe_02"
            ,"categoriaId":1
        }
    ]
}]
| 
|--------------------------------------------------
*/