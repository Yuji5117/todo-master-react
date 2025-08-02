export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border border-t-2 border-b-2"></div>
    </div>
  )
}
