'use client';
//  errorTsx, notFound
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>

      <p>{error.message}</p>

      <button onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}