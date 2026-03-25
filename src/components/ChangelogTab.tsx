import { useOutsideEvent } from "@/context/outsideEvent"

export default function ChangelogTab(config: {
  apiUrl: string
  projectId: string
  isDrawer: boolean
  theme: string
}) {
  const { iframeKey, ready, setReady } = useOutsideEvent()
  return (
    <div className="flex h-full w-full">
      <iframe
        key={iframeKey}
        src={`${config.apiUrl}/pub/${config.projectId}/changelog?theme=${config.theme}`}
        className="h-full w-full border-0"
        onLoad={() => !ready && setReady(true)}
      />
    </div>
  )
}
