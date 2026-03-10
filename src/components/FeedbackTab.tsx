
export function FeedbackTab(config: { apiUrl: string, projectId: string }) {

  return (
    <div className="space-y-3">
      <iframe
        src={`${config.apiUrl}/pub/${config.projectId}/features`}
        className="w-full h-screen border-0"
        height={"100%"}
      />
    </div>
  )
}
