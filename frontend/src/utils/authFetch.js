async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (response.status === 401) {
    console.log('access token check failed, trying to refresh...');
    const refresh = await fetch(
      import.meta.env.VITE_BACKENDURL + '/api/auth/refresh',
      {
        credentials: 'include',
      }
    );

    if (refresh.ok) {
      console.log('token refreshed successfully, retrying original request...');
      return fetch(url, {
        ...options,
        credentials: 'include',
      });
    } else {
      console.log('❌ refresh failed:', refresh.statusText);
      return response; // original response error
    }
  }

  return response;
}

export default authFetch;
