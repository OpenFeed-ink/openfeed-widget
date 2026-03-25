import { useState } from "react"
import { X, Megaphone } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import type { AnnouncementConfig } from "@/types"

export default function AnnouncementBanner({
  announcement,
}: {
  announcement: AnnouncementConfig
}) {
  const [visible, setVisible] = useState(true)
  const { position, text, link, dismiss, bgcolor, textcolor } = announcement

  const handleDismiss = () => {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed right-0 left-0 z-40 animate-in duration-300 fade-in",
        position === "top" ? "top-0" : "bottom-0"
      )}
      style={{ backgroundColor: bgcolor, color: textcolor }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-inherit backdrop-blur-sm">
          <div className="flex flex-1 items-center gap-3 px-4 py-2">
            <Megaphone className="h-5 w-5 shrink-0 opacity-80" />
            <span className="text-sm font-medium md:text-base">{text}</span>
          </div>

          <div className="flex items-center gap-2 pr-2">
            {link && (
              <Button
                variant="link"
                size="sm"
                className="h-8 text-xs md:text-sm"
                asChild
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  {announcement.actionBtn || "Learn more"}
                </a>
              </Button>
            )}
            {dismiss && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8 rounded-full"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
