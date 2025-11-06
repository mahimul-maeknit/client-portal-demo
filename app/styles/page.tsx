"use client"

import { Sidebar } from "@/components/sidebar"
import { styles } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid3x3, List } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function StylesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("All Stages")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredStyles = styles.filter((style) => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = stageFilter === "All Stages" || style.stage === stageFilter
    const matchesCategory = categoryFilter === "All Categories" || style.category === categoryFilter
    return matchesSearch && matchesStage && matchesCategory
  })

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl text-neutral-900 mb-2">Style Pipeline</h2>
          <p className="text-neutral-600">Browse and manage your available styles for production.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search styles..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <option>All Stages</option>
                  <option>Materials</option>
                  <option>In Production</option>
                  <option>Quality Control</option>
                  <option>Finishing</option>
                  <option>On the Way!</option>
                </select>
                <select
                  className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Knitwear</option>
                  <option>Accessories</option>
                  <option>Outerwear</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Styles Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {filteredStyles.map((style) => (
            <Link key={style.id} href={`/styles/${style.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-neutral-300 flex items-center justify-center">
                  <span className="text-white text-sm">Style Image</span>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-neutral-900 font-medium">{style.name}</h3>
                    <span className="text-xs text-neutral-500">
                      {style.code.split("-")[0]}-{style.code.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded-full">Request Production</span>
                    <span className="text-sm text-neutral-500">ETA: {style.eta}</span>
                  </div>
                  <Progress value={style.progress} className="h-2 mb-3" />
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{style.colorways} Colorways</span>
                    <span>{style.sizes} Sizes</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing 1-{filteredStyles.length} of {filteredStyles.length} styles
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button size="sm" className="bg-neutral-900 text-white" onClick={() => setCurrentPage(1)}>
              1
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(2)}>
              2
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(3)}>
              3
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
