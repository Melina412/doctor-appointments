import { app } from './src/app.js';

// test um im browser zu checken ob der server erreichbar ist
app.get('/', (_, res) => {
  res.json({ message: `express server auf port ${process.env.PORT} ✅` });
});

app.listen(process.env.PORT, () =>
  console.log('✅ express läuft auf port:', process.env.PORT)
);
