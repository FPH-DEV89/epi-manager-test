import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const requestCount = await prisma.request.count()
        const itemCount = await prisma.requestItem.count()
        const stockCount = await prisma.stockItem.count()
        console.log(`Requests: ${requestCount}`)
        console.log(`Items: ${itemCount}`)
        console.log(`Stock: ${stockCount}`)
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
