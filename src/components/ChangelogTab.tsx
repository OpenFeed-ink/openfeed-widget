import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// Mock data
const mockEntries = [
  {
    id: "1",
    title: "Dark mode is here!",
    content: "<p>We've added dark mode support across the entire dashboard. You can toggle it in your settings.</p>",
    category: "new_feature" as const,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Performance improvements",
    content: "<p>Reduced load times by 40% on the feedback board.</p>",
    category: "improvement" as const,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Fixed vote counting bug",
    content: "<p>Upvotes are now correctly counted across all projects.</p>",
    category: "bug_fix" as const,
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function ChangelogTab() {
  const entries = mockEntries

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "new_feature":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "improvement":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "bug_fix":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-3">
      {entries.map(entry => (
        <div key={entry.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base">{entry.title}</h3>
            <Badge className={getCategoryColor(entry.category)}>
              {entry.category.replace(/_/g, " ")}
            </Badge>
          </div>
          <div
            className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert mb-2"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}
