import { lazy, useEffect, useState, useTransition, Suspense } from "react"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import type { Config, WidgetConfig } from "./types"
import { OutsideEventProvider } from "./context/outsideEvent"

const AnnouncementBanner = lazy(() => import("./components/AnnouncementBanner"))
const FeatureDialog = lazy(() => import("./components/FeatureDialog"))

export const Main = ({
  widgetConfig,
  config,
}: {
  widgetConfig: WidgetConfig
  config?: Config
}) => {
  const [conf, setConf] = useState<Config>()
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const controller = new AbortController()

    startTransition(async () => {
      if (config) {
        setConf(config)
        return
      }

      try {
        const resp = await fetch(
          `${widgetConfig.apiUrl}/api/widget/${widgetConfig.projectId}/config`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!resp.ok) {
          throw new Error(
            `[OpenFeedWidget] Failed to load config: ${resp.status}`
          )
        }

        const configJson = await resp.json()
        setConf(configJson)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      }
    })

    return () => controller.abort()
  }, [config, widgetConfig.apiUrl, widgetConfig.projectId])

  if (pending || !conf) return <div />

  const renderAnnouncement = () => {
    if (!conf?.announcement?.text) return null
    return (
      <AnnouncementBanner
        key={conf.announcement.text}
        announcement={conf.announcement}
      />
    )
  }

  return (
    <OutsideEventProvider config={widgetConfig}>
      <ThemeProvider theme={conf.theme}>
        {renderAnnouncement()}
        <App config={conf} widgetConfig={widgetConfig} />
        <Suspense fallback={null}>
          <FeatureDialog theme={conf.theme} widgetConfig={widgetConfig} />
        </Suspense>
      </ThemeProvider>
    </OutsideEventProvider>
  )
}
