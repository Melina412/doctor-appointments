import 'dotenv/config';

// um die app auf dem lokalen server in ios safari direkt auf dem iphone zu testen, muss ich die adresse über die ip aufrufen.
// damit es auf dem iphone geht muss in der vite env auch die ip stehen und nicht localhost.

// die funktion prüft
function setOrigin(req, callback) {
  const userAgent = req.headers['user-agent'];
  // console.log({ userAgent });

  let ALLOWED_ORIGIN;
  if (/iPhone|iPad|iPod|iOS/i.test(userAgent)) {
    ALLOWED_ORIGIN = process.env.LOCAL_IP_ORIGIN;
  } else if (/Chrome/i.test(userAgent)) {
    ALLOWED_ORIGIN = process.env.LOCALHOST_ORIGIN;
  } else {
    ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
  }

  // console.log({ ALLOWED_ORIGIN });
  callback(null, { origin: ALLOWED_ORIGIN });
}

const corsOptions = (req, callback) => {
  if (process.env.NODE_ENV === 'DEV') {
    setOrigin(req, (err, options) => {
      options.credentials = true;
      // console.log({ options });
      callback(err, options);
    });
  } else {
    callback(null, { origin: process.env.ALLOWED_ORIGIN, credentials: true });
  }
};

export default corsOptions;
