"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Layers, ShoppingCart, GanttChart } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Style Pipeline", href: "/styles", icon: Layers },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Project Tracker", href: "/tracker", icon: GanttChart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-neutral-50 border-r border-neutral-200 h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                isActive ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
