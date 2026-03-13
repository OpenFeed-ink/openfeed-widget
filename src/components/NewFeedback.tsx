import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { WidgetConfig } from "@/types"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useOutsideEvent } from "@/context/outsideEvent"

export function NewFeatureDialog({
  widgetConfig,
  color,
  backgroundColor,
  theme,
}: {
  theme: string,
  backgroundColor: string,
  color: string,
  widgetConfig: WidgetConfig,
}) {
  const { newFeatureOpen, setNewFeatureOpen } = useOutsideEvent()

  return (
    <Dialog open={newFeatureOpen} onOpenChange={setNewFeatureOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          style={{
            backgroundColor,
            color,
          }}
          className="cursor-pointer w-[90%]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ask for new Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 lg:max-w-xl md:max-w-md">
        <iframe
          src={`${widgetConfig.apiUrl}/pub/${widgetConfig.projectId}/features/new?theme=${theme}`}
          className="w-full h-[55vh] border-0"
        />
      </DialogContent>
    </Dialog>
  )
}
