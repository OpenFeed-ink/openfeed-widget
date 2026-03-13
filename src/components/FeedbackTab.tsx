
export function FeedbackTab(config: { apiUrl: string, projectId: string, isDrower:boolean, theme:string }) {
  return (
    <div className="space-y-3">
      <iframe
        src={`${config.apiUrl}/pub/${config.projectId}/features?theme=${config.theme}`}
        className={`w-full ${config.isDrower ? "h-screen": "h-[55vh]"} border-0`}
        height={"100%"}
      />
    </div>
  )
}
