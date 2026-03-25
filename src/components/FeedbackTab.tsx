import { useOutsideEvent } from "@/context/outsideEvent";
import { NewFeatureDialog } from "./NewFeedback";

export default function FeedbackTab(config: { apiUrl: string, projectId: string, isDrower: boolean, theme: string, textColor: string, bgColor: string }) {
  const { iframeKey, ready, setReady } = useOutsideEvent()
  return (
    <div className="h-full w-full flex flex-col space-y-3 justify-center items-center">
      <NewFeatureDialog
        color={config.textColor}
        backgroundColor={config.bgColor}
        theme={config.theme}
        widgetConfig={config}
      />
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/features?theme=${config.theme}`}
        className="w-full h-full border-0"
        onLoad={() => !ready && setReady(true)}
      />
    </div>)
}
