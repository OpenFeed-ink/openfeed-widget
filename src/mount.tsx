/**
 * OpenFeed Widget — CSP requirements:
 *   script-src:  https://cdn.openfeed.ai
 *   connect-src: https://api.openfeed.ai
 */
import { createRoot } from "react-dom/client"
import { Component, type ReactNode } from "react"
import styles from "./index.css?inline"
import type { WidgetConfig } from "./types"
import { ShadowRootProvider } from "./context/shadow-root"
import { Main } from "./Main"

const DEFAULT_API_URL = "https://api.openfeed.ink"

interface RawConfig {
  projectId?: string
  apiUrl?: string,
  prod?: string
}

class WidgetErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error) {
    console.error("[OpenFeedWidget] Error caught, unmounting cleanly.", error)
  }
  render() {
    return this.state.error ? null : this.props.children
  }
}

function sanitizeConfig(raw: RawConfig): WidgetConfig {
  if (!raw.projectId || raw.projectId.trim() === "") {
    throw new Error("[OpenFeedWidget] data-project-id is required.")
  }
  return {
    projectId: raw.projectId.trim(),
    apiUrl: raw.apiUrl?.trim() || DEFAULT_API_URL,
    prod: raw.prod ? raw.prod.toLowerCase() !== "false" : true
  }
}

function mount(rawConfig: RawConfig) {
  // Prevent double mount
  if (document.getElementById("openfeed-widget-host")) {
    console.warn("[OpenFeedWidget] Already mounted, skipping.")
    return
  }


  let config: WidgetConfig
  try {
    config = sanitizeConfig(rawConfig)
  } catch (e) {
    console.error(e)
    return
  }

  if (!config.projectId) {
    console.error("[OpenFeedWidget] Missing or invalid data-project-id, aborting.")
    return
  }

  const host = document.createElement("div")
  host.id = "openfeed-widget-host"
  document.body.appendChild(host)

  const shadowRoot = host.attachShadow({ mode: "open" })

  const sheet = new CSSStyleSheet()
  sheet.replaceSync(styles)
  shadowRoot.adoptedStyleSheets = [sheet]

  const container = document.createElement("div")
  shadowRoot.appendChild(container)
  const previewConfig = (window as any).__OPENFEED_PREVIEW_CONFIG
  const root = createRoot(container)
  root.render(
    <WidgetErrorBoundary>
      <ShadowRootProvider shadowRoot={shadowRoot}>
        <Main widgetConfig={config} config={previewConfig} />
      </ShadowRootProvider>
    </WidgetErrorBoundary>
  )

  // Cleanup on unload
  window.addEventListener("unload", () => {
    root.unmount()
    host.remove()
  }, { once: true })
}

function init() {
  const script =
    (document.currentScript as HTMLScriptElement) ||
    (document.querySelector("script[data-project-id]") as HTMLScriptElement)

  if (!script) return

  const _consoleError = console.error
  console.error = (...args: unknown[]) => {
    const msg = args[0]
    if (
      typeof msg === "string" &&
      (msg.includes("DialogContent") || msg.includes("Missing `Description`"))
    ) {
      return
    }
    _consoleError(...args)
  }
  const _consoleWarning = console.warn
  console.warn = (...args: unknown[]) => {
    const msg = args[0]
    if (
      typeof msg === "string" &&
      (msg.includes("DialogContent") || msg.includes("Missing `Description`"))
    ) {
      return
    }
    _consoleWarning
  }

  mount({
    projectId: script.dataset.projectId,
    apiUrl: script.dataset.apiUrl,
    prod: script.dataset.prod,
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

; (window as any).OpenFeedWidget = { mount }
