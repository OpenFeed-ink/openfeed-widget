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
  apiUrl?: string
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

  const root = createRoot(container)
  root.render(
    <WidgetErrorBoundary>
      <ShadowRootProvider shadowRoot={shadowRoot}>
          <Main />
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

  mount({
    projectId: script.dataset.projectId,
    apiUrl: script.dataset.apiUrl,
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

; (window as any).OpenFeedWidget = { mount }
