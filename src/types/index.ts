export interface WidgetConfig {
  projectId: string
  apiUrl: string
}
export type Config = {
  theme: "dark" | "light" | "system";
  projectName: string;
  info?: string;
  triggerBtn: {
    position: "float-bottom-right" | "float-bottom-left" | "float-up-right" | "float-up-left" | "drawer-left" | "drawer-right";
    color: string;
    textColor: string;
    variant: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive";
    size: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
    text?: string;
    icon?: string;
  };
  showFeedback: boolean;
  showChangeLog: boolean;
  showRoadmap: boolean;
  showAnnouncement: boolean;
}
