import { PrismaClient } from "@prisma/client";

export default async function handler(request, response) {

    const prisma = new PrismaClient();


    //* si hacemos un get
    if (request.method === 'GET') {
        //* buscamos en la base de datos , todo lo que tenga el estado en true
        const ordenesCompletadas = await prisma.orden.findMany({
            where: {
                estado: true
            }
        })
        //* devolvemos una respuesta con el estado 200 (OK) y un json con las ordenes completadas
        response.status(200).json(ordenesCompletadas)
    }

}
