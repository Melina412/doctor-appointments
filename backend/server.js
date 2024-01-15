import { app } from './src/app.js';

app.listen(process.env.PORT, () =>
  console.log('express läuft auf port:', process.env.PORT)
);
