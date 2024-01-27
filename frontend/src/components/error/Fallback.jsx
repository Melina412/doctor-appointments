import { useNavigate } from 'react-router-dom';

function Fallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
      <p>or</p>
      <button onClick={() => navigate('/')}>Go back Home</button>
    </div>
  );
}

export default Fallback;
