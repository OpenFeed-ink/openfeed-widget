import type { Config, WidgetConfig } from "@/types"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader, DrawerDescription } from "@/components/ui/drawer"
import { Suspense } from "react"
import WidgetContent from "../WidgetContent"
import type { LucideProps } from "lucide-react"

interface DrawerTyping {
  config: Config,
  IconComponent: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | null
}

interface DrawerExtra extends DrawerTyping {
  widgetConfig: WidgetConfig
}

const getDrawerSide = (position: string) => {
  if (position === "drawer-left") return "left"
  if (position === "drawer-right") return "right"
  return "right"
}
export default function DrawerType({ config, IconComponent, widgetConfig }: DrawerExtra) {
  const side = getDrawerSide(config.triggerBtn.position)

  return (
    <Drawer direction={side}
      shouldScaleBackground={false}
      disablePreventScroll={true}
      noBodyStyles={true}

    >
      <DrawerTrigger asChild>
        {renderDrawerTrigger({ config, IconComponent })}
      </DrawerTrigger>
      <DrawerContent className="bg-muted max-h-screen overflow-auto">
        <DrawerHeader>
          <DrawerTitle className="font-semibold text-lg">{config.widgetName}</DrawerTitle>
          <DrawerDescription>{config.info || ""}</DrawerDescription>
        </DrawerHeader>
        <Suspense fallback={null}>
          <WidgetContent config={config} widgetConfig={widgetConfig} isDrawer={true} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  )
}

const renderDrawerTrigger = ({ config, IconComponent }: DrawerTyping) => {
  const side = getDrawerSide(config.triggerBtn.position)
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
          size={config.triggerBtn.size}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          {IconComponent && <IconComponent className="h-4 w-4" />}
          {config.triggerBtn.text && !config.triggerBtn.size.startsWith('icon') && (
            <span className="text-xs">{config.triggerBtn.text}</span>
          )}
        </Button>
      </div>
    </div>
  )
}
