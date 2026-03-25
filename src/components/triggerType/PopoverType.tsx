import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Config, WidgetConfig } from "@/types"
import type { LucideProps } from "lucide-react"
import { Suspense } from "react"
import WidgetContent from "../WidgetContent"
import { Button } from "@/components/ui/button"


interface PopoverTyping {
  config: Config,
  IconComponent: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | null
}

interface PopoverExtra extends PopoverTyping {
  widgetConfig: WidgetConfig
}

const getFloatPositionClasses = (position: string) => {
  switch (position) {
    case "float-bottom-right": return "bottom-6 right-6"
    case "float-bottom-left": return "bottom-6 left-6"
    case "float-up-right": return "top-6 right-6"
    case "float-up-left": return "top-6 left-6"
    default: return "bottom-6 right-6"
  }
}

// Floating trigger (normal horizontal button)
const renderFloatTrigger = ({ config, IconComponent }: PopoverTyping) => (
  <Button
    style={{
      backgroundColor: config.triggerBtn.color,
      color: config.triggerBtn.textColor,
    }}
    size={config.triggerBtn.size}
  >
    {IconComponent && <IconComponent className="h-4 w-4" />}
    {!config.triggerBtn.size.startsWith("icon") && config.triggerBtn.text && config.triggerBtn.text}
  </Button>
)

export default function PopoverType({ config, widgetConfig, IconComponent }: PopoverExtra) {
  return (
    <div className={`fixed ${getFloatPositionClasses(config.triggerBtn.position)} z-50`}>
      <Popover>
        <PopoverTrigger asChild>
          {renderFloatTrigger({ config, IconComponent })}
        </PopoverTrigger>
        <PopoverContent className="w-80 md:w-100 h-[60vh] bg-muted p-0 flex flex-col min-h-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">{config.widgetName}</h2>
            {config.info && (
              <p className="text-sm opacity-90">{config.info}</p>
            )}
          </div>

          <div className="flex-1 min-h-0">
            <Suspense fallback={null}>
              <WidgetContent config={config} widgetConfig={widgetConfig} isDrawer={false} />
            </Suspense>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
