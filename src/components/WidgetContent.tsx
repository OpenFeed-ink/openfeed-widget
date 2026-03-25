import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Config, WidgetConfig } from "../types"
import { lazy, Suspense, useMemo } from "react"
const FeedbackTab = lazy(() => import("./FeedbackTab"))
const ChangelogTab = lazy(() => import("./ChangelogTab"))
const RoadmapTab = lazy(() => import("./RoadmapTab"))

interface WidgetContentProps {
  config: Config
  widgetConfig: WidgetConfig
  isDrawer: boolean
}

export default function WidgetContent({
  config,
  widgetConfig,
  isDrawer,
}: WidgetContentProps) {
  const tabs = useMemo(() => {
    const tabs = []
    if (config.showFeedback) {
      tabs.push("feedback")
    }
    if (config.showRoadmap) {
      tabs.push("roadmap")
    }
    if (config.showChangeLog) {
      tabs.push("changelog")
    }
    return tabs
  }, [config])

  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }

  return (
    <Tabs defaultValue={tabs[0]} className="flex h-full flex-col">
      <TabsList className={`grid w-full ${gridCols[tabs.length]}`}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={`trigger-${tab}`}
            value={tab}
            className="capitalize"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={`content-${tab}`}
          value={tab}
          className="min-h-0 flex-1"
        >
          <Suspense fallback={null}>
            {tab === "feedback" && (
              <FeedbackTab
                textColor={config.triggerBtn.textColor}
                bgColor={config.triggerBtn.color}
                projectId={widgetConfig.projectId}
                apiUrl={widgetConfig.apiUrl}
                isDrawer={isDrawer}
                theme={config.theme}
              />
            )}
            {tab === "changelog" && (
              <ChangelogTab
                apiUrl={widgetConfig.apiUrl}
                projectId={widgetConfig.projectId}
                theme={config.theme}
                isDrawer={isDrawer}
              />
            )}
            {tab === "roadmap" && (
              <RoadmapTab
                apiUrl={widgetConfig.apiUrl}
                projectId={widgetConfig.projectId}
                theme={config.theme}
                isDrawer={isDrawer}
              />
            )}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}
