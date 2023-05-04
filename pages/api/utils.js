import prisma from "@/lib/prisma"
import {faker} from '@faker-js/faker'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.end()
   
     if(req.body.task === 'clean_database') {
        await prisma.user.deleteMany({})
     }
    if(req.body.task === 'generate_content') {
        let usersCount = 0
        while (usersCount < 10) {
            await prisma.user.create({
                data: {
                    name: faker.name.findName(),
                    username: faker.internet.userName().toLowerCase(),
                    email: faker.internet.email().toLowerCase(),
                    image: faker.image.avatar(),
                },
            })
            usersCount++
        }

        const videoURL = 'https://bootcamp-sharanjeet.fra1.digitaloceanspaces.com/SampleVideo_360x240_5mb.mp4'
        const thumbnailURL = 'https://bootcamp-sharanjeet.fra1.digitaloceanspaces.com/img.jpeg'

        const users = await prisma.user.findMany()

        const getRandomUser = () => {
            const randomIndex = Math.floor(Math.random() * users.length)
            return users[randomIndex]
        }

        let videosCount = 0
        while (videosCount < 20){
            await prisma.video.create({
                data: {
                    title: faker.lorem.words(),
                    thumbnail: thumbnailURL,
                    url: videoURL,
                    length: faker.datatype.number(1000),
                    visibility: 'public',
                    views: faker.datatype.number(1000),
                    author: {
                        connect: { id: getRandomUser().id },
                    },
                },
            })
            videosCount++
        }


    }
    if(req.body.task === 'clean_database') {

    }
    res.end()
}