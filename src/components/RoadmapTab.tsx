import { useOutsideEvent } from "@/context/outsideEvent"

export default function RoadmapTab(config: { apiUrl: string, projectId: string, isDrower: boolean, theme: string }) {
  const { iframeKey, ready, setReady } = useOutsideEvent()
  return (
    <div className="w-full h-full flex">
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/roadmap?theme=${config.theme}`}
        className="w-full h-full border-0"
        onLoad={() => !ready && setReady(true)}
      />
    </div>)
}
