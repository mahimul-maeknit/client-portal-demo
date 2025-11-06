"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const { toast } = useToast()

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications.",
    })
  }

  const handleProfile = () => {
    toast({
      title: "User Profile",
      description: "Opening profile settings...",
    })
  }

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl text-neutral-900">MAEKNIT</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:text-neutral-700"
            onClick={handleNotifications}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <button
            className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-400 transition-colors"
            onClick={handleProfile}
          >
            <User className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
