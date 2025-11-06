"use client"

import { Sidebar } from "@/components/sidebar"
import { styles, factories } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, MessageSquare, Star, Factory } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function StyleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const style = styles.find((s) => s.id === id)

  const [activeTab, setActiveTab] = useState("Overview")
  const { toast } = useToast()
  const router = useRouter()

  if (!style) {
    return <div>Style not found</div>
  }

  const recommendedFactories = factories.slice(0, 4)

  const handleRequestQuote = () => {
    router.push("/quotes")
  }

  const handleAddToOrders = () => {
    toast({
      title: "Added to Orders",
      description: `${style.name} has been added to your orders.`,
    })
  }

  const handleRequestColors = () => {
    toast({
      title: "Color Request Submitted",
      description: "We'll contact you about additional colorway options.",
    })
  }

  const handleRequestSizes = () => {
    toast({
      title: "Size Request Submitted",
      description: "We'll contact you about additional size options.",
    })
  }

  const tabs = ["Overview", "Tech Pack", "Materials", "Factories", "Sizes & Colorways", "Timeline"]

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/styles">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h2 className="text-xl text-neutral-900">{style.name}</h2>
                <p className="text-sm text-neutral-500">Style Code: {style.code}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-neutral-900 text-white hover:bg-neutral-800" onClick={handleRequestQuote}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Quote
              </Button>
              <Button variant="outline" onClick={handleAddToOrders}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Orders
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-neutral-200">
          <div className="px-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 border-b-2 text-sm ${
                    activeTab === tab
                      ? "border-neutral-900 text-neutral-900"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              {/* Style Overview */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Style Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-neutral-500">Category</label>
                        <p className="text-neutral-900">{style.category}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Season</label>
                        <p className="text-neutral-900">{style.season}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Target Market</label>
                        <p className="text-neutral-900">{style.targetMarket}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Composition</label>
                        <p className="text-neutral-900">{style.composition}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-neutral-500">Weight</label>
                        <p className="text-neutral-900">{style.weight}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Fit</label>
                        <p className="text-neutral-900">{style.fit}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Care Instructions</label>
                        <p className="text-neutral-900">{style.careInstructions}</p>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Development Status</label>
                        <Badge variant="secondary">{style.status}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Factories */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Factories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedFactories.map((factory) => (
                      <div key={factory.id} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-neutral-300 rounded flex items-center justify-center">
                              <Factory className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div>
                              <h4 className="text-sm text-neutral-900 font-medium">{factory.name}</h4>
                              <p className="text-xs text-neutral-500">{factory.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-xs text-neutral-500">{factory.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-neutral-500">MOQ:</span>
                            <p className="text-neutral-900">
                              {factory.moq} piece{factory.moq > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500">Lead Time:</span>
                            <p className="text-neutral-900">{factory.leadTime}</p>
                          </div>
                          <div>
                            <span className="text-neutral-500">Specialty:</span>
                            <p className="text-neutral-900">{factory.specialty}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4">
              {/* Style Image */}
              <Card className="mb-6">
              <CardContent className="p-6">
                {/* Main Style Image */}
                <div className="w-full h-128 overflow-hidden rounded-lg mb-4 bg-neutral-200">
                  <img
                    src={style.image || "/assets/1.png"}  // fallback if missing
                    alt={style.name}
                    className="w-full h-full object-cover"
                  />
                </div>

              </CardContent>
            </Card>

              {/* Available Colorways */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Available Colorways</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="w-12 h-12 bg-neutral-800 rounded border-2 border-neutral-300" />
                    <div className="w-12 h-12 bg-neutral-600 rounded" />
                    <div className="w-12 h-12 bg-neutral-400 rounded" />
                    <div className="w-12 h-12 bg-white border border-neutral-300 rounded" />
                  </div>
                  <Button variant="link" className="text-sm p-0" onClick={handleRequestColors}>
                    + Request More Colors
                  </Button>
                </CardContent>
              </Card>

              {/* Available Sizes */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Available Sizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="link" className="text-sm p-0" onClick={handleRequestSizes}>
                    + Request More Sizes
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
