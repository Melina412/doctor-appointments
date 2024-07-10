function getApiUrl() {
  const userAgent = navigator.userAgent;
  console.log({ userAgent });

  let API_URL;
  if (/iPhone|iPad|iPod|iOS/i.test(userAgent)) {
    API_URL = import.meta.env.VITE_LOCAL_IP_URL;
  } else if (/Chrome/i.test(userAgent)) {
    API_URL = import.meta.env.VITE_LOCALHOST_URL;
  } else {
    API_URL = import.meta.env.VITE_BACKENDURL;
  }

  console.log({ API_URL });
  return API_URL;
}

export default getApiUrl;
