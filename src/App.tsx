import { Button } from "@/components/ui/button"
import type { WidgetConfig } from "./types"

export default function App({ config }: { config: WidgetConfig }) {
  return (
    <div className="fixed bottom-6 right-6">
      <p>project: {config.projectId}</p>
      <p>url: {config.apiUrl}</p>
      <Button>
        open: {config.projectId}
      </Button>
    </div>
  )
}
