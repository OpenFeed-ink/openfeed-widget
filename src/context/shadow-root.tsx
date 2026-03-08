import { createContext, useContext } from "react"

const ShadowRootContext = createContext<ShadowRoot | null>(null)

export function ShadowRootProvider({
  shadowRoot,
  children,
}: {
  shadowRoot: ShadowRoot
  children: React.ReactNode
}) {
  return (
    <ShadowRootContext.Provider value={shadowRoot}>
      {children}
    </ShadowRootContext.Provider>
  )
}

export function useShadowRoot() {
  return useContext(ShadowRootContext)
}
