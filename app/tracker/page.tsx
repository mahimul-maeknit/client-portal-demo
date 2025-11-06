import { Sidebar } from "@/components/sidebar"
import { projects, upcomingMilestones, criticalItems } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Circle, AlertCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TrackerPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl text-neutral-900 mb-2">Project Tracker / Timeline</h2>
          <p className="text-neutral-600">Track production stages and timelines for all active projects.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            {/* Projects Timeline */}
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-neutral-900 font-medium">{project.name}</h3>
                        <p className="text-sm text-neutral-500">
                          {project.factoryName} • Order #{project.orderId}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{project.expectedDate}</Badge>
                        <Badge>{project.status}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {project.stages.map((stage, idx) => (
                        <div key={idx} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
                                stage.completed
                                  ? "bg-neutral-900 text-white"
                                  : stage.current
                                    ? "bg-neutral-300 text-neutral-700"
                                    : "bg-neutral-100 text-neutral-400",
                              )}
                            >
                              {stage.completed ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            </div>
                            <span className="text-xs text-neutral-500 mt-1">{stage.name}</span>
                          </div>
                          {idx < project.stages.length - 1 && (
                            <div
                              className={cn("h-0.5 flex-1", stage.completed ? "bg-neutral-900" : "bg-neutral-200")}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            {/* Upcoming Milestones */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="border-l-2 border-neutral-900 pl-4">
                      <p className="text-sm text-neutral-900 font-medium">{milestone.name}</p>
                      <p className="text-xs text-neutral-500">Expected: {milestone.expectedDate}</p>
                      <p className="text-xs text-neutral-600 mt-1">{milestone.daysUntil} days</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Critical Path Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                  Critical Path Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalItems.map((item) => (
                    <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-neutral-900 font-medium">{item.name}</p>
                      <p className="text-xs text-neutral-600">{item.factory}</p>
                      <p className="text-xs text-red-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
