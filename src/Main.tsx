import { useEffect, useState, useTransition } from "react"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import type { Config, WidgetConfig } from "./types"
import { FeatureDialog } from "./components/FeatureDialog"

export const Main = ({ widgetConfig, config}: { widgetConfig: WidgetConfig, config?: Config }) => {
  const [featureId, setFeatureId] = useState<string | null>(null)
  const [conf,setConf] = useState<Config>()
  const [pending, startTransition] = useTransition()


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

  useEffect(() => {
    startTransition(async () => {
     if(config){
        setConf(config)
        return;
      } 
      const resp = await fetch(`${widgetConfig.apiUrl}/api/projects/${widgetConfig.projectId}/config`)
      const configJson = await resp.json()
      setConf(configJson)
    })
  }, [])

  if(pending || !conf) return <div/>


  return (
    <ThemeProvider theme={conf.theme} >
      <App config={conf} widgetConfig={widgetConfig} />
      <FeatureDialog
        featureId={featureId}
        theme={conf.theme}
        widgetConfig={widgetConfig}
        onFeature={(id) => setFeatureId(id)}

      />
    </ThemeProvider>
  )
}
