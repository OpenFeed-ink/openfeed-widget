import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackTab } from "./FeedbackTab"
import { ChangelogTab } from "./ChangelogTab"
import { RoadmapTab } from "./RoadmapTab"
import type { Config, WidgetConfig } from "../types"
import { useMemo } from "react"

interface WidgetContentProps {
  config: Config
  widgetConfig: WidgetConfig
  isDrawer: boolean,
}

export function WidgetContent({ config, widgetConfig, isDrawer }: WidgetContentProps) {

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
        <TabsContent value={tab} className="flex-1 overflow-hidden">
          {tab === "feedback" && <FeedbackTab textColor={config.triggerBtn.textColor} bgColor={config.triggerBtn.color} projectId={widgetConfig.projectId} apiUrl={widgetConfig.apiUrl} isDrower={isDrawer} theme={config.theme} />}
          {tab === "changelog" && <ChangelogTab />}
          {tab === "roadmap" && <RoadmapTab />}
        </TabsContent>
      ))}
    </Tabs>
  )
}
