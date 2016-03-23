import express from 'express';
import { applyMiddleware } from '../middleware/applyMiddleware';

const PORT = process.env.PORT || 3000;
const app = express();

applyMiddleware(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
