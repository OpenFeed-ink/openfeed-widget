import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Config, WidgetConfig } from "../types"
import { lazy, Suspense, useMemo } from "react"
const FeedbackTab = lazy(() => import("./FeedbackTab"))
const ChangelogTab = lazy(() => import("./ChangelogTab"))
const RoadmapTab = lazy(() => import("./RoadmapTab"))

interface WidgetContentProps {
  config: Config
  widgetConfig: WidgetConfig
  isDrawer: boolean,
}

export default function WidgetContent({ config, widgetConfig, isDrawer }: WidgetContentProps) {

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
  };

  return (
    <Tabs defaultValue={tabs[0]} className="flex flex-col h-full">
      <TabsList className={`grid w-full ${gridCols[tabs.length]}`}>
        {tabs.map(tab => (<TabsTrigger value={tab} className="capitalize">
          {tab}
        </TabsTrigger>))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent value={tab} className="flex-1 min-h-0">
          <Suspense fallback={null}>
            {tab === "feedback" && <FeedbackTab textColor={config.triggerBtn.textColor} bgColor={config.triggerBtn.color} projectId={widgetConfig.projectId} apiUrl={widgetConfig.apiUrl} isDrower={isDrawer} theme={config.theme} />}
            {tab === "changelog" && <ChangelogTab apiUrl={widgetConfig.apiUrl} projectId={widgetConfig.projectId} theme={config.theme} isDrower={isDrawer} />}
            {tab === "roadmap" && <RoadmapTab apiUrl={widgetConfig.apiUrl} projectId={widgetConfig.projectId} theme={config.theme} isDrower={isDrawer} />}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}
