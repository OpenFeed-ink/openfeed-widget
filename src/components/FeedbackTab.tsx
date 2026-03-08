import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "./ui/card"

// Mock data
const mockFeatures = [
  {
    id: "1",
    title: "Add dark mode support",
    description: "Many users have requested dark mode for the dashboard. It would be great to have this feature.",
    status: "under_review",
    upvotesCount: 24,
    commentsCount: 7,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Export feedback to CSV",
    description: "Need ability to export all feedback data for analysis in external tools.",
    status: "planned",
    upvotesCount: 18,
    commentsCount: 3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "API rate limiting configuration",
    description: "Allow admins to set custom rate limits per API key.",
    status: "in_progress",
    upvotesCount: 12,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "API rate limiting configuration",
    description: "Allow admins to set custom rate limits per API key.",
    status: "in_progress",
    upvotesCount: 12,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "API rate limiting configuration",
    description: "Allow admins to set custom rate limits per API key.",
    status: "in_progress",
    upvotesCount: 12,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "API rate limiting configuration",
    description: "Allow admins to set custom rate limits per API key.",
    status: "in_progress",
    upvotesCount: 12,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    title: "API rate limiting configuration",
    description: "Allow admins to set custom rate limits per API key.",
    status: "in_progress",
    upvotesCount: 12,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function FeedbackTab() {
  const [features, setFeatures] = useState(mockFeatures)
  const [voting, setVoting] = useState<string | null>(null)

  const handleUpvote = (featureId: string) => {
    if (voting) return
    setVoting(featureId)
    setTimeout(() => {
      setFeatures(prev =>
        prev.map(f =>
          f.id === featureId ? { ...f, upvotesCount: f.upvotesCount + 1 } : f
        )
      )
      setVoting(null)
    }, 300)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under_review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "planned": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "in_progress": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "done": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default: return ""
    }
  }

  return (
    <div className="space-y-3">
      {features.map(feature => (
        <Card
          key={feature.id}
        >
          <CardContent className="flex gap-2">
            {/* Voting column */}
            <div className="flex flex-col items-center justify-center cursor-pointer bg-muted/25"
              onClick={() => handleUpvote(feature.id)}
            >
              <ArrowUp className={`h-5 w-5 ${voting === feature.id ? "animate-bounce" : ""}`} />
              <span className="text-sm font-semibold mt-1">{feature.upvotesCount}</span>
            </div>

            {/* Content column */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base">{feature.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {feature.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <Badge variant="outline" className={getStatusColor(feature.status)}>
                  {feature.status.replace(/_/g, " ")}
                </Badge>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {feature.commentsCount}
                </span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(feature.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
