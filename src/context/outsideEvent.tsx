import type { WidgetConfig } from "@/types"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"

type OutsideEventType = {
  featureId: string | null
  setFeatureId: Dispatch<SetStateAction<string | null>>
  newFeatureOpen: boolean
  setNewFeatureOpen: Dispatch<SetStateAction<boolean>>
  iframeKey: number
  setReady: (ready: boolean) => void
  ready: boolean
}

const OutsideEventContext = createContext<OutsideEventType | null>(null)

export function OutsideEventProvider({
  config,
  children,
}: {
  children: React.ReactNode
  config: WidgetConfig
}) {
  const [featureId, setFeatureId] = useState<string | null>(null)
  const [newFeatureOpen, setNewFeatureOpen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function handler(event: MessageEvent) {
      if (event.origin !== config.apiUrl) return
      if (!event.data) return

      if (event.data.type === "openfeed:open-feature") {
        setFeatureId(event.data.featureId)
      }
      if (event.data.type === "openfeed:open-new-feature") {
        setNewFeatureOpen(event.data.open)
        setIframeKey((k) => k + 1)
      }
    }

    window.addEventListener("message", handler)

    return () => window.removeEventListener("message", handler)
  }, [config.apiUrl])

  useEffect(() => {
    if (ready && config.prod) {
      navigator.sendBeacon(
        `${config.apiUrl}/api/widget/${config.projectId}/activity`
      )
    }
  }, [config.apiUrl, config.prod, config.projectId, ready])

  return (
    <OutsideEventContext.Provider
      value={{
        featureId,
        setFeatureId,
        newFeatureOpen,
        setNewFeatureOpen,
        iframeKey,
        setReady,
        ready,
      }}
    >
      {children}
    </OutsideEventContext.Provider>
  )
}

export function useOutsideEvent() {
  const ctx = useContext(OutsideEventContext)
  if (!ctx) {
    throw new Error("useOutsideEvent must be used inside OutsideEventProvider")
  }
  return ctx
}
