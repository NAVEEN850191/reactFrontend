
interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
}

export default function ErrorDisplay({error,onRetry,}: ErrorDisplayProps){

  return (
      <div id="error-display">
        <p>{String(error)}</p>

        {onRetry && (
          <button
            type="button"
            data-testid="retry-btn"
            onClick={onRetry}
          >
            Retry
          </button>
        )}
      </div>
  )
}
