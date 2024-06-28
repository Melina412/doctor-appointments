import 'dotenv/config';

// um die app auf dem lokalen server in ios safari direkt auf dem iphone zu testen, muss ich die adresse über die ip aufrufen. das würde man dann so konfigurieren.
// !ABER
// dazu müsste ich auch die URL aller fetches ändern und das war mir nervig. also ka ob das hier dann überhaupt nötig ist letztendlich

const ALLOWED_ORIGIN = [
  process.env.LOCALHOST_ORIGIN,
  process.env.LOCAL_IP_ORIGIN,
];

// origin kann nur string oder function sein, keine liste

const origin =
  process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGIN
    : function (origin, callback) {
        if (ALLOWED_ORIGIN.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      };

const corsOptions = {
  credentials: true,
  origin: origin,
};

export default corsOptions;
