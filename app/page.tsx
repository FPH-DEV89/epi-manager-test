import { prisma } from "@/lib/prisma"
import EmployeeWizard from "@/components/employee-wizard"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  try {
    const stockItems = await prisma.stockItem.findMany({
      orderBy: { label: 'asc' }
    })

    // Transform JSON to plain object for Client Component
    const serializedStock = stockItems.map(item => ({
      id: item.id,
      category: item.category,
      label: item.label,
      stock: (item.stock as Record<string, number>) || {}
    }))

    return (
      <main className="min-h-screen bg-background p-4 md:p-10">
        <EmployeeWizard stockItems={serializedStock} />
      </main>
    )
  } catch (error) {
    console.error("Database error:", error)
    return (
      <main className="min-h-screen bg-background p-4 md:p-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Erreur de connexion</h1>
          <p className="text-gray-500">Impossible de charger les données. Veuillez réessayer.</p>
        </div>
      </main>
    )
  }
}
