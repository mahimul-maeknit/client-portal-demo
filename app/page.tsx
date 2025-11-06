"use client"

import { Sidebar } from "@/components/sidebar"
import { dashboardMetrics, styles, orders, factories } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaneTakeoff, FileText, Settings, Truck, Plus, Eye, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { toast } = useToast()
  const router = useRouter()

  const recentOrders = orders.slice(0, 3)
  const topFactories = factories.slice(0, 3)
  const activeStyles = styles.slice(0, 5)

  const handleCreateOrder = () => {
    toast({
      title: "Create Production Order",
      description: "Opening order creation form...",
    })
    // In a real app, this would open a dialog or navigate to a form
  }

  const handleViewPipeline = () => {
    router.push("/styles")
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl text-neutral-900 mb-2">Dashboard</h2>
          <p className="text-neutral-600">Welcome back! Here&apos;s an overview of your projects and orders.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">To Send</h3>
                <PlaneTakeoff className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{dashboardMetrics.toSend}</p>
              <p className="text-sm text-neutral-600">Ready for shipment</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Quotes Pending</h3>
                <FileText className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{dashboardMetrics.quotesPending}</p>
              <p className="text-sm text-neutral-600">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Orders in Progress</h3>
                <Settings className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{dashboardMetrics.ordersInProgress}</p>
              <p className="text-sm text-neutral-600">On schedule</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-neutral-500">Shipments</h3>
                <Truck className="w-5 h-5 text-neutral-400" />
              </div>
              <p className="text-3xl text-neutral-900">{dashboardMetrics.shipments}</p>
              <p className="text-sm text-neutral-600">In transit</p>
            </CardContent>
          </Card>
        </div>

        {/* Style Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Style Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeStyles.map((style) => (
                <div
                  key={style.id}
                  className="flex items-center justify-between p-3 border border-neutral-100 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-neutral-400 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{style.code.split("-")[0]}</span>
                    </div>
                    <div>
                      <p className="text-neutral-900 text-sm font-medium">{style.name}</p>
                      <p className="text-neutral-500 text-xs">Style #{style.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32">
                      <Progress value={style.progress} className="h-2" />
                    </div>
                    <span className="text-xs text-neutral-500 w-24">{style.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button className="bg-neutral-900 text-white hover:bg-neutral-800" onClick={handleCreateOrder}>
                <Plus className="w-4 h-4 mr-2" />
                Create Production Order
              </Button>
              <Button variant="outline" onClick={handleViewPipeline}>
                <Eye className="w-4 h-4 mr-2" />
                View Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-900">
                        {order.styleName} - {order.factoryName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Order #{order.orderId} • {order.totalUnits} units
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-800 text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Factory Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topFactories.map((factory) => (
                  <div key={factory.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-900">{factory.name}</p>
                      <p className="text-sm text-neutral-500">{factory.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(factory.rating) ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500">{factory.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
