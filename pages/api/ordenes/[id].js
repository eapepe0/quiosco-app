import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient();

    //* si el metodo es post
    if (req.method === "POST") {

        //* sacamos el id , pasado por el url
        const { id } = req.query;

        //* actualizamos la base de datos , orden 
        //* donde el id sea igual al id pasado por la url
        //* y lo actualizado es el estado en true

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })

        //* contestamos un estado 200 (OK) con la orden actualizada

        res.status(200).json(ordenActualizada)
    }
}
