import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useOutsideEvent } from "@/context/outsideEvent"

export function NewFeatureDialog({
  widgetConfig,
  color,
  backgroundColor,
  theme,
}: {
  theme: string
  backgroundColor: string
  color: string
  widgetConfig: { apiUrl: string; projectId: string }
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
          className="w-[90%] cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ask for new Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 md:max-w-md lg:max-w-xl">
        <DialogTitle className="sr-only">Request a new feature</DialogTitle>
        <DialogDescription className="sr-only">
          Submit a feature request to the OpenFeed project board.
        </DialogDescription>
        <iframe
          src={`${widgetConfig.apiUrl}/pub/${widgetConfig.projectId}/features/new?theme=${theme}`}
          className="h-[55vh] w-full border-0"
        />
      </DialogContent>
    </Dialog>
  )
}
