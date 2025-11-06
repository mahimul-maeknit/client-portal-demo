export interface Factory {
  id: string
  name: string
  location: string
  country: string
  rating: number
  moq: number
  leadTime: string
  specialty: string
  quality: "Premium Quality" | "Standard Quality" | "Economy Quality"
}

export interface Style {
  id: string
  name: string
  code: string
  category: string
  season: string
  targetMarket: string
  composition: string
  weight: string
  fit: string
  careInstructions: string
  status: string
  progress: number
  stage: string
  eta: string
  colorways: number
  sizes: number
  image?: string
}

export interface Order {
  id: string
  orderId: string
  styleId: string
  styleName: string
  factoryId: string
  factoryName: string
  totalUnits: number
  totalValue: number
  status: string
  moq: number
  items: OrderItem[]
}

export interface OrderItem {
  color: string
  size: string
  units: number
  pricePerUnit: number
  total: number
}

export interface Quote {
  id: string
  factoryId: string
  factory: Factory
  unitPrice: number
  moq: number
  leadTime: string
  total: number
  selected?: boolean
}

export interface Project {
  id: string
  name: string
  orderId: string
  factoryName: string
  stages: ProjectStage[]
  expectedDate: string
  status: string
}

export interface ProjectStage {
  name: string
  completed: boolean
  current?: boolean
}

export interface Milestone {
  id: string
  name: string
  expectedDate: string
  daysUntil: number
}

export interface CriticalItem {
  id: string
  name: string
  factory: string
  description: string
}

export interface DashboardMetrics {
  toSend: number
  quotesPending: number
  ordersInProgress: number
  shipments: number
}
