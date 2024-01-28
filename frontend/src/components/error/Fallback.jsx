function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
      <p>or</p>

      <a href='/'>Go back Home</a>
    </div>
  );
}

export default Fallback;
