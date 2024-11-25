import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const prisma = new PrismaClient() //* nos conectamos a nuestra base de datos en prisma

export default async function handler(req, res) {
    //* suscamos en categoria , todo lo que incluya productos
    const categorias = await prisma.category.findMany({
        include: {
            productos: true,
        }
    })
    //* devolvemos en un response el estado (200) un json con las categorias
    res.status(200).json(categorias)
}
