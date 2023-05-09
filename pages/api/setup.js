import middleware from "@/middleware/middleware"
import { getServerSession } from "next-auth"
import nextConnect from "next-connect"
import { authOptions } from "./auth/[...nextauth]"
import prisma from "@/lib/prisma"

import { upload } from "../../lib/upload"


const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Not logged in' })
    console.log("handler post request recieved");
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })
    console.log("user found" + JSON.stringify(user));

    if (!user) return res.status(401).json({ message: 'User not found' })

    await prisma.user.update({
        where: { id: user.id },
        data: {
            name: req.body.name[0],
            username: req.body.username[0],
        },
    })
    console.log("updated user: " + JSON.stringify(user));

    if (req.files && req.files.image[0]) {
        console.log("files present image present");
        const avatar_url = await upload(
            req.files.image[0].path,
            req.files.image[0].originalFilename,
            user.id
        )

        console.log("avatar url: " + avatar_url);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                image: avatar_url,
            },
        })
    }

    res.end()
    return

})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler