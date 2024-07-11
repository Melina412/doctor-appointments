import { app } from './src/app.js';
import { connect } from './src/config/storage.config.js';

// test um im browser zu checken ob der server erreichbar ist
// app.get('/', (_, res) => {
//   res.json({ message: `express server auf port ${process.env.PORT} ✅` });
// });

const NODE_ENV = process.env.NODE_ENV;
console.log({ NODE_ENV });

const FRONTEND_INDEX = new URL('../frontend/dist/index.html', import.meta.url)
  .pathname;

app.get('*', (_, res) => {
  res.sendFile(FRONTEND_INDEX);
});

app.listen(process.env.PORT, () => {
  connect(), console.log('✅ express runs on port', process.env.PORT);
});
