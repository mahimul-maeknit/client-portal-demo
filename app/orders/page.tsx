"use client"

import { Sidebar } from "@/components/sidebar"
import { orders } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, DollarSign, Clock, Scale, Factory, Edit, Download, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const { toast } = useToast()
  const router = useRouter()

  const totalOrders = 24
  const totalValue = 847000
  const pendingApproval = 7

  const handleEditOrder = (orderId: string) => {
    toast({
      title: "Edit Order",
      description: `Opening editor for order #${orderId}...`,
    })
  }

  const handleExportPDF = (orderId: string) => {
    toast({
      title: "Exporting PDF",
      description: `Generating PDF for order #${orderId}...`,
    })
  }

  const handleGetQuotes = (styleId: string) => {
    router.push("/quotes")
  }

  const handleCompareQuotes = () => {
    router.push("/quotes")
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-neutral-900 mb-2">Orders</h2>
              <p className="text-neutral-600">Manage your purchase orders by factory and track progress.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleCompareQuotes}>
                <Scale className="w-4 h-4 mr-2" />
                Compare Quotes
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Total Orders</h3>
                <FileText className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{totalOrders}</p>
              <p className="text-sm text-neutral-600">Across 6 factories</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Total Value</h3>
                <DollarSign className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">${(totalValue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-neutral-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Pending Approval</h3>
                <Clock className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{pendingApproval}</p>
              <p className="text-sm text-neutral-600">Awaiting confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* Factory Orders */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="border-b border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neutral-600 rounded-lg flex items-center justify-center">
                      <Factory className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-neutral-900">{order.factoryName}</h3>
                      <p className="text-sm text-neutral-500">
                        {order.styleName} • ${order.totalValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">MOQ: {order.moq} units</Badge>
                    <Badge variant="secondary">{order.status}</Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-neutral-300 rounded-lg" />
                  <div>
                    <h4 className="text-xl text-neutral-900">{order.styleName}</h4>
                    <p className="text-sm text-neutral-500">
                      Style #{order.styleId.toUpperCase()} • Total: {order.totalUnits} units
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border border-neutral-200 rounded-lg p-4"
                    >
                      <div>
                        <p className="text-neutral-900">
                          {item.color} • Size {item.size}
                        </p>
                        <p className="text-sm text-neutral-500">{item.units} units</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neutral-900">${item.total.toLocaleString()}</p>
                        <p className="text-sm text-neutral-500">${item.pricePerUnit.toFixed(2)} per unit</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-200">
                  <div className="flex space-x-3">
                    <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order.id)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Order
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleExportPDF(order.id)}>
                      <Download className="w-4 h-4 mr-1" />
                      Export PDF
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg text-neutral-900">Total: ${order.totalValue.toLocaleString()}</p>
                    </div>
                    <Button
                      className="bg-neutral-900 text-white hover:bg-neutral-800"
                      onClick={() => handleGetQuotes(order.styleId)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Get Quotes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
