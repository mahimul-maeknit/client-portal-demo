"use client"

import { Sidebar } from "@/components/sidebar"
import { quotes as initialQuotes } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, RefreshCw, DollarSign, Clock, Star, Leaf } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [quantity, setQuantity] = useState(500)
  const [sortBy, setSortBy] = useState("cheapest")
  const selectedQuote = quotes.find((q) => q.selected)

  const handleSelectQuote = (quoteId: string) => {
    setQuotes(quotes.map((q) => ({ ...q, selected: q.id === quoteId })))
  }

  const handleUpdateQuotes = () => {
    setQuotes(
      quotes.map((q) => ({
        ...q,
        total: q.unitPrice * quantity,
      })),
    )
  }

  const sortedQuotes = [...quotes].sort((a, b) => {
    switch (sortBy) {
      case "cheapest":
        return a.unitPrice - b.unitPrice
      case "fastest":
        return Number.parseInt(a.leadTime) - Number.parseInt(b.leadTime)
      case "rating":
        return b.factory.rating - a.factory.rating
      case "greenest":
        return b.factory.rating - a.factory.rating
      case "bestRoute":
        return Number.parseInt(a.leadTime) - Number.parseInt(b.leadTime)
      default:
        return 0
    }
  })

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-2">
            <Link href="/styles" className="hover:text-neutral-700">
              Style Pipeline
            </Link>
            <span>›</span>
            <Link href="/styles/vc-001" className="hover:text-neutral-700">
              Vintage Crewneck
            </Link>
            <span>›</span>
            <span className="text-neutral-900">Quote Comparison</span>
          </div>
          <h2 className="text-2xl text-neutral-900 mb-2">Quote Comparison</h2>
          <p className="text-neutral-600">Compare quotes from different factories for Vintage Crewneck</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm text-neutral-700">Sort by:</h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={sortBy === "cheapest" ? "default" : "outline"}
                    onClick={() => setSortBy("cheapest")}
                    className={sortBy === "cheapest" ? "bg-neutral-900 text-white" : ""}
                  >
                    Cheapest
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === "fastest" ? "default" : "outline"}
                    onClick={() => setSortBy("fastest")}
                    className={sortBy === "fastest" ? "bg-neutral-900 text-white" : ""}
                  >
                    Fastest
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === "rating" ? "default" : "outline"}
                    onClick={() => setSortBy("rating")}
                    className={sortBy === "rating" ? "bg-neutral-900 text-white" : ""}
                  >
                    Best Rating
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === "bestRoute" ? "default" : "outline"}
                    onClick={() => setSortBy("bestRoute")}
                    className={sortBy === "bestRoute" ? "bg-neutral-900 text-white" : ""}
                  >
                    Best Route
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === "greenest" ? "default" : "outline"}
                    onClick={() => setSortBy("greenest")}
                    className={sortBy === "greenest" ? "bg-neutral-900 text-white" : ""}
                  >
                    Greenest
                  </Button>
                  <Button
                    size="sm"
                    variant={sortBy === "origin" ? "default" : "outline"}
                    onClick={() => setSortBy("origin")}
                    className={sortBy === "origin" ? "bg-neutral-900 text-white" : ""}
                  >
                    Origin
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-neutral-600">Quantity:</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
                <Button onClick={handleUpdateQuotes} className="bg-neutral-900 text-white hover:bg-neutral-800">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Quotes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Comparison Table */}
        <Card className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Factory</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">MOQ</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Lead Time</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs text-neutral-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {sortedQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-neutral-600 rounded flex items-center justify-center text-white text-sm font-medium">
                          {quote.factory.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-neutral-900 font-medium">{quote.factory.name}</p>
                          <p className="text-xs text-neutral-500">{quote.factory.quality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{quote.factory.location}</td>
                    <td className="px-6 py-4 text-neutral-900 font-medium">${quote.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-neutral-600">{quote.moq}</td>
                    <td className="px-6 py-4 text-neutral-600">{quote.leadTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(quote.factory.rating) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-neutral-500">{quote.factory.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-900 font-medium">${quote.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {quote.selected ? (
                        <Button size="sm" className="bg-neutral-900 text-white">
                          Selected
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleSelectQuote(quote.id)}>
                          Select
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Summary and Insights */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Quote Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedQuote ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Factory:</span>
                    <span className="text-neutral-900 font-medium">{selectedQuote.factory.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Quantity:</span>
                    <span className="text-neutral-900 font-medium">{quantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Unit Price:</span>
                    <span className="text-neutral-900 font-medium">${selectedQuote.unitPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Lead Time:</span>
                    <span className="text-neutral-900 font-medium">{selectedQuote.leadTime}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-900 font-medium">Total:</span>
                      <span className="text-lg text-neutral-900 font-bold">
                        ${selectedQuote.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-neutral-500">No quote selected</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparison Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{sortedQuotes[0].factory.name} is cheapest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {
                      quotes.reduce((fastest, q) =>
                        Number.parseInt(q.leadTime) < Number.parseInt(fastest.leadTime) ? q : fastest,
                      ).factory.name
                    }{" "}
                    has fastest delivery
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {quotes.reduce((best, q) => (q.factory.rating > best.factory.rating ? q : best)).factory.name} has
                    highest rating
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{quotes[0].factory.name} is greenest</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link href="/styles/vc-001">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Style Details
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
