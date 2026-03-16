import { useOutsideEvent } from "@/context/outsideEvent"

export function ChangelogTab(config: { apiUrl: string, projectId: string, isDrower: boolean, theme: string }) {
  const { iframeKey } = useOutsideEvent()
  return (
    <div className="w-full h-full flex">
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/changelog?theme=${config.theme}`}
        className="w-full h-full border-0"
      />
    </div>)
}
