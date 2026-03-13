import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { WidgetConfig } from "@/types"

export function FeatureDialog({
  featureId,
  widgetConfig,
  theme,
  onFeature
}: {
  featureId: string | null,
  theme: string,
  widgetConfig: WidgetConfig,
  onFeature: (featureId: string | null) => void
}) {
  return (
    <Dialog open={!!featureId} onOpenChange={(open) => !open && onFeature(null)}>
      <DialogContent className="p-0 lg:max-w-4xl md:max-w-2xl max-w-full">
        <div className="-mx-4 max-h-[60vh] overflow-y-auto px-4">
          <iframe
            src={`${widgetConfig.apiUrl}/pub/${widgetConfig.projectId}/features/${featureId}?theme=${theme}`}

            className="w-full h-[95vh] border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
