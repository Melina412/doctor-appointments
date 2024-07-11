function Fallback({ error, resetErrorBoundary }) {
  return (
    <div className='error-boundary' role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
      <p>or</p>

      <a href='/'>Go back Home</a>
    </div>
  );
}

export default Fallback;

// funktioniert nicht mit <Link> von react-router-dom
