import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data to ensure we only have what we want
    await prisma.request.deleteMany({})
    await prisma.stockItem.deleteMany({})

    const categories = [
        {
            category: "Gant rouge",
            label: "Gant rouge",
            minThreshold: 10,
            stock: { "S": 20, "M": 30, "L": 30, "XL": 15 }
        },
        {
            category: "Gant noir",
            label: "Gant noir",
            minThreshold: 10,
            stock: { "S": 20, "M": 30, "L": 30, "XL": 15 }
        },
        {
            category: "Chaussure de sécurité",
            label: "Chaussure de sécurité",
            minThreshold: 5,
            stock: { "39": 5, "40": 8, "41": 12, "42": 15, "43": 10, "44": 5 }
        },
        {
            category: "Chaussette Blanche",
            label: "Chaussette Blanche",
            minThreshold: 20,
            stock: { "TU": 50 }
        },
        {
            category: "Chaussette",
            label: "Chaussette",
            minThreshold: 20,
            stock: { "39-42": 40, "43-46": 40 }
        },
        {
            category: "Bonnet",
            label: "Bonnet",
            minThreshold: 10,
            stock: { "TU": 50 }
        }
    ]

    for (const cat of categories) {
        await prisma.stockItem.create({
            data: cat
        })
    }

    console.log('Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
