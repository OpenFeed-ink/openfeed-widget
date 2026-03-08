import * as React from "react"
import { useShadowRoot } from "@/context/shadow-root"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light"
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme
}

interface ThemeProviderProps {
  children: React.ReactNode
  theme: Theme  // comes from your API config
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const shadowRoot = useShadowRoot()

  React.useEffect(() => {
    const host = shadowRoot?.host as HTMLElement | undefined
    if (!host) return

    const resolved = resolveTheme(theme)
    host.classList.remove("light", "dark")
    host.classList.add(resolved)

    // If system, watch for OS preference changes
    if (theme !== "system") return
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      host.classList.remove("light", "dark")
      host.classList.add(getSystemTheme())
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, shadowRoot])

  return <>{children}</>
}
