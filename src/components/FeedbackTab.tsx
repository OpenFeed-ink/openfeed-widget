import { useOutsideEvent } from "@/context/outsideEvent";
import { NewFeatureDialog } from "./NewFeedback";

export function FeedbackTab(config: { apiUrl: string, projectId: string, isDrower: boolean, theme: string, textColor: string, bgColor: string }) {
  const { iframeKey } = useOutsideEvent()
  return (
    <div className="flex flex-col space-y-3 w-full justify-center items-center">
      <NewFeatureDialog
        color={config.textColor}
        backgroundColor={config.bgColor}
        theme={config.theme}
        widgetConfig={config}
      />
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/features?theme=${config.theme}`}
        className={`w-full ${config.isDrower ? "h-screen" : "h-[55vh]"} border-0`}
        height={"100%"}
      />
    </div>)
}
