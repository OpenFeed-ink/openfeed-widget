import { useEffect, useState, useTransition } from "react"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import type { Config, WidgetConfig } from "./types"
import { FeatureDialog } from "./components/FeatureDialog"
import { OutsideEventProvider } from "./context/outsideEvent"
import { AnnouncementBanner } from "./components/AnnouncementBanner"

export const Main = ({ widgetConfig, config }: { widgetConfig: WidgetConfig, config?: Config }) => {
  const [conf, setConf] = useState<Config>()
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      if (config) {
        setConf(config)
        return;
      }
      const resp = await fetch(`${widgetConfig.apiUrl}/api/projects/${widgetConfig.projectId}/config`)
      const configJson = await resp.json()
      setConf(configJson)
    })
  }, [])

  if (pending || !conf) return <div />

  const renderAnnouncement = () => {
    if (!conf?.announcement?.text) return null;
    return (
      <AnnouncementBanner
        key={conf.announcement.text}
        announcement={conf.announcement}
      />
    );
  };

  return (
    <OutsideEventProvider>
      <ThemeProvider theme={conf.theme} >
        {renderAnnouncement()}
        <App config={conf} widgetConfig={widgetConfig} />
        <FeatureDialog
          theme={conf.theme}
          widgetConfig={widgetConfig}
        />
      </ThemeProvider>
    </OutsideEventProvider>

  )
}
