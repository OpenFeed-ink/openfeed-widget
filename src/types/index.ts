export interface WidgetConfig {
  projectId: string
  apiUrl: string
}
export type AnnouncementConfig = {
  position: 'top' | 'bottom';
  text: string;
  link?: string;
  dismiss: boolean;
  bgcolor: string;
  textcolor: string;
  actionBtn: string;
}

export type Config = {
  theme: "dark" | "light" | "system";
  widgetName: string;
  info: string | null;
  triggerBtn: {
    position: "float-bottom-right" | "float-bottom-left" | "float-up-right" | "float-up-left" | "drawer-left" | "drawer-right";
    color: string;
    textColor: string;
    size: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
    text: string | null;
    icon: string | null;
  };
  showFeedback: boolean;
  showChangeLog: boolean;
  showRoadmap: boolean;
  announcement?: AnnouncementConfig,
}
