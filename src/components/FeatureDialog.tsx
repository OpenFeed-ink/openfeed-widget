import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useOutsideEvent } from "@/context/outsideEvent"
import type { WidgetConfig } from "@/types"

export default function FeatureDialog({
  widgetConfig,
  theme,
}: {
  theme: string,
  widgetConfig: WidgetConfig,
}) {
  const { featureId, setFeatureId } = useOutsideEvent()

  return (
    <Dialog open={!!featureId} onOpenChange={(open) => !open && setFeatureId(null)}>
      <DialogContent className="p-0 lg:max-w-3xl md:max-w-xl max-w-full">
        <iframe
          src={`${widgetConfig.apiUrl}/pub/${widgetConfig.projectId}/features/${featureId}?theme=${theme}`}
          className="w-full h-[73vh] border-0"
        />
      </DialogContent>
    </Dialog>
  )
}
