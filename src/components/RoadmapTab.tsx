
// Mock data
const mockItems = [
  { id: "1", title: "Dark mode", description: "System-wide dark theme", status: "done" as const },
  { id: "2", title: "Export to CSV", description: "Export feedback data", status: "in_progress" as const },
  { id: "3", title: "API rate limiting", description: "Configurable rate limits", status: "planned" as const },
  { id: "4", title: "Mobile widget SDK", description: "React Native support", status: "planned" as const },
  { id: "5", title: "Team roles", description: "Admin and member permissions", status: "in_progress" as const },
]

export function RoadmapTab() {
  const items = mockItems

  const columns = {
    planned: { title: "Planned", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    in_progress: { title: "In Progress", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    done: { title: "Done", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" }
  }

  const grouped = {
    planned: items.filter(i => i.status === "planned"),
    in_progress: items.filter(i => i.status === "in_progress"),
    done: items.filter(i => i.status === "done")
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.entries(grouped).map(([status, list]) => (
        <div key={status}>
          <h3 className={`text-xs font-medium mb-2 px-2 py-1 rounded text-center ${columns[status as keyof typeof columns].color}`}>
            {columns[status as keyof typeof columns].title}
          </h3>
          <div className="space-y-2">
            {list.map(item => (
              <div key={item.id} className="p-2 rounded-md border bg-card hover:shadow-sm transition-shadow">
                <div className="text-sm font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
            {list.length === 0 && (
              <div className="text-xs text-muted-foreground text-center py-2">None</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
