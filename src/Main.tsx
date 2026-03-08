import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import type { Config } from "./types"
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

export const Main = () => {
  return (
    <ThemeProvider theme={mockConfig.theme} >
      <App config={mockConfig} />
    </ThemeProvider>
  )
}
