import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackTab } from "./FeedbackTab"
import { ChangelogTab } from "./ChangelogTab"
import { RoadmapTab } from "./RoadmapTab"
import type { Config, WidgetConfig } from "../types"

interface WidgetContentProps {
  config: Config
  widgetConfig: WidgetConfig
}

export function WidgetContent({ config, widgetConfig }: WidgetContentProps) {
  return (
    <Tabs defaultValue="feedback" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {config.showFeedback && (
          <TabsTrigger value="feedback">
            Feedback
          </TabsTrigger>
        )}
        {config.showChangeLog && (
          <TabsTrigger value="changelog">
            Changelog
          </TabsTrigger>
        )}
        {config.showRoadmap && (
          <TabsTrigger value="roadmap">
            Roadmap
          </TabsTrigger>
        )}
      </TabsList>
      {config.showFeedback && (
        <TabsContent value="feedback">
          <FeedbackTab projectId={widgetConfig.projectId} apiUrl={widgetConfig.apiUrl} />
        </TabsContent>
      )}
      {config.showChangeLog && (
        <TabsContent value="changelog">
          <ChangelogTab />
        </TabsContent>
      )}
      {config.showRoadmap && (
        <TabsContent value="roadmap">
          <RoadmapTab />
        </TabsContent>
      )}
    </Tabs>
  )
}
