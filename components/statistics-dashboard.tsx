"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, BarChart3 } from "lucide-react"

interface RequestItem {
    category: string
    size: string
}

interface Request {
    id: string
    employeeName: string
    service: string
    items: RequestItem[]
    reason: string
    status: string
    createdAt: string
}

export default function StatisticsDashboard({
    requests,
    showHeader = true
}: {
    requests: Request[],
    showHeader?: boolean
}) {

    const downloadCSV = (content: string, filename: string) => {
        const blob = new Blob(["\uFEFF" + content], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={`max-w-6xl mx-auto px-4 space-y-6 ${showHeader ? 'py-10' : 'pt-2 pb-10'}`}>
            {showHeader && (
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Statistiques de Consommation</h1>
                        <p className="text-gray-500">Analyse des distributions d'EPI par service et collaborateur</p>
                    </div>
                    <Badge className="bg-brand text-white px-4 py-1 text-sm"><BarChart3 className="w-4 h-4 mr-2" /> ANALYTICS</Badge>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Consommation par Service</CardTitle>
                            <CardDescription>Nombre d'EPI validés par département.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(Object.entries(
                                requests.filter(r => r.status === "Ordered").reduce((acc: Record<string, number>, r: Request) => {
                                    r.items.forEach(() => {
                                        acc[r.service] = (acc[r.service] || 0) + 1
                                    })
                                    return acc
                                }, {})
                            ) as [string, number][]).map(([service, count]) => (
                                <div key={service} className="flex items-center gap-4">
                                    <div className="w-24 text-sm font-bold truncate">{service}</div>
                                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                        <div
                                            className="bg-brand h-full"
                                            style={{ width: `${(count / requests.filter(r => r.status === "Ordered").reduce((acc, r) => acc + r.items.length, 0)) * 100}%` }}
                                        />
                                    </div>
                                    <div className="w-8 text-right text-sm font-black">{count}</div>
                                </div>
                            ))}
                            {requests.filter(r => r.status === "Ordered").length === 0 && (
                                <div className="text-center py-10 text-gray-400">Aucune donnée de consommation.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Top Consommateurs</CardTitle>
                            <CardDescription>Collaborateurs ayant reçu le plus d'EPI.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(Object.entries(
                                requests.filter(r => r.status === "Ordered").reduce((acc: Record<string, number>, r: Request) => {
                                    r.items.forEach(() => {
                                        acc[r.employeeName] = (acc[r.employeeName] || 0) + 1
                                    })
                                    return acc
                                }, {})
                            ) as [string, number][])
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5)
                                .map(([name, count]: [string, number]) => (
                                    <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                                                {name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="font-bold text-sm text-gray-700">{name}</div>
                                        </div>
                                        <Badge className="bg-brand text-white">{count} EPI</Badge>
                                    </div>
                                ))}
                            {requests.filter(r => r.status === "Ordered").length === 0 && (
                                <div className="text-center py-10 text-gray-400">Aucune donnée de consommation.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle>Détail de la Consommation</CardTitle>
                        <CardDescription>Liste complète des attributions d'EPI.</CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-brand border-brand/20 hover:bg-brand/5"
                        onClick={() => {
                            const consumed = requests.filter(r => r.status === "Ordered")
                            const headers = ["Date", "Collaborateur", "Service", "Equipement", "Taille"]
                            const rows: string[][] = []
                            consumed.forEach(r => {
                                r.items.forEach(item => {
                                    rows.push([
                                        new Date(r.createdAt).toLocaleDateString("fr-FR"),
                                        r.employeeName,
                                        r.service,
                                        item.category,
                                        item.size
                                    ])
                                })
                            })
                            const csvContent = [headers.join(";"), ...rows.map(row => row.join(";"))].join("\n")
                            downloadCSV(csvContent, `consommation_epi_${new Date().toISOString().split('T')[0]}.csv`)
                        }}
                        disabled={requests.filter(r => r.status === "Ordered").length === 0}
                    >
                        <Download className="w-4 h-4 mr-2" /> Exporter Rapport
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Équipement</TableHead>
                                <TableHead className="text-right">Total Validé</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                (Object.entries(
                                    requests.filter(r => r.status === "Ordered").reduce((acc: Record<string, number>, r: Request) => {
                                        r.items.forEach(item => {
                                            const key = `${r.service} - ${item.category}`
                                            acc[key] = (acc[key] || 0) + 1
                                        })
                                        return acc
                                    }, {})
                                ) as [string, number][]).map(([key, count]) => {
                                    const [service, category] = key.split(" - ")
                                    return (
                                        <TableRow key={key}>
                                            <TableCell className="font-bold text-xs uppercase text-gray-400">{service}</TableCell>
                                            <TableCell className="font-medium">{category}</TableCell>
                                            <TableCell className="text-right"><Badge variant="outline">{count}</Badge></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
