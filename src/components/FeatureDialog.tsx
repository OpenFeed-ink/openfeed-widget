import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { useOutsideEvent } from "@/context/outsideEvent"
import type { WidgetConfig } from "@/types"

export default function FeatureDialog({
  widgetConfig,
  theme,
}: {
  theme: string
  widgetConfig: WidgetConfig
}) {
  const { featureId, setFeatureId } = useOutsideEvent()

  return (
    <Dialog
      open={!!featureId}
      onOpenChange={(open) => !open && setFeatureId(null)}
    >
      <DialogContent className="max-w-full p-0 md:max-w-xl lg:max-w-3xl">
        <DialogTitle className="sr-only">Feature details</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed feature information from OpenFeed.
        </DialogDescription>
        <iframe
          src={`${widgetConfig.apiUrl}/pub/${widgetConfig.projectId}/features/${featureId}?theme=${theme}`}
          className="h-[73vh] w-full border-0"
        />
      </DialogContent>
    </Dialog>
  )
}
