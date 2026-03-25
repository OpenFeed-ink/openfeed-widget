import { useOutsideEvent } from "@/context/outsideEvent"
import { NewFeatureDialog } from "./NewFeedback"

export default function FeedbackTab(config: {
  apiUrl: string
  projectId: string
  isDrawer: boolean
  theme: string
  textColor: string
  bgColor: string
}) {
  const { iframeKey, ready, setReady } = useOutsideEvent()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3">
      <NewFeatureDialog
        color={config.textColor}
        backgroundColor={config.bgColor}
        theme={config.theme}
        widgetConfig={config}
      />
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/features?theme=${config.theme}`}
        className="h-full w-full border-0"
        onLoad={() => !ready && setReady(true)}
      />
    </div>
  )
}
