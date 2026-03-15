import { useOutsideEvent } from "@/context/outsideEvent"

export function RoadmapTab(config: { apiUrl: string, projectId: string, isDrower: boolean, theme: string }) {
  const { iframeKey } = useOutsideEvent()
  return (
    <div className="flex flex-col space-y-3 w-full justify-center items-center">
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/roadmap?theme=${config.theme}`}
        className={`w-full ${config.isDrower ? "h-screen" : "h-[55vh]"} border-0`}
        height={"100%"}
      />
    </div>)
}
