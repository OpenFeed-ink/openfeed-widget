import { useEffect, useState } from "react"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import type { Config, WidgetConfig } from "./types"
import { FeatureDialog } from "./components/FeatureDialog"
// Mock config
const mockConfig: Config = {
  theme: "dark",
  projectName: "My Awesome Project",
  info: "Share your feedback and ideas",
  triggerBtn: {
    position: "drawer-right",
    color: "#14b8a6",
    textColor: "#ffffff",
    variant: "default",
    size: "lg",
    text: "Feedback",
    icon: "message-square",
  },
  showFeedback: true,
  showChangeLog: true,
  showRoadmap: true,
  showAnnouncement: false,
}

export const Main = ({ widgetConfig }: { widgetConfig: WidgetConfig }) => {
  const [featureId, setFeatureId] = useState<string | null>(null)
  useEffect(() => {
    function handler(event: MessageEvent) {
      if (!event.data) return

      if (event.data.type === "openfeed:open-feature") {
        setFeatureId(event.data.featureId)
      }
    }

    window.addEventListener("message", handler)

    return () => window.removeEventListener("message", handler)
  }, [])


  return (
    <ThemeProvider theme={mockConfig.theme} >
      <App config={mockConfig} widgetConfig={widgetConfig} />
      <FeatureDialog
        featureId={featureId}
        widgetConfig={widgetConfig}
        onFeature={(id) => setFeatureId(id)}

      />
    </ThemeProvider>
  )
}
