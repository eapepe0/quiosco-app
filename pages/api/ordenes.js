import { PrismaClient } from "@prisma/client"

export default async function handler(request, response) {
    const prisma = new PrismaClient();

    //* obtener ordenes


    if (request.method === 'GET') {
        const ordenes = await prisma.orden.findMany({
            where: {
                estado: false
            }
        })

        response.status(200).json(ordenes)
    }



    //*  crear ordenes

    if (request.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: request.body.nombre,
                total: request.body.total,
                pedido: request.body.pedido,
                fecha: request.body.fecha
            }
        })
        response.status(200).json(orden)
    }
}