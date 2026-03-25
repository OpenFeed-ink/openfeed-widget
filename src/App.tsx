import { MessageSquare, Bell, Mail, Heart, Star, ThumbsUp } from "lucide-react"
import type { Config, WidgetConfig } from "./types"
import { lazy} from "react"
const DrawerType = lazy(()=> import("./components/triggerType/DrawerType"))
const PopoverType = lazy(()=> import("./components/triggerType/PopoverType"))

const IconMap = {
  "message-square": MessageSquare,
  "bell": Bell,
  "mail": Mail,
  "heart": Heart,
  "star": Star,
  "thumbs-up": ThumbsUp,
}

export default function App({ config, widgetConfig }: { config: Config, widgetConfig: WidgetConfig }) {
  const position = config.triggerBtn.position
  const isDrawer = position.startsWith("drawer")
  const IconComponent = config.triggerBtn.icon ? IconMap[config.triggerBtn.icon as keyof typeof IconMap] : null
  if (isDrawer) return <DrawerType config={config} IconComponent={IconComponent} widgetConfig={widgetConfig} />
  return (<PopoverType config={config} IconComponent={IconComponent} widgetConfig={widgetConfig} />)
}
