import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader, DrawerDescription } from "@/components/ui/drawer"
import { MessageSquare } from "lucide-react"
import { WidgetContent } from "./components/WidgetContent"
import type { Config, WidgetConfig } from "./types"



// Icon mapping
const IconMap = {
  "message-square": MessageSquare,
  // add more icons as needed
}

export default function App({ config, widgetConfig }: { config: Config, widgetConfig: WidgetConfig }) {

  const position = config.triggerBtn.position
  const isDrawer = position.startsWith("drawer")
  const IconComponent = config.triggerBtn.icon ? IconMap[config.triggerBtn.icon as keyof typeof IconMap] : null

  const getFloatPositionClasses = () => {
    switch (position) {
      case "float-bottom-right": return "bottom-6 right-6"
      case "float-bottom-left": return "bottom-6 left-6"
      case "float-up-right": return "top-6 right-6"
      case "float-up-left": return "top-6 left-6"
      default: return "bottom-6 right-6"
    }
  }

  const getDrawerSide = () => {
    if (position === "drawer-left") return "left"
    if (position === "drawer-right") return "right"
    return "right"
  }

  // Floating trigger (normal horizontal button)
  const renderFloatTrigger = () => (
    <Button
      style={{
        backgroundColor: config.triggerBtn.color,
        color: config.triggerBtn.textColor,
      }}
      variant={config.triggerBtn.variant}
      size={config.triggerBtn.size}
    >
      {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
      {config.triggerBtn.text && config.triggerBtn.text}
    </Button>
  )

  // Drawer trigger (vertical button)
  const renderDrawerTrigger = () => {
    const side = getDrawerSide()
    const isLeft = side === "left"

    return (
      <div
        className={`fixed ${isLeft ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 z-50`}
      >
        <div className={`${isLeft ? "-rotate-90 origin-left" : "rotate-90 origin-right"}`}>
          <Button
            style={{
              backgroundColor: config.triggerBtn.color,
              color: config.triggerBtn.textColor,
            }}
            variant={config.triggerBtn.variant}
            size={config.triggerBtn.size}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {IconComponent && <IconComponent className="h-4 w-4" />}
            {config.triggerBtn.text && (
              <span className="text-xs">{config.triggerBtn.text}</span>
            )}
          </Button>
        </div>
      </div>
    )
  }
  if (isDrawer) {
    const side = getDrawerSide()
    return (
      <Drawer direction={side}
        shouldScaleBackground={false}
        disablePreventScroll={true}
        noBodyStyles={true}
      >
        <DrawerTrigger asChild>
          {renderDrawerTrigger()}
        </DrawerTrigger>
        <DrawerContent className="bg-muted max-h-screen overflow-auto">
          <DrawerHeader>
            <DrawerTitle className="font-semibold text-lg">{config.projectName}</DrawerTitle>
            <DrawerDescription>{config.info || ""}</DrawerDescription>
          </DrawerHeader>
          <WidgetContent config={config} widgetConfig={widgetConfig} />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className={`fixed ${getFloatPositionClasses()}`}>
      <Popover>
        <PopoverTrigger asChild>
          {renderFloatTrigger()}
        </PopoverTrigger>
        <PopoverContent className="w-100 max-h-100 bg-muted overflow-auto">
          <div className="p-4">
            <h2 className="font-semibold text-lg">{config.projectName}</h2>
            {config.info && <p className="text-sm opacity-90">{config.info}</p>}
          </div>
          <WidgetContent config={config} widgetConfig={widgetConfig} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
