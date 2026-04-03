import { useEffect, useRef, useState } from "react"
import { X, Megaphone } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import type { AnnouncementConfig } from "@/types"

export default function AnnouncementBanner({
  announcement,
}: {
  announcement: AnnouncementConfig
}) {
  const [visible, setVisible] = useState(true)
  const bannerRef = useRef<HTMLDivElement>(null);
  const { position, text, link, dismiss, bgcolor, textcolor } = announcement

  const handleDismiss = () => {
    setVisible(false)
  }

  // Manage body padding when banner is visible
  useEffect(() => {
    if (!visible || position !== 'top') return;

    const banner = bannerRef.current;
    if (!banner) return;

    // Function to update body padding based on banner height
    const updateBodyPadding = () => {
      const height = banner.offsetHeight;
      // Use a style element to avoid overwriting existing body styles
      let styleEl = document.getElementById('openfeed-banner-padding');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'openfeed-banner-padding';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `body { padding-top: ${height}px !important; }`;
    };

    // Initial update
    updateBodyPadding();

    // Observe size changes (e.g., text wrapping)
    const resizeObserver = new ResizeObserver(updateBodyPadding);
    resizeObserver.observe(banner);

    // Cleanup on unmount or visibility change
    return () => {
      resizeObserver.disconnect();
      const styleEl = document.getElementById('openfeed-banner-padding');
      if (styleEl) styleEl.remove();
    };
  }, [visible, position, text]); // text changes may affect height

  // Handle bottom banner (padding-bottom) if needed
  useEffect(() => {
    if (!visible || position !== 'bottom') return;

    const banner = bannerRef.current;
    if (!banner) return;

    const updateBodyPadding = () => {
      const height = banner.offsetHeight;
      let styleEl = document.getElementById('openfeed-banner-padding');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'openfeed-banner-padding';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `body { padding-bottom: ${height}px !important; }`;
    };

    updateBodyPadding();
    const resizeObserver = new ResizeObserver(updateBodyPadding);
    resizeObserver.observe(banner);

    return () => {
      resizeObserver.disconnect();
      const styleEl = document.getElementById('openfeed-banner-padding');
      if (styleEl) styleEl.remove();
    };
  }, [visible, position, text]);


  if (!visible) return null

  return (
    <div
      ref={bannerRef}
      className={cn(
        "fixed right-0 left-0 z-40 animate-in duration-300 fade-in",
        position === "top" ? "top-0" : "bottom-0"
      )}
      style={{ backgroundColor: bgcolor, color: textcolor }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-inherit backdrop-blur-sm">
          <div className="flex flex-1 items-center gap-3 px-4 py-2">
            <Megaphone className="h-5 w-5 shrink-0 opacity-80" />
            <span className="text-sm font-medium md:text-base">{text}</span>
          </div>

          <div className="flex items-center gap-2 pr-2">
            {link && (
              <Button
                variant="link"
                size="sm"
                className="h-8 text-xs md:text-sm"
                asChild
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  {announcement.actionBtn || "Learn more"}
                </a>
              </Button>
            )}
            {dismiss && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8 rounded-full"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
